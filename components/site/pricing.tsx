'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { Check, Minus, Lock, Crown, ArrowRight, Clock } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { LaunchPrice, type PublicLaunchPricing } from '@/components/site/launch-price'

const PLANS = [
  {
    name: 'Free',
    price: 0,
    tagline: 'Free forever',
    note: 'Get started with essential game optimizations. Perfect for casual users.',
    cta: 'Get started',
    href: '/register',
    featured: false,
    requiresPremium: false,
    badge: null,
    perks: [
      '15 game optimizer tweaks',
      'Basic PC optimization',
      'Limited optimizations per day',
      'Community access',
      'Standard support',
    ],
  },
  {
    name: 'Self-Service',
    price: 15,
    tagline: 'One-time payment',
    note: 'Full app license. Run every optimization yourself, whenever you want.',
    cta: 'Buy license',
    href: '/checkout?plan=premium',
    featured: true,
    requiresPremium: false,
    badge: 'Most popular',
    perks: [
      'Full Syntra Optimizer license',
      'All 281 tweaks unlocked',
      'Unlimited optimizations',
      'Lifetime updates',
      'Priority support',
    ],
  },
  {
    name: 'Done-For-You',
    price: 6,
    tagline: 'Per session',
    note: 'A Syntra expert optimizes your PC remotely while you watch. No install required.',
    cta: 'Book a session',
    href: '/checkout?plan=service',
    featured: false,
    requiresPremium: true,
    badge: null,
    perks: [
      'Personal remote optimization',
      'No installation needed',
      'Expert-tuned game settings',
      'Live before/after score report',
      'Premium chat support',
    ],
  },
]

const CMP = [
  { feature: 'All optimization modules',  free: false, self: true,  dfy: true  },
  { feature: 'Run optimizations yourself', free: true,  self: true,  dfy: false },
  { feature: 'Done by a human expert',    free: false, self: false, dfy: true  },
  { feature: 'No installation needed',    free: true,  self: false, dfy: true  },
  { feature: 'Lifetime updates',          free: false, self: true,  dfy: false },
  { feature: 'Priority support',          free: false, self: true,  dfy: true  },
  { feature: 'Before/after score report', free: false, self: true,  dfy: true  },
]

/* ── Border beam on the featured card ── */
function BorderBeam({ radius = 24 }: { radius?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let angle = 0
    const draw = () => {
      const { width: w, height: h } = canvas
      ctx.clearRect(0, 0, w, h)

      const r = radius
      // Path matching the card border-radius
      const path = new Path2D()
      path.moveTo(r, 0)
      path.lineTo(w - r, 0)
      path.arcTo(w, 0, w, r, r)
      path.lineTo(w, h - r)
      path.arcTo(w, h, w - r, h, r)
      path.lineTo(r, h)
      path.arcTo(0, h, 0, h - r, r)
      path.lineTo(0, r)
      path.arcTo(0, 0, r, 0, r)
      path.closePath()

      const perimeter = 2 * (w + h)
      // Compute dot position along perimeter
      const pos = ((angle % 1) * perimeter + perimeter) % perimeter
      let x = 0; let y = 0
      if (pos < w) { x = pos; y = 0 }
      else if (pos < w + h) { x = w; y = pos - w }
      else if (pos < 2 * w + h) { x = w - (pos - w - h); y = h }
      else { x = 0; y = h - (pos - 2 * w - h) }

      // Trail gradient along path
      const strokeGrad = ctx.createLinearGradient(x - 20, y - 20, x + 20, y + 20)
      strokeGrad.addColorStop(0, 'rgba(184,215,255,0)')
      strokeGrad.addColorStop(0.5, 'rgba(184,215,255,0.8)')
      strokeGrad.addColorStop(1, 'rgba(20,77,199,0.3)')

      ctx.strokeStyle = strokeGrad
      ctx.lineWidth = 1.5
      ctx.stroke(path)

      // Bright dot
      ctx.beginPath()
      ctx.arc(x, y, 3, 0, Math.PI * 2)
      ctx.fillStyle = '#b8d7ff'
      ctx.shadowColor = '#b8d7ff'
      ctx.shadowBlur = 10
      ctx.fill()
      ctx.shadowBlur = 0

      angle += 0.004
      rafRef.current = requestAnimationFrame(draw)
    }

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas.parentElement!)
    rafRef.current = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
    }
  }, [radius])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        borderRadius: radius,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}

export function Pricing({ initialPricing }: { initialPricing?: PublicLaunchPricing } = {}) {
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
    }
    f()
  }, [])

  const hasPremium = userRole === 'premium'

  const Cell = ({ ok }: { ok: boolean }) => ok
    ? <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        width: 18, 
        height: 18, 
        margin: '0 auto',
        borderRadius: '50%',
        background: 'rgba(20,77,199,0.15)',
        border: '1px solid rgba(184,215,255,0.25)'
      }}>
        <Check style={{ width: 10, height: 10, color: '#b8d7ff' }} />
      </div>
    : <Minus style={{ width: 11, height: 11, color: 'rgba(255,255,255,0.12)', margin: '0 auto' }} />

  return (
    <section id="pricing" style={{ scrollMarginTop: 80, background: '#000309' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '96px 24px' }}>

        {/* ── Lamp heading ── */}
        <div style={{ textAlign: 'center', marginBottom: 56, position: 'relative' }}>
          {/* Lamp cone glow */}
          <div aria-hidden="true" style={{
            position: 'absolute', left: '50%', top: -60,
            transform: 'translateX(-50%)',
            width: 2, height: 60,
            background: 'linear-gradient(to bottom, transparent, rgba(20,77,199,0.6))',
          }} />
          <div aria-hidden="true" style={{
            position: 'absolute', left: '50%', top: 0,
            transform: 'translateX(-50%)',
            width: 320, height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(20,77,199,0.5), transparent)',
          }} />
          <div aria-hidden="true" style={{
            position: 'absolute', left: '50%', top: 0,
            transform: 'translateX(-50%)',
            width: 200, height: 80,
            background: 'radial-gradient(ellipse at 50% 0%, rgba(20,77,199,0.25) 0%, transparent 70%)',
            filter: 'blur(20px)',
            pointerEvents: 'none',
          }} />

          <p style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            fontFamily: 'ui-monospace, monospace',
            fontSize: '0.7rem', fontWeight: 400,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: '#b8d7ff', marginBottom: 12,
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: '#144dc7', boxShadow: '0 0 8px #144dc7',
              display: 'inline-block',
            }} />
            Packages
          </p>
          <h2 style={{
            fontFamily: "'Switzer', var(--font-inter), ui-sans-serif, system-ui, sans-serif",
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            fontWeight: 600, letterSpacing: '-0.03em',
            lineHeight: 1.1, color: '#fff', margin: '0 0 14px',
          }}>
            Pick how deep{' '}
            <em style={{
              fontStyle: 'italic',
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontWeight: 400,
              color: 'rgba(255,255,255,0.4)',
            }}>we go.</em>
          </h2>
          <p style={{
            fontSize: '0.95rem', color: 'rgba(255,255,255,0.45)',
            lineHeight: 1.65, maxWidth: '50ch', marginInline: 'auto',
            letterSpacing: '-0.02em',
            fontFamily: "'Switzer', var(--font-inter), ui-sans-serif, system-ui, sans-serif",
          }}>
            One payment, one result. Do it yourself with the app, or have a Syntra specialist handle everything remotely.
          </p>
        </div>

        {/* ── Plan cards ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 16,
          maxWidth: 900,
          marginInline: 'auto',
        }}>
          {PLANS.map(plan => {
            const locked = plan.requiresPremium && loaded && !hasPremium
            return (
              <div
                key={plan.name}
                style={{
                  background: plan.featured 
                    ? 'linear-gradient(145deg, rgba(42,91,255,0.18) 0%, rgba(18,42,88,0.92) 50%, rgba(7,16,35,0.96) 100%)'
                    : 'linear-gradient(145deg, rgba(14,25,48,0.88) 0%, rgba(7,14,29,0.94) 100%)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: `1px solid ${plan.featured ? 'rgba(125,166,255,0.55)' : 'rgba(255,255,255,0.12)'}`,
                  borderRadius: 24,
                  padding: '28px 24px 24px',
                  minHeight: 500,
                  display: 'flex', flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: plan.featured 
                    ? '0 28px 72px -28px rgba(20,77,199,0.55), inset 0 1px 0 rgba(184,215,255,0.15), 0 0 0 1px rgba(125,166,255,0.3), 0 0 40px -15px rgba(20,77,199,0.2)'
                    : '0 20px 56px -32px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.06)',
                  isolation: 'isolate',
                  transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.4s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px) scale(1.01)'
                  e.currentTarget.style.boxShadow = plan.featured 
                    ? '0 36px 96px -28px rgba(20,77,199,0.65), inset 0 1px 0 rgba(184,215,255,0.2), 0 0 0 1px rgba(125,166,255,0.4), 0 0 50px -15px rgba(20,77,199,0.3)'
                    : '0 28px 72px -32px rgba(0,0,0,0.95), inset 0 1px 0 rgba(255,255,255,0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)'
                  e.currentTarget.style.boxShadow = plan.featured 
                    ? '0 28px 72px -28px rgba(20,77,199,0.55), inset 0 1px 0 rgba(184,215,255,0.15), 0 0 0 1px rgba(125,166,255,0.3), 0 0 40px -15px rgba(20,77,199,0.2)'
                    : '0 20px 56px -32px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.06)'
                }}
              >
                {/* Animated background glow */}
                {plan.featured && (
                  <>
                    <div style={{
                      position: 'absolute',
                      top: -50,
                      right: -50,
                      width: 200,
                      height: 200,
                      background: 'radial-gradient(circle, rgba(42,91,255,0.3) 0%, transparent 70%)',
                      borderRadius: '50%',
                      filter: 'blur(40px)',
                      animation: 'pulse 4s ease-in-out infinite',
                      pointerEvents: 'none',
                    }} />
                    <div style={{
                      position: 'absolute',
                      bottom: -30,
                      left: -30,
                      width: 150,
                      height: 150,
                      background: 'radial-gradient(circle, rgba(184,215,255,0.2) 0%, transparent 70%)',
                      borderRadius: '50%',
                      filter: 'blur(30px)',
                      animation: 'pulse 4s ease-in-out infinite 2s',
                      pointerEvents: 'none',
                    }} />
                  </>
                )}
                {/* Border beam on featured */}
                {plan.featured && <BorderBeam radius={24} />}

                {/* Content above beam */}
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', flex: 1 }}>

                  {/* Badge */}
                  {plan.badge && (
                    <div style={{ marginBottom: 14 }}>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: 5,
                        padding: '4px 12px',
                        background: 'linear-gradient(135deg, rgba(20,77,199,0.3), rgba(42,91,255,0.2))',
                        border: '1px solid rgba(20,77,199,0.5)',
                        borderRadius: 40,
                        fontSize: '0.68rem', fontWeight: 600,
                        color: '#b8d7ff',
                        letterSpacing: '-0.01em',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        boxShadow: '0 0 20px -8px rgba(20,77,199,0.5)',
                      }}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#b8d7ff', flexShrink: 0, boxShadow: '0 0 8px #b8d7ff' }} />
                        {plan.badge}
                      </span>
                    </div>
                  )}

                  {/* Name band */}
                  <div style={{
                    padding: '0 0 12px',
                    background: 'transparent',
                    borderBottom: `1px solid ${plan.featured ? 'rgba(184,215,255,0.25)' : 'rgba(255,255,255,0.12)'}`,
                    borderRadius: 0, marginBottom: 18,
                    display: 'block',
                  }}>
                    <h3 style={{
                      fontSize: '1.05rem', fontWeight: 600,
                      color: plan.featured ? '#fff' : 'rgba(255,255,255,0.95)',
                      letterSpacing: '-0.02em', margin: 0,
                      fontFamily: "'Switzer', var(--font-inter), ui-sans-serif, system-ui, sans-serif",
                      textShadow: plan.featured ? '0 0 30px rgba(184,215,255,0.3)' : 'none',
                    }}>{plan.name}</h3>
                  </div>

                  {/* Price */}
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 10 }}>
                    {plan.name === 'Self-Service' ? (
                      <LaunchPrice card initialPricing={initialPricing} />
                    ) : (
                      <span style={{
                        fontSize: plan.price === 0 ? '2.8rem' : '3.2rem',
                        fontWeight: 700,
                        letterSpacing: '-0.05em', color: '#fff',
                        fontFamily: 'ui-monospace, monospace', lineHeight: 1,
                        textShadow: plan.featured ? '0 0 40px rgba(184,215,255,0.4)' : 'none',
                      }}>{plan.price === 0 ? 'Free' : `$${plan.price}`}</span>
                    )}
                    <span style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.45)', letterSpacing: '-0.02em' }}>
                      {plan.tagline}
                    </span>
                  </div>

                  {/* Booking time */}
                  <p style={{
                    display: 'flex', alignItems: 'center', gap: 5,
                    fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)',
                    marginBottom: 20, letterSpacing: '-0.02em',
                  }}>
                    <Clock style={{ width: 11, height: 11, flexShrink: 0 }} />
                    {plan.featured ? '1 to 2 days' : 'Instant access'}
                  </p>

                  <p style={{
                    fontSize: '0.86rem', color: 'rgba(255,255,255,0.55)',
                    lineHeight: 1.65, marginBottom: 28, letterSpacing: '-0.02em',
                  }}>{plan.note}</p>

                  {/* CTA */}
                  {locked ? (
                    <div style={{ marginBottom: 12 }}>
                      <div style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        fontSize: '0.74rem', color: 'rgba(255,255,255,0.3)',
                        padding: '8px 12px',
                        background: 'rgba(255,255,255,0.03)',
                        borderRadius: 10, border: '1px solid rgba(255,255,255,0.07)',
                        marginBottom: 10,
                      }}>
                        <Lock style={{ width: 11, height: 11 }} />
                        Requires Self-Service license first
                      </div>
                      <Link href="/checkout?plan=premium" style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                        padding: '11px 20px', borderRadius: 12,
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: 'rgba(255,255,255,0.7)',
                        fontSize: '0.86rem', fontWeight: 500,
                        textDecoration: 'none', letterSpacing: '-0.02em',
                      }}>
                        <Crown style={{ width: 12, height: 12 }} />
                        Get Self-Service first
                      </Link>
                    </div>
                  ) : (
                    <Link
                      href={plan.href}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                        padding: '14px 20px', borderRadius: 14,
                        background: plan.featured 
                          ? 'linear-gradient(135deg, #ffffff 0%, #f0f4ff 100%)'
                          : 'rgba(255,255,255,0.08)',
                        border: plan.featured ? 'none' : '1px solid rgba(255,255,255,0.15)',
                        color: plan.featured ? '#000309' : 'rgba(255,255,255,0.9)',
                        fontSize: '0.88rem', fontWeight: 600,
                        textDecoration: 'none', letterSpacing: '-0.02em',
                        boxShadow: plan.featured 
                          ? 'rgba(255,255,255,0.9) 0px 1px 0px inset, 0 4px 20px -4px rgba(255,255,255,0.4), 0 0 30px -10px rgba(184,215,255,0.3)'
                          : '0 4px 15px -4px rgba(0,0,0,0.3)',
                        transition: 'transform .2s, filter .2s, box-shadow .2s',
                        marginBottom: 22,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)'
                        e.currentTarget.style.filter = 'brightness(1.05)'
                        if (plan.featured) {
                          e.currentTarget.style.boxShadow = 'rgba(255,255,255,0.9) 0px 1px 0px inset, 0 8px 30px -4px rgba(255,255,255,0.5), 0 0 40px -10px rgba(184,215,255,0.4)'
                        } else {
                          e.currentTarget.style.boxShadow = '0 8px 25px -4px rgba(0,0,0,0.4)'
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)'
                        e.currentTarget.style.filter = 'brightness(1)'
                        if (plan.featured) {
                          e.currentTarget.style.boxShadow = 'rgba(255,255,255,0.9) 0px 1px 0px inset, 0 4px 20px -4px rgba(255,255,255,0.4), 0 0 30px -10px rgba(184,215,255,0.3)'
                        } else {
                          e.currentTarget.style.boxShadow = '0 4px 15px -4px rgba(0,0,0,0.3)'
                        }
                      }}
                    >
                      {plan.cta}
                      <ArrowRight style={{ width: 13, height: 13 }} />
                    </Link>
                  )}

                  {/* Perks */}
                  <p style={{
                    fontSize: '0.72rem', fontWeight: 500,
                    color: 'rgba(255,255,255,0.35)', letterSpacing: '0.04em',
                    textTransform: 'uppercase', marginBottom: 14, paddingTop: 20, borderTop: `1px solid ${plan.featured ? 'rgba(184,215,255,0.15)' : 'rgba(255,255,255,0.08)'}`,
                  }}>
                    {plan.featured ? 'Everything in Self-Service, plus' : 'Features'}
                  </p>
                  <ul style={{
                    listStyle: 'none', padding: 0, margin: 0,
                    display: 'flex', flexDirection: 'column', gap: 11, flex: 1,
                  }}>
                    {plan.perks.map((p, index) => (
                      <li key={p} style={{
                        display: 'flex', gap: 10,
                        fontSize: '0.85rem', color: 'rgba(255,255,255,0.65)',
                        letterSpacing: '-0.02em',
                        alignItems: 'flex-start',
                        transition: 'color 0.2s ease, transform 0.2s ease',
                        opacity: 0,
                        animation: `fade-in-up 0.4s ease forwards ${index * 0.05}s`,
                      }}>
                        <div style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          width: 18, height: 18, flexShrink: 0, marginTop: 1,
                          borderRadius: '50%',
                          background: plan.featured ? 'rgba(42,91,255,0.25)' : 'rgba(20,77,199,0.15)',
                          border: `1px solid ${plan.featured ? 'rgba(42,91,255,0.45)' : 'rgba(20,77,199,0.3)'}`,
                          transition: 'background 0.2s ease, border-color 0.2s ease',
                        }}>
                          <Check style={{ width: 10, height: 10, color: plan.featured ? '#b8d7ff' : '#8fb0ff' }} />
                        </div>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>

        {/* ── Comparison table ── */}
        <div style={{
          maxWidth: 660, margin: '20px auto 0',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 16, overflow: 'hidden',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.01) 100%)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px -8px rgba(0,0,0,0.3)',
        }}>
          <table style={{ width: '100%', fontSize: '0.82rem', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(20,77,199,0.08)' }}>
                <th style={{
                  padding: '14px 16px', textAlign: 'left',
                  color: 'rgba(255,255,255,0.4)', fontWeight: 600,
                  letterSpacing: '-0.02em',
                  fontFamily: "'Switzer', var(--font-inter), ui-sans-serif, system-ui, sans-serif",
                }}>Feature</th>
                <th style={{
                  padding: '14px 16px', textAlign: 'center',
                  color: 'rgba(255,255,255,0.35)', fontWeight: 600,
                  fontSize: '0.78rem', letterSpacing: '-0.02em',
                  fontFamily: "'Switzer', var(--font-inter), ui-sans-serif, system-ui, sans-serif",
                }}>Free</th>
                <th style={{
                  padding: '14px 16px', textAlign: 'center',
                  color: 'rgba(255,255,255,0.35)', fontWeight: 600,
                  fontSize: '0.78rem', letterSpacing: '-0.02em',
                  fontFamily: "'Switzer', var(--font-inter), ui-sans-serif, system-ui, sans-serif",
                }}>Self-Service</th>
                <th style={{
                  padding: '14px 16px', textAlign: 'center',
                  color: '#b8d7ff', fontWeight: 600,
                  fontSize: '0.78rem', letterSpacing: '-0.02em',
                  textShadow: '0 0 15px rgba(184,215,255,0.3)',
                  fontFamily: "'Switzer', var(--font-inter), ui-sans-serif, system-ui, sans-serif",
                }}>Done-For-You</th>
              </tr>
            </thead>
            <tbody>
              {CMP.map((r, i) => (
                <tr
                  key={r.feature}
                  style={{
                    borderBottom: i < CMP.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                    transition: 'background 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(20,77,199,0.05)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  <td style={{ padding: '12px 16px', color: 'rgba(255,255,255,0.5)', letterSpacing: '-0.02em' }}>
                    {r.feature}
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'center' }}><Cell ok={r.free} /></td>
                  <td style={{ padding: '12px 16px', textAlign: 'center' }}><Cell ok={r.self} /></td>
                  <td style={{ padding: '12px 16px', textAlign: 'center' }}><Cell ok={r.dfy} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  )
}
