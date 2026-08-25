import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(req: Request) {
  const stripeKey = process.env.STRIPE_SECRET_KEY
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  const admin = createAdminClient()

  if (!stripeKey || !webhookSecret || !admin) {
    return NextResponse.json({ error: 'Stripe or Supabase admin is not configured' }, { status: 500 })
  }

  const stripe = new Stripe(stripeKey, {
    apiVersion: '2026-07-29.dahlia',
  })

  try {
    const body = await req.text()
    const headersList = await headers()
    const signature = headersList.get('stripe-signature')

    if (!signature) {
      return NextResponse.json({ error: 'Missing stripe-signature' }, { status: 400 })
    }

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    const { data: existingEvent, error: lookupError } = await admin
      .from('stripe_events')
      .select('processed_at')
      .eq('id', event.id)
      .maybeSingle()

    if (lookupError && lookupError.code !== '42P01') {
      console.error('Stripe event lookup failed:', lookupError)
    }
    if (existingEvent?.processed_at) return NextResponse.json({ received: true })

    if (!existingEvent) {
      const { error: insertError } = await admin
        .from('stripe_events')
        .insert({ id: event.id, type: event.type })

      if (insertError && insertError.code !== '23505' && insertError.code !== '42P01') {
        console.error('Stripe event insert failed:', insertError)
      }
    }

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const customerId = session.customer as string
        const userId = session.metadata?.user_id
        const plan = session.metadata?.plan

        if (!userId) break

        if (plan === 'service') {
          const { data: existing } = await admin
            .from('user_roles')
            .select('service_count')
            .eq('user_id', userId)
            .maybeSingle()

          const { error } = await admin
            .from('user_roles')
            .upsert({
              user_id: userId,
              service_count: (existing?.service_count || 0) + 1,
              stripe_customer_id: customerId,
              updated_at: new Date().toISOString(),
            }, { onConflict: 'user_id' })

          if (error) throw new Error(`Supabase service update failed: ${error.message}`)
        } else if (plan === 'premium') {
          const { error } = await admin
            .from('user_roles')
            .upsert({
              user_id: userId,
              role: 'premium',
              stripe_customer_id: customerId,
              updated_at: new Date().toISOString(),
            }, { onConflict: 'user_id' })

          if (error) throw new Error(`Supabase premium update failed: ${error.message}`)

          const { error: countError } = await admin.rpc('increment_launch_sales', { p_event_id: event.id })
          if (countError) throw new Error(`Launch sales counter update failed: ${countError.message}`)
        }
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string

        const { error } = await admin
          .from('user_roles')
          .update({
            role: 'free',
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_customer_id', customerId)

        if (error) throw new Error(`Supabase subscription update failed: ${error.message}`)
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    await admin
      .from('stripe_events')
      .update({ processed_at: new Date().toISOString() })
      .eq('id', event.id)

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}
