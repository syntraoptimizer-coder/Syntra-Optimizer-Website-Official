import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: Request) {
  const stripeKey = process.env.STRIPE_SECRET_KEY
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!stripeKey || !webhookSecret) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 })
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

    const supabase = await createClient()

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const customerId = session.customer as string
        const userId = session.metadata?.user_id
        const plan = session.metadata?.plan

        if (userId) {
          if (plan === 'service') {
            // Increment service count
            const { data: existing } = await supabase
              .from('user_roles')
              .select('service_count')
              .eq('user_id', userId)
              .maybeSingle()

            const currentCount = existing?.service_count || 0

            const { error } = await supabase
              .from('user_roles')
              .upsert({
                user_id: userId,
                service_count: currentCount + 1,
                stripe_customer_id: customerId,
                updated_at: new Date().toISOString(),
              }, { onConflict: 'user_id' })

            if (error) {
              console.error('Supabase service update error:', error)
              return NextResponse.json({ error: 'DB update failed' }, { status: 500 })
            }
          } else {
            // Premium purchase — set role to premium
            const { error } = await supabase
              .from('user_roles')
              .upsert({
                user_id: userId,
                role: 'premium',
                stripe_customer_id: customerId,
                updated_at: new Date().toISOString(),
              }, { onConflict: 'user_id' })

            if (error) {
              console.error('Supabase premium update error:', error)
              return NextResponse.json({ error: 'DB update failed' }, { status: 500 })
            }
          }
        }
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string

        await supabase
          .from('user_roles')
          .update({
            role: 'free',
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_customer_id', customerId)
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}
