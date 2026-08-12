'use client'

import Link from 'next/link'
import { Download, ShieldCheck } from 'lucide-react'
import { useEffect, useRef } from 'react'

const SPECKS = [
  { top: '20%', left: '12%', opacity: 0.4 },
  { top: '36%', left: '7%', opacity: 0.25 },
  { top: '16%', right: '11%', opacity: 0.45 },
  { top: '50%', right: '16%', opacity: 0.25 },
  { top: '62%', left: '20%', opacity: 0.3 },
  { top: '72%', right: '8%', opacity: 0.35 },
]

export function Hero() {
  const badgeRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = badgeRef.current
    if (!el) return
    let f = 0
    const t0 = performance.now()
    const tick = (now: number) => {
      const t = (now - t0) / 3000
      el.style.transform = `translate(${Math.sin(t * 1.3) * 5}px, ${Math.cos(t * 0.9) * 2.5}px)`
      f = requestAnimationFrame(tick)
    }
    f = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(f)
  }, [])

  return (
    <section className="relative overflow-hidden" style={{ minHeight: '94vh', background: 'var(--bg-0)' }}>
      {/* Dot grid */}
      <div className="dot-grid" aria-hidden="true" style={{
        position: 'absolute', inset: 0, opacity: 0.35, pointerEvents: 'none', zIndex: 0,
        maskImage: 'radial-gradient(ellipse 75% 65% at 50% 25%, #000 15%, transparent 75%)',
        WebkitMaskImage: 'radial-gradient(ellipse 75% 65% at 50% 25%, #000 15%, transparent 75%)',
      }} />

      {/* Glows */}
      <div aria-hidden="true" className="glow glow-white"
        style={{ left: '50%', top: '-4%', width: 1000, height: 700, opacity: 0.55, zIndex: 0 }} />
      <div aria-hidden="true" className="glow glow-soft"
        style={{ left: '15%', top: '40%', width: 600, height: 700, opacity: 0.32, zIndex: 0 }} />
      <div aria-hidden="true" className="glow glow-soft"
        style={{ left: '85%', top: '32%', width: 500, height: 600, opacity: 0.28, zIndex: 0 }} />

      {/* Hero grid */}
      <div className="hero-grid" aria-hidden="true" />

      {/* Specks */}
      {SPECKS.map((s, i) => <div key={i} className="speck" style={s} aria-hidden="true" />)}

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 pt-24 pb-0 sm:px-6 sm:pt-32 text-center">

        {/* Badge */}
        <span
          ref={badgeRef}
          className="s-tag inline-flex"
          style={{ willChange: 'transform', marginBottom: 28 }}
        >
          <span className="live-dot" />
          Now optimizing Windows 10 &amp; 11
        </span>

        {/* H1 */}
        <h1 style={{
          marginTop: 24,
          fontSize: 'clamp(2.8rem, 6.5vw, 5.8rem)',
          fontWeight: 700,
          lineHeight: 1.0,
          letterSpacing: '-0.04em',
        }}>
          <span className="block" style={{
            color: 'transparent',
            backgroundImage: 'linear-gradient(180deg, #f5f5f7 0%, rgba(245,245,247,0.7) 100%)',
            WebkitBackgroundClip: 'text', backgroundClip: 'text',
            marginBottom: '-0.04em',
          }}>
            Optimize your PC.
          </span>
          <span className="block" style={{
            color: 'transparent',
            backgroundImage: 'radial-gradient(ellipse at 50% 100%, #ffffff 0%, rgba(255,255,255,0.55) 70%)',
            WebkitBackgroundClip: 'text', backgroundClip: 'text',
          }}>
            Instantly.
          </span>
        </h1>

        {/* Sub */}
        <p style={{
          marginTop: 24,
          fontSize: '1.05rem',
          lineHeight: 1.65,
          color: 'var(--ink-2)',
          fontWeight: 400,
          maxWidth: 480,
          marginInline: 'auto',
        }}>
          Syntra scans, fixes, and fine-tunes your Windows machine in one click —
          debloating, tuning your network, and squeezing every last frame from your games.
        </p>

        {/* CTAs */}
        <div style={{ marginTop: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/checkout?plan=premium" className="btn-primary">
            <Download style={{ width: 15, height: 15 }} />
            Get Started
          </Link>
          <a href="#pricing" className="btn-ghost">View Pricing</a>
        </div>

        {/* Trust */}
        <p style={{
          marginTop: 20,
          display: 'inline-flex', alignItems: 'center', gap: 7,
          fontSize: '0.78rem', color: 'var(--ink-3)',
        }}>
          <ShieldCheck style={{ width: 13, height: 13, color: 'var(--ink-2)' }} />
          Safe, reversible changes · No account required to scan
        </p>
      </div>

      {/* Planet dome */}
      <div aria-hidden="true" className="planet" style={{
        top: 'calc(94vh - 6vw)', width: '260vw', height: '260vw', zIndex: 2,
      }} />
      <div aria-hidden="true" className="planet-rim" style={{
        top: 'calc(94vh - 6vw)', width: '260vw', height: '260vw', zIndex: 3,
      }} />
    </section>
  )
}
