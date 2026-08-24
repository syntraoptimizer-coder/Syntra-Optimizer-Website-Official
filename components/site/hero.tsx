'use client'

import Link from 'next/link'
import { Download, ArrowRight, ShieldCheck, Star } from 'lucide-react'
import { useEffect, useRef } from 'react'

const SPECKS = [
  { top: '18%', left: '8%',   opacity: 0.6 },
  { top: '38%', left: '5%',   opacity: 0.4 },
  { top: '14%', right: '9%',  opacity: 0.5 },
  { top: '44%', right: '12%', opacity: 0.35 },
  { top: '60%', left: '18%',  opacity: 0.3 },
  { top: '68%', right: '7%',  opacity: 0.4 },
]

const AVATARS = [
  { initials: 'DA', bg: 'linear-gradient(135deg,#144dc7,#3b82f6)' },
  { initials: 'CR', bg: 'linear-gradient(135deg,#0ea5e9,#38bdf8)' },
  { initials: 'NP', bg: 'linear-gradient(135deg,#6366f1,#8b5cf6)' },
  { initials: 'ZN', bg: 'linear-gradient(135deg,#10b981,#34d399)' },
  { initials: 'KV', bg: 'linear-gradient(135deg,#f59e0b,#fbbf24)' },
]

export function Hero() {
  const badgeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = badgeRef.current
    if (!el) return
    let raf = 0
    const t0 = performance.now()
    const tick = (now: number) => {
      const t = (now - t0) / 3200
      el.style.transform = `translate(${Math.sin(t * 1.2) * 4}px, ${Math.cos(t * 0.8) * 2}px)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
        background: 'var(--bg-page)',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 80,
      }}
    >
      {/* ── Background grid lines ── */}
      <div className="hero-grid" aria-hidden="true" />

      {/* ── Blue glow centre ── */}
      <div aria-hidden="true" className="glow glow-blue" style={{
        left: '50%', top: '35%', width: 900, height: 600, opacity: 0.55, zIndex: 0,
      }} />
      <div aria-hidden="true" className="glow glow-blue" style={{
        left: '20%', top: '60%', width: 500, height: 400, opacity: 0.2, zIndex: 0,
      }} />
      <div aria-hidden="true" className="glow glow-blue" style={{
        left: '80%', top: '55%', width: 400, height: 350, opacity: 0.18, zIndex: 0,
      }} />

      {/* ── Specks ── */}
      {SPECKS.map((s, i) => (
        <div key={i} className="speck" style={s} aria-hidden="true" />
      ))}

      {/* ── Content ── */}
      <div style={{
        position: 'relative', zIndex: 1,
        width: '100%',
        maxWidth: 780,
        margin: '0 auto',
        padding: '0 24px 80px',
        textAlign: 'center',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28,
      }}>

        {/* Announcement badge */}
        <div ref={badgeRef} className="announce-badge" style={{ willChange: 'transform' }}>
          <span className="new-pill">New</span>
          <span className="badge-text">Syntra v2 — now with advanced memory tuning</span>
          <ArrowRight style={{ width: 13, height: 13, color: 'var(--blue-light)', opacity: 0.7 }} />
        </div>

        {/* H1 */}
        <h1 style={{
          fontSize: 'clamp(2.6rem, 6vw, 4.4rem)',
          fontWeight: 600,
          lineHeight: 1.08,
          letterSpacing: '-0.05em',
          color: '#ffffff',
          margin: 0,
        }}>
          Optimize your PC.<br />
          <span style={{ color: 'rgba(255,255,255,0.55)' }}>Instantly.</span>
        </h1>

        {/* Sub */}
        <p style={{
          fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
          lineHeight: 1.6,
          color: 'rgba(255,255,255,0.5)',
          fontWeight: 500,
          maxWidth: 500,
          margin: 0,
          letterSpacing: '-0.03em',
        }}>
          Syntra scans, fixes, and fine-tunes your Windows machine in one click —
          debloating, tuning your network, and squeezing every last frame from your games.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/checkout?plan=premium" className="btn-primary" style={{ padding: '12px 28px', fontSize: '0.95rem' }}>
            <Download style={{ width: 15, height: 15 }} />
            Get Started
            <ArrowRight style={{ width: 13, height: 13 }} />
          </Link>
          <a href="#pricing" className="btn-ghost" style={{ padding: '12px 28px', fontSize: '0.95rem' }}>
            View Pricing
          </a>
        </div>

        {/* Social proof + trust row — single clean bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          padding: '9px 18px',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 40,
          backdropFilter: 'blur(10px)',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          {/* Stacked avatars */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {AVATARS.map((av, i) => (
              <div key={av.initials} style={{
                width: 26, height: 26, borderRadius: '50%',
                background: av.bg,
                border: '2px solid var(--bg-page)',
                marginLeft: i === 0 ? 0 : -7,
                display: 'grid', placeItems: 'center',
                fontSize: '0.5rem', fontWeight: 700,
                color: 'rgba(255,255,255,0.9)',
                position: 'relative', zIndex: AVATARS.length - i,
              }}>
                {av.initials}
              </div>
            ))}
          </div>

          {/* Stars */}
          <div style={{ display: 'flex', gap: 2 }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} style={{ width: 10, height: 10, fill: '#f5c518', color: '#f5c518' }} />
            ))}
          </div>

          <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>
            <strong style={{ color: '#fff', fontWeight: 600 }}>100+</strong> PCs optimized
          </span>

          {/* Divider */}
          <div style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.1)', flexShrink: 0 }} />

          <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.75rem', color: 'rgba(255,255,255,0.38)', whiteSpace: 'nowrap' }}>
            <ShieldCheck style={{ width: 11, height: 11, color: 'rgba(184,215,255,0.6)', flexShrink: 0 }} />
            Safe &amp; reversible
          </span>
        </div>
      </div>
    </section>
  )
}
