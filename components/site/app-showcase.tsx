'use client'

import { useState, useEffect, useCallback } from 'react'
import { SectionHeading } from '@/components/site/section-heading'
import { Activity, Zap, LogIn } from 'lucide-react'

const SLIDES = [
  { icon: Activity, label: 'Dashboard', title: 'Real-time PC performance', description: 'Monitor CPU, RAM, Disk and Network live. Get AI-powered recommendations and optimize your system in one click.', tag: '01', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { icon: Zap,    label: 'Performance', title: 'New optimizations every release', description: 'Each release brings new performance tweaks, stability fixes, and advanced tools. Stay ahead automatically.', tag: '02', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { icon: LogIn,  label: 'Quick Access', title: 'Sign in and start optimizing', description: 'Get started in seconds with Google or Discord. Your settings and history are saved to your account.', tag: '03', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
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
        <SectionHeading eyebrow="See it in action" title="Optimize Your System," accent="Boost Your Experience." description="A powerful Windows optimizer with a clean, modern interface." />

        <div style={{ marginTop: 60, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>

          {/* Icon/Gradient visual */}
          <div style={{
            position: 'relative', borderRadius: 12, overflow: 'hidden',
            border: '1px solid var(--line)', aspectRatio: '1/1',
            opacity: fading ? 0 : 1, transform: fading ? 'scale(0.99)' : 'scale(1)',
            transition: 'opacity 0.28s ease, transform 0.28s ease',
            boxShadow: '0 24px 64px -16px rgba(0,0,0,0.7)',
            background: s.gradient,
            display: 'grid',
            placeItems: 'center',
          }}>
            {/* Animated pattern */}
            <div style={{
              position: 'absolute',
              inset: 0,
              opacity: 0.1,
              backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.8) 1px, transparent 0)',
              backgroundSize: '24px 24px',
              pointerEvents: 'none',
            }} />

            {/* Icon */}
            <div style={{
              position: 'relative',
              width: 120,
              height: 120,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.3)',
              display: 'grid',
              placeItems: 'center',
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            }}>
              <s.icon style={{ width: 60, height: 60, color: 'white' }} />
            </div>

            {/* Glow effect */}
            <div aria-hidden="true" style={{
              position: 'absolute', left: '50%', top: '50%',
              transform: 'translate(-50%, -50%)',
              width: 250, height: 250, borderRadius: '50%',
              background: 'radial-gradient(closest-side, rgba(255,255,255,0.3) 0%, transparent 70%)',
              filter: 'blur(50px)', pointerEvents: 'none',
            }} />

            <div style={{
              position: 'absolute', bottom: 16, left: 16,
              padding: '6px 12px', background: 'rgba(10,10,10,0.8)',
              border: '1px solid var(--line)', borderRadius: 6,
              fontFamily: 'ui-monospace, monospace', fontSize: '0.68rem',
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
