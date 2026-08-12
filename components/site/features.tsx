'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Zap, Gamepad2, Wifi, Trash2, MemoryStick, Settings2, ArrowRight, type LucideIcon } from 'lucide-react'

type Feature = {
  icon: LucideIcon
  number: string
  title: string
  tag: string
  description: string
  image: string
}

const FEATURES: Feature[] = [
  { icon: Zap,         number: '01', title: 'Windows Performance', tag: 'Faster PC',        image: '/images/feat-windows.png',  description: 'Boost responsiveness, speed up startup, and eliminate background activity. Disable telemetry, clean registry bloat, and remove auto-start programs for maximum efficiency.' },
  { icon: Gamepad2,    number: '02', title: 'Gaming Experience',   tag: 'Higher FPS',       image: '/images/feat-gaming.png',   description: 'Improve FPS, reduce stuttering, minimize input lag, and optimize CPU and GPU resources. Per-game priority and HAGS configuration for consistent high frames.' },
  { icon: Wifi,        number: '03', title: 'Network Boost',       tag: 'Lower Ping',       image: '/images/feat-network.png',  description: 'Reduce latency with TCP/IP stack tuning, DNS prefetch, Nagle algorithm disable, and QoS prioritization. Cut your average ping by 15–30ms.' },
  { icon: Trash2,      number: '04', title: 'Deep Cleanup',        tag: 'Cleaner Windows',  image: '/images/feat-cleanup.png',  description: 'Remove temp files, cache, and system clutter. Safely clear Windows Update cache, thumbnail databases, and prefetch files. Recover 8–15GB on average.' },
  { icon: MemoryStick, number: '05', title: 'Memory Optimization', tag: 'Better Stability', image: '/images/feat-memory.png',   description: 'Release trapped kernel memory, compress standby list, and adjust working set policies to keep RAM allocation optimal during intensive gaming sessions.' },
  { icon: Settings2,   number: '06', title: 'Advanced Tweaks',     tag: 'Pro Performance',  image: '/images/feat-advanced.png', description: 'Expose BIOS-level settings, Resizable BAR, XMP/EXPO memory profiles, and GPU driver tweaks normally reserved for enthusiasts and overclockers.' },
]

function FeatureRow({ f, index }: { f: Feature; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const isEven = index % 2 === 0

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 0,
        borderRadius: 8,
        overflow: 'hidden',
        border: '1px solid var(--line)',
        background: 'var(--bg-1)',
        opacity: visible ? 1 : 0,
        transform: visible
          ? 'translateY(0)'
          : `translateY(40px)`,
        transition: 'opacity 0.7s cubic-bezier(0.2,0.8,0.2,1), transform 0.7s cubic-bezier(0.2,0.8,0.2,1)',
        direction: isEven ? 'ltr' : 'rtl',
      }}
    >
      {/* Text side */}
      <div style={{
        padding: '44px 40px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 16,
        direction: 'ltr',
        position: 'relative',
      }}>
        {/* Top glow */}
        <div aria-hidden="true" style={{
          position: 'absolute', top: -40, left: -40,
          width: 200, height: 200, borderRadius: '50%',
          background: 'radial-gradient(closest-side, rgba(255,255,255,0.05) 0%, transparent 70%)',
          filter: 'blur(20px)', pointerEvents: 'none',
        }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="s-tag" style={{ fontSize: '0.62rem' }}>
            <span className="live-dot" style={{ width: 5, height: 5 }} />
            {f.tag}
          </span>
          <span style={{
            fontFamily: 'ui-monospace,monospace', fontSize: '0.62rem',
            color: 'var(--ink-3)', letterSpacing: '0.06em',
          }}>{f.number}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 6, flexShrink: 0,
            background: 'rgba(255,255,255,0.07)', border: '1px solid var(--line)',
            display: 'grid', placeItems: 'center', color: 'var(--ink-0)',
          }}>
            <f.icon style={{ width: 16, height: 16 }} />
          </div>
          <h3 style={{
            fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)', fontWeight: 700,
            letterSpacing: '-0.03em', color: 'var(--ink-0)', margin: 0,
          }}>{f.title}</h3>
        </div>

        <p style={{
          fontSize: '0.875rem', lineHeight: 1.7,
          color: 'var(--ink-2)', margin: 0, maxWidth: '36ch',
        }}>{f.description}</p>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 500, color: 'var(--ink-0)' }}>Included in every plan</span>
          <ArrowRight style={{ width: 13, height: 13, color: 'var(--ink-2)' }} />
        </div>
      </div>

      {/* Image side */}
      <div style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--bg-0)',
        minHeight: 280,
        direction: 'ltr',
        borderLeft: isEven ? '1px solid var(--line)' : 'none',
        borderRight: isEven ? 'none' : '1px solid var(--line)',
      }}>
        {/* Dot grid */}
        <div className="dot-grid" aria-hidden="true" style={{
          position: 'absolute', inset: 0, opacity: 0.2, pointerEvents: 'none',
        }} />

        {/* Glow behind image */}
        <div aria-hidden="true" style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 300, height: 300, borderRadius: '50%',
          background: 'radial-gradient(closest-side, rgba(255,255,255,0.08) 0%, transparent 70%)',
          filter: 'blur(30px)', pointerEvents: 'none',
        }} />

        <Image
          src={f.image}
          alt={f.title}
          fill
          style={{
            objectFit: 'contain',
            objectPosition: 'center',
            padding: '20px 24px',
            filter: 'drop-shadow(0 8px 32px rgba(255,255,255,0.14))',
            transition: 'transform 0.5s ease',
          }}
          sizes="50vw"
        />
      </div>
    </div>
  )
}

export function Features() {
  const headingRef = useRef<HTMLDivElement>(null)
  const [headingVisible, setHeadingVisible] = useState(false)

  useEffect(() => {
    const el = headingRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setHeadingVisible(true); obs.disconnect() } },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="features" style={{ scrollMarginTop: 64 }}>
      <div style={{ maxWidth: 1088, margin: '0 auto', padding: '96px 24px' }}>

        {/* Heading */}
        <div
          ref={headingRef}
          style={{
            textAlign: 'center', marginBottom: 56,
            opacity: headingVisible ? 1 : 0,
            transform: headingVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <span className="s-tag" style={{ display: 'inline-flex', marginBottom: 16 }}>
            <span className="live-dot" />
            Professional Performance Suite
          </span>
          <h2 style={{
            fontSize: 'clamp(1.9rem, 3.8vw, 3rem)', fontWeight: 700,
            letterSpacing: '-0.035em', lineHeight: 1.08, margin: '0 0 14px',
          }}>
            <span style={{ color: 'var(--ink-2)' }}>Unlock Your PC's Full </span>
            <span style={{ color: 'var(--ink-0)' }}>Potential.</span>
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--ink-2)', lineHeight: 1.65, maxWidth: '52ch', marginInline: 'auto' }}>
            Powerful optimization tools designed to maximize Windows performance, increase gaming FPS, reduce latency, and keep your PC running like new.
          </p>
        </div>

        {/* Feature rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {FEATURES.map((f, i) => (
            <FeatureRow key={f.title} f={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
