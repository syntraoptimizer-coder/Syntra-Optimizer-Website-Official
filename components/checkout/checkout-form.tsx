'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, Crown, Wrench, Loader2 } from 'lucide-react'

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
    tagline: 'Per month',
    description: 'Monthly remote optimization sessions. A Syntra expert tunes your PC every month while you watch, with continuous performance tracking and adjustments as new games are released.',
    icon: Wrench,
    perks: [
      'Monthly remote optimization session',
      'No install required',
      'Expert-tuned game settings updated regularly',
      'Live before/after score report each session',
      'Priority chat support',
      'Continuous performance tracking',
    ],
  },
}

interface CheckoutFormProps {
  user: any
  plan: string
}

export function CheckoutForm({ user, plan }: CheckoutFormProps) {
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

      const data = await res.json()

      if (!res.ok || !data.url) {
        throw new Error(data.error || 'Failed to create checkout session')
      }

      window.location.href = data.url
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center">
          <h1
            className="text-2xl font-light tracking-tight"
            style={{ color: '#ffffff' }}
          >
            Complete Your Purchase
          </h1>
          <p className="mt-2 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Signed in as <span style={{ color: 'rgba(255,255,255,0.7)' }}>{user.email}</span>
          </p>
        </div>

        {/* Plan card */}
        <div
          className="mt-8 rounded-2xl p-6"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <div className="flex items-center gap-4">
            <div
              className="grid size-11 place-items-center rounded-xl"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <Icon className="size-5" style={{ color: 'rgba(255,255,255,0.8)' }} />
            </div>
            <div className="flex-1">
              <h2 className="text-base font-medium" style={{ color: 'rgba(255,255,255,0.9)' }}>
                {selectedPlan.name}
              </h2>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.38)' }}>
                {selectedPlan.tagline}
              </p>
            </div>
            <span
              className="font-mono text-2xl font-light"
              style={{ color: '#ffffff' }}
            >
              {selectedPlan.price}
            </span>
          </div>

          <p className="mt-4 text-sm" style={{ color: 'rgba(255,255,255,0.42)', fontWeight: 300 }}>
            {selectedPlan.description}
          </p>

          <ul className="mt-5 space-y-2.5">
            {selectedPlan.perks.map((perk) => (
              <li key={perk} className="flex items-start gap-2.5 text-sm">
                <Check className="mt-0.5 size-4 shrink-0" style={{ color: 'rgba(255,255,255,0.5)' }} />
                <span style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 300 }}>{perk}</span>
              </li>
            ))}
          </ul>

          {error && (
            <p
              className="mt-4 rounded-xl px-4 py-3 text-sm"
              style={{ background: 'rgba(255,80,80,0.1)', color: 'rgba(255,120,120,0.9)' }}
            >
              {error}
            </p>
          )}

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full text-sm font-semibold transition-all duration-200 hover:-translate-y-px disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              background: 'rgba(255,255,255,0.92)',
              color: '#080808',
              boxShadow: '0 0 28px -8px rgba(255,255,255,0.45)',
            }}
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Redirecting…
              </>
            ) : (
              'Proceed to Payment'
            )}
          </button>

          <p className="mt-3 text-center text-xs" style={{ color: 'rgba(255,255,255,0.28)' }}>
            You will be redirected to Stripe to complete your payment securely.
          </p>
        </div>

        <button
          onClick={() => router.push('/#pricing')}
          className="mt-5 w-full text-center text-sm transition-colors duration-200 hover:text-white"
          style={{ color: 'rgba(255,255,255,0.35)' }}
        >
          ← Back to pricing
        </button>
      </div>
    </div>
  )
}
