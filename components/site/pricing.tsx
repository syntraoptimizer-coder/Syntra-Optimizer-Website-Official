'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Check, Minus, Lock, Crown } from 'lucide-react'
import { SectionHeading } from '@/components/site/section-heading'
import { createClient } from '@/lib/supabase/client'

const PLANS = [
  {
    name: 'Self-Service', price: 15, tagline: 'One-time payment',
    description: 'Full app license. Run every optimization yourself, whenever you want.',
    cta: 'Buy license', href: '/checkout?plan=premium', featured: false, requiresPremium: false,
    perks: ['Full Syntra Optimizer license', 'All modules unlocked', 'Unlimited optimizations', 'Lifetime updates', 'Community support'],
  },
  {
    name: 'Done-For-You', price: 6, tagline: 'Per session',
    description: 'A Syntra expert optimizes your PC remotely. Book as often as you\'d like — most clients check in monthly. Nothing to install on your end.',
    cta: 'Book an expert', href: '/checkout?plan=service', featured: true, requiresPremium: true,
    perks: ['Personal remote optimization', 'No install required', 'Expert-tuned game settings', 'Live before/after score report', 'Priority chat support'],
  },
]

const CMP = [
  { feature: 'All optimization modules', self: true, dfy: true },
  { feature: 'Run optimizations yourself', self: true, dfy: false },
  { feature: 'Done by a human expert', self: false, dfy: true },
  { feature: 'No installation needed', self: false, dfy: true },
  { feature: 'Lifetime updates', self: true, dfy: false },
  { feature: 'Priority support', self: false, dfy: true },
  { feature: 'Before/after score report', self: true, dfy: true },
]

export function Pricing() {
  const [userRole, setUserRole] = useState<'free' | 'premium'>('free')
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    const f = async () => {
      const sb = createClient()
      const { data: { session } } = await sb.auth.getSession()
      if (session?.user) {
        const { data } = await sb.from('user_roles').select('role').eq('user_id', session.user.id).maybeSingle()
        setUserRole(data?.role || 'free')
      }
      setLoaded(true)
    }; f()
  }, [])
  const hasPremium = userRole === 'premium'
  const Cell = ({ ok }: { ok: boolean }) => ok
    ? <Check style={{ width: 14, height: 14, color: 'var(--ink-1)', margin: '0 auto' }} />
    : <Minus style={{ width: 14, height: 14, color: 'var(--bg-4)', margin: '0 auto' }} />

  return (
    <section id="pricing" style={{ scrollMarginTop: 64 }}>
      <div style={{ maxWidth: 1088, margin: '0 auto', padding: '96px 24px' }}>
        <SectionHeading eyebrow="Simple pricing" title="Do it yourself, or" accent="let us do it." description="Pick a one-time license and optimize on your own, or have a Syntra expert handle everything remotely." />

        <div style={{ marginTop: 52, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 8, maxWidth: 640, marginInline: 'auto' }}>
          {PLANS.map(plan => {
            const locked = plan.requiresPremium && loaded && !hasPremium
            return (
              <div key={plan.name}
                className={plan.featured ? 'beam-card' : ''}
                style={{
                  background: 'var(--bg-1)', border: '1px solid var(--line)',
                  borderRadius: 6, padding: 24,
                  display: 'flex', flexDirection: 'column', position: 'relative',
                  boxShadow: plan.featured ? '0 0 40px -16px rgba(255,255,255,0.1)' : 'none',
                }}
              >
                {plan.featured && (
                  <div style={{ marginBottom: 12 }}>
                    <span className="s-tag" style={{ fontSize: '0.62rem', color: 'var(--ink-1)' }}>Popular</span>
                  </div>
                )}
                <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--ink-0)', marginBottom: 6, letterSpacing: '-0.01em' }}>{plan.name}</h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 8 }}>
                  <span style={{ fontSize: '2.4rem', fontWeight: 700, letterSpacing: '-0.04em', color: 'var(--ink-0)', fontFamily: 'ui-monospace, monospace' }}>${plan.price}</span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--ink-3)' }}>{plan.tagline}</span>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--ink-2)', lineHeight: 1.55, marginBottom: 20 }}>{plan.description}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                  {plan.perks.map(p => (
                    <li key={p} style={{ display: 'flex', gap: 8, fontSize: '0.82rem', color: 'var(--ink-2)' }}>
                      <Check style={{ width: 13, height: 13, flexShrink: 0, marginTop: 2, color: 'var(--ink-2)' }} />{p}
                    </li>
                  ))}
                </ul>
                {locked && (
                  <div style={{ marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', color: 'var(--ink-3)', padding: '8px 10px', background: 'var(--bg-2)', borderRadius: 4 }}>
                    <Lock style={{ width: 11, height: 11 }} />Requires Self-Service license first
                  </div>
                )}
                <Link href={locked ? '/checkout?plan=premium' : plan.href}
                  className={plan.featured ? 'btn-primary' : 'btn-ghost'}
                  style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}
                >
                  {locked ? <><Crown style={{ width: 13, height: 13 }} />Get Self-Service first</> : plan.cta}
                </Link>
              </div>
            )
          })}
        </div>

        {/* Comparison */}
        <div style={{ maxWidth: 640, margin: '32px auto 0', border: '1px solid var(--line)', borderRadius: 6, overflow: 'hidden' }}>
          <table style={{ width: '100%', fontSize: '0.82rem', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--line)', background: 'var(--bg-2)' }}>
                <th style={{ padding: '10px 14px', textAlign: 'left', color: 'var(--ink-2)', fontWeight: 500 }}>Feature</th>
                <th style={{ padding: '10px 14px', textAlign: 'center', color: 'var(--ink-3)', fontWeight: 500 }}>Self-Service</th>
                <th style={{ padding: '10px 14px', textAlign: 'center', color: 'var(--ink-1)', fontWeight: 500 }}>Done-For-You</th>
              </tr>
            </thead>
            <tbody>
              {CMP.map((r, i) => (
                <tr key={r.feature} style={{ borderBottom: i < CMP.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none', background: i % 2 ? 'rgba(255,255,255,0.01)' : 'transparent' }}>
                  <td style={{ padding: '9px 14px', color: 'var(--ink-3)' }}>{r.feature}</td>
                  <td style={{ padding: '9px 14px' }}><Cell ok={r.self} /></td>
                  <td style={{ padding: '9px 14px' }}><Cell ok={r.dfy} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
