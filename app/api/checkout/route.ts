import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@/lib/supabase/server'

const PRICES = {
  premium: process.env.STRIPE_PRICE_PREMIUM,
  service: process.env.STRIPE_PRICE_SERVICE,
}

export async function POST(req: Request) {
  const stripeKey = process.env.STRIPE_SECRET_KEY
  if (!stripeKey) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 })
  }

  const stripe = new Stripe(stripeKey, { apiVersion: '2026-07-29.dahlia' })

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { plan } = await req.json()

  if (!plan) {
    return NextResponse.json({ error: 'Plan is required' }, { status: 400 })
  }

  const priceId = PRICES[plan as keyof typeof PRICES]
  if (!priceId) {
    console.error(`Price ID not configured for plan: ${plan}`)
    return NextResponse.json({ error: `Price not configured for plan: ${plan}` }, { status: 500 })
  }

  const origin = req.headers.get('origin') || 'https://www.syntraoptimizer.site'

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    metadata: {
      user_id: user.id,
      plan,
    },
    allow_promotion_codes: true,
    customer_email: user.email,
    success_url: `${origin}/checkout/return?plan=${plan}`,
    cancel_url: `${origin}/checkout?plan=${plan}`,
  })

  return NextResponse.json({ url: session.url })
}
