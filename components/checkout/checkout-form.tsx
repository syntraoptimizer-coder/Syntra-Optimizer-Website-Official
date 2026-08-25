'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, Check, Crown, Loader2, ShieldCheck, Sparkles, Wrench } from 'lucide-react'
import { Navbar } from '@/components/site/navbar'
import { LaunchPrice, type PublicLaunchPricing } from '@/components/site/launch-price'

const PLANS = {
  premium: {
    name: 'Syntra Optimizer Premium',
    price: '$15',
    tagline: 'One-time payment',
    description: 'Full app license. Run every optimization yourself, whenever you want.',
    icon: Crown,
    perks: [
      'Full Syntra Optimizer license',
      'All modules unlocked',
      'Unlimited optimizations',
      'Lifetime updates',
      'Community support',
    ],
  },
  service: {
    name: 'Syntra Optimizer Service',
    price: '$6',
    tagline: 'Per session',
    description: 'A Syntra expert optimizes your PC remotely. Book as often as you\'d like — most clients check in monthly. Nothing to install on your end.',
    icon: Wrench,
    perks: [
      'Personal remote optimization',
      'No install required',
      'Expert-tuned game settings',
      'Live before/after score report',
      'Priority chat support',
    ],
  },
}

interface CheckoutFormProps {
  user: any
  plan: string
  initialPricing?: PublicLaunchPricing
}

export function CheckoutForm({ user, plan, initialPricing }: CheckoutFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const selectedPlan = PLANS[plan as keyof typeof PLANS] || PLANS.premium
  const Icon = selectedPlan.icon

  const handleCheckout = async () => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      })

      if (!res.ok) {
        const errorText = await res.text()
        console.error('Checkout API error:', res.status, errorText)
        throw new Error(errorText || 'Failed to create checkout session')
      }

      const data = await res.json()

      if (!data.url) {
        throw new Error('No checkout URL returned from server')
      }

      window.location.href = data.url
    } catch (err: any) {
      console.error('Checkout error:', err)
      setError(err.message || 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="checkout-page">
      <Navbar />
      <div aria-hidden="true" className="checkout-page__glow checkout-page__glow--blue" />
      <div aria-hidden="true" className="checkout-page__glow checkout-page__glow--white" />
      <main className="checkout-page__content">
        <div className="checkout-heading">
          <span className="checkout-eyebrow"><Sparkles className="size-3" /> secure checkout</span>
          <h1>Complete your purchase</h1>
          <p>Signed in as <span>{user.email}</span></p>
        </div>

        <section className="checkout-card beam-card">
          <div className="card-texture" aria-hidden="true" />
          <div className="checkout-card__content">
            <div className="checkout-card__topline">
              <span className="checkout-card__index">01 / purchase</span>
              <span className="checkout-card__secure"><ShieldCheck className="size-3.5" /> encrypted by Stripe</span>
            </div>

            <div className="checkout-plan">
              <div className="checkout-plan__identity">
                <div className="checkout-plan__icon"><Icon className="size-5" /></div>
                <div>
                  <span className="checkout-plan__kicker">{plan === 'premium' ? 'Full license' : 'Expert session'}</span>
                  <h2>{selectedPlan.name}</h2>
                  <p>{selectedPlan.tagline}</p>
                </div>
              </div>
              <div className="checkout-plan__price">
                {plan === 'premium' ? <LaunchPrice compact initialPricing={initialPricing} /> : <span>${selectedPlan.price}</span>}
              </div>
            </div>

            <p className="checkout-description">{selectedPlan.description}</p>

            <div className="checkout-divider" />
            <div className="checkout-benefits-heading"><span>Included with your purchase</span><span>{selectedPlan.perks.length} benefits</span></div>
            <ul className="checkout-benefits">
              {selectedPlan.perks.map((perk) => (
                <li key={perk}><span className="checkout-benefit-icon"><Check className="size-3" /></span><span>{perk}</span></li>
              ))}
            </ul>

            {error && <p className="checkout-error" role="alert">{error}</p>}

            <button onClick={handleCheckout} disabled={loading} className="checkout-submit">
              {loading ? <><Loader2 className="size-4 animate-spin" /> Redirecting…</> : <>Proceed to payment <ArrowRight className="size-4" /></>}
            </button>

            <div className="checkout-trust"><ShieldCheck className="size-4" /><span>You will be redirected to Stripe to complete your payment securely.</span></div>
          </div>
        </section>

        <button onClick={() => router.push('/#pricing')} className="checkout-back"><ArrowRight className="size-3.5 rotate-180" /> Back to pricing</button>
      </main>
    </div>
  )
}
