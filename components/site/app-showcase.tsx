'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { SectionHeading } from '@/components/site/section-heading'

const SLIDES = [
  { image: '/images/app-dashboard.png', label: 'Dashboard', title: 'Real-time PC performance', description: 'Monitor CPU, RAM, Disk and Network live. Get AI-powered recommendations and optimize your system in one click.', tag: '01' },
  { image: '/images/app-updates.png',   label: 'Performance', title: 'New optimizations every release', description: 'Each release brings new performance tweaks, stability fixes, and advanced tools. Stay ahead automatically.', tag: '02' },
  { image: '/images/app-login.png',     label: 'Quick Access', title: 'Sign in and start optimizing', description: 'Get started in seconds with Google or Discord. Your settings and history are saved to your account.', tag: '03' },
]

export function AppShowcase() {
  const [current, setCurrent] = useState(0)
  const [fading, setFading] = useState(false)

  const goTo = useCallback((i: number) => {
    if (i === current || fading) return
    setFading(true)
    setTimeout(() => { setCurrent(i); setFading(false) }, 280)
  }, [current, fading])

  const next = useCallback(() => goTo((current + 1) % SLIDES.length), [current, goTo])
  useEffect(() => { const t = setInterval(next, 5500); return () => clearInterval(t) }, [next])

  const s = SLIDES[current]

  return (
    <section style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
      <div style={{ maxWidth: 1088, margin: '0 auto', padding: '96px 24px' }}>
        <SectionHeading eyebrow="See it in action" title="Built for performance," accent="designed for you." description="A powerful Windows optimizer with a clean, modern interface." />

        <div style={{ marginTop: 60, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>

          {/* Image */}
          <div style={{
            position: 'relative', borderRadius: 6, overflow: 'hidden',
            border: '1px solid var(--line)', aspectRatio: '16/10',
            opacity: fading ? 0 : 1, transform: fading ? 'scale(0.99)' : 'scale(1)',
            transition: 'opacity 0.28s ease, transform 0.28s ease',
            boxShadow: '0 24px 64px -16px rgba(0,0,0,0.7)',
          }}>
            <Image src={s.image} alt={s.label} fill className="object-cover object-top" priority />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 50%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '28%', background: 'linear-gradient(to top, rgba(10,10,10,0.65), transparent)', pointerEvents: 'none' }} />
            <div style={{
              position: 'absolute', bottom: 10, left: 10,
              padding: '3px 7px', background: 'rgba(10,10,10,0.8)',
              border: '1px solid var(--line)', borderRadius: 3,
              fontFamily: 'ui-monospace, monospace', fontSize: '0.62rem',
              letterSpacing: '0.1em', color: 'var(--ink-3)',
            }}>{s.tag} / 0{SLIDES.length}</div>
          </div>

          {/* Text */}
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
              {SLIDES.map((sl, i) => (
                <button key={sl.label} onClick={() => goTo(i)} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                  opacity: i === current ? 1 : 0.3, transition: 'opacity 0.3s ease',
                }}>
                  <div style={{ width: i === current ? 28 : 6, height: 2, background: i === current ? 'var(--ink-0)' : 'var(--ink-3)', borderRadius: 0, transition: 'width 0.35s ease', flexShrink: 0 }} />
                  <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: i === current ? 'var(--ink-1)' : 'var(--ink-3)', transition: 'color 0.3s ease' }}>{sl.label}</span>
                </button>
              ))}
            </div>

            <div key={current} style={{ animation: 'fadeUp 0.38s ease' }}>
              <h3 style={{ fontSize: 'clamp(1.3rem, 2.2vw, 1.8rem)', fontWeight: 600, letterSpacing: '-0.028em', lineHeight: 1.2, color: 'var(--ink-0)', marginBottom: 12 }}>{s.title}</h3>
              <p style={{ fontSize: '0.88rem', lineHeight: 1.7, color: 'var(--ink-2)', maxWidth: '36ch' }}>{s.description}</p>
            </div>

            <div style={{ marginTop: 28, height: 2, background: 'var(--bg-3)', maxWidth: 180, borderRadius: 0, overflow: 'hidden' }}>
              <div style={{ height: '100%', background: 'var(--ink-1)', width: `${((current + 1) / SLIDES.length) * 100}%`, transition: 'width 0.35s ease' }} />
            </div>
            <p style={{ marginTop: 7, fontFamily: 'ui-monospace, monospace', fontSize: '0.62rem', letterSpacing: '0.1em', color: 'var(--ink-3)', textTransform: 'uppercase' }}>{current + 1} / {SLIDES.length}</p>
          </div>
        </div>
      </div>
      <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:translateY(0) } }`}</style>
    </section>
  )
}
