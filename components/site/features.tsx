'use client'

import { useEffect, useRef, useState } from 'react'
import { Zap, Gamepad2, Wifi, Trash2, MemoryStick, Settings2, type LucideIcon } from 'lucide-react'

type Feature = {
  icon: LucideIcon
  number: string
  title: string
  tag: string
  description: string
  iconColor: string
  iconBg: string
}

const FEATURES: Feature[] = [
  {
    icon: Zap, number: '01', title: 'Windows Performance', tag: 'Faster PC',
    iconColor: '#60a5fa', iconBg: 'rgba(96,165,250,0.12)',
    description: 'Boost responsiveness, speed up startup, and eliminate background activity. Disable telemetry, clean registry bloat, and remove auto-start programs.',
  },
  {
    icon: Gamepad2, number: '02', title: 'Gaming Experience', tag: 'Higher FPS',
    iconColor: '#a78bfa', iconBg: 'rgba(167,139,250,0.12)',
    description: 'Improve FPS, reduce stuttering, minimize input lag, and optimize CPU and GPU resources. Per-game priority and HAGS for consistent high frames.',
  },
  {
    icon: Wifi, number: '03', title: 'Network Boost', tag: 'Lower Ping',
    iconColor: '#38bdf8', iconBg: 'rgba(56,189,248,0.12)',
    description: 'Reduce latency with TCP/IP stack tuning, DNS prefetch, Nagle algorithm disable, and QoS prioritization. Cut your average ping by 15–30ms.',
  },
  {
    icon: Wifi, number: '04', title: 'Deep Cleanup', tag: 'Cleaner Windows',
    iconColor: '#34d399', iconBg: 'rgba(52,211,153,0.12)',
    description: 'Remove temp files, cache, and system clutter. Safely clear Windows Update cache, thumbnail databases, and prefetch files. Recover 8–15GB on average.',
  },
  {
    icon: MemoryStick, number: '05', title: 'Memory Optimization', tag: 'Better Stability',
    iconColor: '#f472b6', iconBg: 'rgba(244,114,182,0.12)',
    description: 'Release trapped kernel memory, compress standby list, and adjust working set policies to keep RAM allocation optimal during intensive sessions.',
  },
  {
    icon: Settings2, number: '06', title: 'Advanced Tweaks', tag: 'Pro Performance',
    iconColor: '#fbbf24', iconBg: 'rgba(251,191,36,0.12)',
    description: 'Expose BIOS-level settings, Resizable BAR, XMP/EXPO memory profiles, and GPU driver tweaks normally reserved for enthusiasts and overclockers.',
  },
]

function FeatureCard({ f, index }: { f: Feature; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="span-card"
      style={{
        padding: '32px 28px 28px',
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(28px) scale(0.98)',
        transition: `opacity 0.55s cubic-bezier(0.2,0.8,0.2,1) ${index * 70}ms, transform 0.55s cubic-bezier(0.2,0.8,0.2,1) ${index * 70}ms`,
      }}
    >
      {/* Dot texture overlay */}
      <div className="card-texture" aria-hidden="true" />

      {/* Top row: icon + number */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
        <div style={{
          width: 48, height: 48, borderRadius: 14, flexShrink: 0,
          background: f.iconBg,
          border: `1px solid ${f.iconColor}25`,
          display: 'grid', placeItems: 'center',
        }}>
          <f.icon style={{ width: 22, height: 22, color: f.iconColor }} />
        </div>
        <span className="num-badge">{f.number}</span>
      </div>

      {/* Title */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <h3 style={{
          fontSize: '1.1rem', fontWeight: 600,
          letterSpacing: '-0.04em', color: '#fff',
          margin: '0 0 10px', lineHeight: 1.25,
        }}>{f.title}</h3>
        <span className="feature-tag" style={{
          background: f.iconBg,
          color: f.iconColor,
          borderColor: `${f.iconColor}30`,
        }}>
          {f.tag}
        </span>
      </div>

      {/* Description */}
      <p style={{
        fontSize: '0.875rem', lineHeight: 1.65,
        color: 'rgba(255,255,255,0.5)',
        margin: 0, flex: 1,
        letterSpacing: '-0.02em',
        position: 'relative', zIndex: 1,
      }}>{f.description}</p>

      {/* Bottom blue accent bar */}
      <div style={{
        height: 2, borderRadius: 2,
        background: `linear-gradient(90deg, ${f.iconColor}60 0%, transparent 100%)`,
        marginTop: 4,
        position: 'relative', zIndex: 1,
      }} />
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
      ([e]) => { if (e.isIntersecting) { setHeadingVisible(true); obs.disconnect() } },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="features" style={{ scrollMarginTop: 80, background: 'var(--bg-page)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '100px 24px' }}>

        {/* Heading */}
        <div
          ref={headingRef}
          style={{
            textAlign: 'center', marginBottom: 60,
            opacity: headingVisible ? 1 : 0,
            transform: headingVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <p className="section-eyebrow" style={{ justifyContent: 'center' }}>
            <span className="live-dot" />
            Performance Suite
          </p>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 600,
            letterSpacing: '-0.05em', lineHeight: 1.1, margin: '0 0 16px',
            color: '#fff',
          }}>
            Everything your PC needs<br />
            <span style={{ color: 'rgba(255,255,255,0.45)' }}>to perform at its best.</span>
          </h2>
          <p style={{
            fontSize: '1rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6,
            maxWidth: '50ch', marginInline: 'auto', letterSpacing: '-0.03em',
          }}>
            Professional-grade tools built to maximize Windows performance, boost gaming FPS, reduce latency, and keep your machine clean.
          </p>
        </div>

        {/* 3-col grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
          gap: 12,
        }}>
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} f={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
