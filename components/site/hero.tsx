'use client'

import Link from 'next/link'
import { Download, ShieldCheck } from 'lucide-react'
import { useEffect, useRef } from 'react'

function Speck({ style }: { style: React.CSSProperties }) {
  return <div className="speck" style={style} aria-hidden="true" />
}

const SPECKS = [
  { top: '22%', left: '14%', opacity: 0.45 },
  { top: '38%', left: '8%', opacity: 0.3 },
  { top: '18%', right: '12%', opacity: 0.5 },
  { top: '52%', right: '18%', opacity: 0.28 },
  { top: '64%', left: '22%', opacity: 0.35 },
  { top: '74%', right: '9%', opacity: 0.4 },
  { top: '42%', left: '44%', opacity: 0.22 },
  { top: '28%', right: '34%', opacity: 0.3 },
]

export function Hero() {
  const badgeRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const badge = badgeRef.current
    if (!badge) return
    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = (now - start) / 3000
      const x = Math.sin(t * 1.3) * 6
      const y = Math.cos(t * 0.9) * 3
      badge.style.transform = `translate(${x}px, ${y}px)`
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <section className="relative overflow-hidden" style={{ minHeight: '92vh' }}>
      {/* Dot grid background */}
      <div className="dot-grid" aria-hidden="true" style={{
        position: 'absolute', inset: 0, opacity: 0.4, pointerEvents: 'none', zIndex: 0,
        maskImage: 'radial-gradient(ellipse 70% 70% at 50% 30%, #000 20%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 30%, #000 20%, transparent 80%)',
      }} />
      {/* Glows */}
      <div aria-hidden="true" className="glow glow-white"
        style={{ left: '50%', top: '-2%', width: 900, height: 620, opacity: 0.38 }} />
      <div aria-hidden="true" className="glow glow-soft"
        style={{ left: '18%', top: '35%', width: 480, height: 680, opacity: 0.28 }} />
      <div aria-hidden="true" className="glow glow-soft"
        style={{ left: '82%', top: '28%', width: 380, height: 520, opacity: 0.22 }} />

      {/* Hero grid */}
      <div className="hero-grid" aria-hidden="true" />

      {/* Specks */}
      {SPECKS.map((s, i) => <Speck key={i} style={s} />)}

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-20 pb-0 sm:px-6 sm:pt-28">
        <div className="mx-auto max-w-3xl text-center dt-section-reveal">

          {/* Badge */}
          <span
            ref={badgeRef}
            className="section-tag inline-flex dt-stagger-item"
            style={{ willChange: 'transform', '--stagger-delay': '0s' } as React.CSSProperties}
          >
            <span className="size-1.5 rounded-full bg-white/60" />
            Now optimizing Windows 10 &amp; 11
          </span>

          {/* Headline */}
          <h1
            className="mt-8 text-pretty dt-stagger-item"
            style={{
              fontSize: 'clamp(3rem, 7vw, 6rem)',
              fontWeight: 700,
              lineHeight: 1.0,
              letterSpacing: '-0.04em',
              '--stagger-delay': '0.08s',
            } as React.CSSProperties}
          >
            <span
              className="block"
              style={{
                marginBottom: '-0.05em',
                color: 'transparent',
                backgroundImage: 'linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.75) 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
              }}
            >
              Optimize your PC.
            </span>
            <span
              className="block"
              style={{
                color: 'transparent',
                backgroundImage: 'radial-gradient(ellipse at 50% 100%, #ffffff 0%, rgba(255,255,255,0.6) 70%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                textShadow: '0 0 80px rgba(255,255,255,0.3)',
              }}
            >
              Instantly.
            </span>
          </h1>

          {/* Sub */}
          <p
            className="mx-auto mt-7 max-w-xl text-pretty text-base leading-relaxed sm:text-lg dt-stagger-item"
            style={{
              color: 'rgba(255,255,255,0.52)',
              fontWeight: 300,
              '--stagger-delay': '0.16s',
            } as React.CSSProperties}
          >
            Syntra scans, fixes, and fine-tunes your Windows machine in one click — debloating,
            tuning your network, and squeezing every last frame out of your games.
          </p>

          {/* CTAs */}
          <div
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row dt-stagger-item"
            style={{ '--stagger-delay': '0.24s' } as React.CSSProperties}
          >
            <Link href="/checkout?plan=premium" className="btn-bevel">
              <Download className="size-4" />
              Get Started
            </Link>
            <a href="#pricing" className="btn-bevel-ghost">
              View Pricing
            </a>
          </div>

          {/* Trust line */}
          <p
            className="mt-5 inline-flex items-center gap-2 text-xs"
            style={{ color: 'rgba(255,255,255,0.38)' }}
          >
            <ShieldCheck className="size-3.5" style={{ color: 'rgba(255,255,255,0.6)' }} />
            Safe, reversible changes · No account required to scan
          </p>
        </div>
      </div>

      {/* Planet dome */}
      <div aria-hidden="true" className="planet"
        style={{ top: 'calc(92vh - 8vw)', width: '260vw', height: '260vw', zIndex: 2 }} />
      <div aria-hidden="true" className="planet-rim"
        style={{ top: 'calc(92vh - 8vw)', width: '260vw', height: '260vw', zIndex: 3 }} />
    </section>
  )
}
