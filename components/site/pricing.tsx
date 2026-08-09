'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Check, Minus, Lock, Crown } from 'lucide-react'
import { SectionHeading } from '@/components/site/section-heading'
import { createClient } from '@/lib/supabase/client'

const PLANS = [
  {
    name: 'Self-Service',
    price: 15,
    tagline: 'One-time payment',
    description: 'Full app license. Run every optimization yourself, whenever you want.',
    cta: 'Buy license',
    href: '/checkout?plan=premium',
    featured: false,
    requiresPremium: false,
    perks: [
      'Full Syntra Optimizer license',
      'All modules unlocked',
      'Unlimited optimizations',
      'Lifetime updates',
      'Community support',
    ],
  },
  {
    name: 'Done-For-You',
    price: 6,
    tagline: 'Per session',
    description: 'A Syntra expert optimizes your PC remotely. Nothing to install on your end.',
    cta: 'Book an expert',
    href: '/checkout?plan=service',
    featured: true,
    requiresPremium: true,
    perks: [
      'Personal remote optimization',
      'No install required',
      'Expert-tuned game settings',
      'Live before/after score report',
      'Priority chat support',
    ],
  },
]

const COMPARISON: { feature: string; self: boolean; dfy: boolean }[] = [
  { feature: 'All optimization modules', self: true, dfy: true },
  { feature: 'Run optimizations yourself', self: true, dfy: false },
  { feature: 'Done by a human expert', self: false, dfy: true },
  { feature: 'No installation needed', self: false, dfy: true },
  { feature: 'Lifetime updates', self: true, dfy: false },
  { feature: 'Priority support', self: false, dfy: true },
  { feature: 'Before/after score report', self: true, dfy: true },
]

function Cell({ ok }: { ok: boolean }) {
  return ok ? (
    <Check className="mx-auto size-4" style={{ color: 'rgba(255,255,255,0.8)' }} aria-label="Included" />
  ) : (
    <Minus className="mx-auto size-4" style={{ color: 'rgba(255,255,255,0.18)' }} aria-label="Not included" />
  )
}

export function Pricing() {
  const [userRole, setUserRole] = useState<'free' | 'premium'>('free')
  const [serviceCount, setServiceCount] = useState(0)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const fetchRole = async () => {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        const { data } = await supabase
          .from('user_roles')
          .select('role, service_count')
          .eq('user_id', session.user.id)
          .maybeSingle()
        setUserRole(data?.role || 'free')
        setServiceCount(data?.service_count || 0)
      }
      setLoaded(true)
    }
    fetchRole()
  }, [])

  const hasPremium = userRole === 'premium'

  return (
    <section id="pricing" className="scroll-mt-16">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <SectionHeading
          eyebrow="Simple pricing"
          title="Do it yourself, or"
          accent="let us do it."
          description="Pick a one-time license and optimize on your own, or have a Syntra expert handle everything remotely."
        />

        <div className="mx-auto mt-14 grid max-w-3xl gap-4 md:grid-cols-2">
          {PLANS.map((plan) => {
            const locked = plan.requiresPremium && loaded && !hasPremium

            return (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-2xl p-6 overflow-hidden ${plan.featured ? 'eco-card beam-border' : 'eco-card glass-card'}`}
                style={
                  plan.featured
                    ? { background: 'rgba(255,255,255,0.05)', boxShadow: '0 0 60px -20px rgba(255,255,255,0.18)' }
                    : {}
                }
              >
                {plan.featured && (
                  <div className="mb-3 flex justify-start">
                    <span
                      className="rounded-md px-2 py-0.5 text-xs font-semibold"
                      style={{
                        background: 'rgba(255,255,255,0.1)',
                        border: '1px solid rgba(255,255,255,0.18)',
                        color: 'rgba(255,255,255,0.75)',
                        width: 'fit-content',
                      }}
                    >
                      Popular
                    </span>
                  </div>
                )}

                <h3 className="text-base font-medium" style={{ color: plan.featured ? '#ffffff' : 'rgba(255,255,255,0.8)' }}>
                  {plan.name}
                </h3>

                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className="font-mono tracking-tight"
                    style={{ fontSize: '2.6rem', fontWeight: 300, color: plan.featured ? '#ffffff' : 'rgba(255,255,255,0.75)' }}>
                    ${plan.price}
                  </span>
                  <span className="text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>{plan.tagline}</span>
                </div>

                <p className="mt-3 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.42)', fontWeight: 300 }}>
                  {plan.description}
                </p>

                <ul className="mt-6 flex-1 space-y-3">
                  {plan.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2.5 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0" style={{ color: 'rgba(255,255,255,0.6)' }} />
                      <span style={{ color: 'rgba(255,255,255,0.65)', fontWeight: 300 }}>{perk}</span>
                    </li>
                  ))}
                </ul>

                {/* Requires premium notice */}
                {locked && (
                  <div
                    className="mt-5 flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-xs"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' }}
                  >
                    <Lock className="size-3.5 shrink-0" />
                    Requires the Self-Service license first
                  </div>
                )}

                {locked ? (
                  <Link
                    href="/checkout?plan=premium"
                    className="mt-3 inline-flex h-11 items-center justify-center gap-2 rounded-full text-sm font-semibold transition-all duration-200 hover:-translate-y-px"
                    style={{ background: 'rgba(255,255,255,0.92)', color: '#080808', boxShadow: '0 0 28px -8px rgba(255,255,255,0.45)' }}
                  >
                    <Crown className="size-4" />
                    Get Self-Service first
                  </Link>
                ) : (
                  <Link
                    href={plan.href}
                    className="mt-6 inline-flex h-11 items-center justify-center rounded-full text-sm font-semibold transition-all duration-200 hover:-translate-y-px"
                    style={
                      plan.featured
                        ? { background: 'rgba(255,255,255,0.92)', color: '#080808', boxShadow: '0 0 28px -8px rgba(255,255,255,0.45)' }
                        : { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.7)' }
                    }
                  >
                    {plan.cta}
                  </Link>
                )}
              </div>
            )
          })}
        </div>

        {/* Comparison table */}
        <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-2xl" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
          <table className="w-full text-sm">
            <caption className="sr-only">Feature comparison</caption>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}>
                <th scope="col" className="px-5 py-3.5 text-left font-medium" style={{ color: 'rgba(255,255,255,0.6)' }}>Feature</th>
                <th scope="col" className="px-5 py-3.5 text-center font-medium" style={{ color: 'rgba(255,255,255,0.4)' }}>Self-Service</th>
                <th scope="col" className="px-5 py-3.5 text-center font-medium" style={{ color: 'rgba(255,255,255,0.85)' }}>Done-For-You</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row, i) => (
                <tr key={row.feature} style={{
                  borderBottom: i < COMPARISON.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  background: i % 2 === 1 ? 'rgba(255,255,255,0.02)' : 'transparent',
                }}>
                  <td className="px-5 py-3" style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 300 }}>{row.feature}</td>
                  <td className="px-5 py-3"><Cell ok={row.self} /></td>
                  <td className="px-5 py-3"><Cell ok={row.dfy} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
