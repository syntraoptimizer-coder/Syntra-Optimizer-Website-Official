import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@/lib/supabase/server'
import { getLaunchPricing } from '@/lib/pricing'

const PRICES = {
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

  const origin = req.headers.get('origin') || 'https://www.syntraoptimizer.site'
  const lineItem = plan === 'premium'
    ? await getPremiumLineItem()
    : {
        price: PRICES.service,
        quantity: 1,
      }

  if (!('price' in lineItem ? lineItem.price : lineItem.price_data)) {
    console.error(`Price ID not configured for plan: ${plan}`)
    return NextResponse.json({ error: `Price not configured for plan: ${plan}` }, { status: 500 })
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [lineItem],
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

async function getPremiumLineItem() {
  const pricing = await getLaunchPricing()

  if (pricing.enabled) {
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'Syntra Optimizer Premium',
          description: 'Full app license with lifetime updates.',
        },
        unit_amount: pricing.launchPriceCents,
      },
      quantity: 1,
    }
  }

  const standardPriceId = process.env.STRIPE_PRICE_PREMIUM
  if (!standardPriceId) return { price: undefined, quantity: 1 }

  return { price: standardPriceId, quantity: 1 }
}
