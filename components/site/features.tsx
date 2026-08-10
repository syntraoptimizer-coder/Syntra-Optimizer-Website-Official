'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Zap, Gamepad2, Wifi, Trash2, MemoryStick, Settings2, type LucideIcon } from 'lucide-react'

type Feature = {
  icon: LucideIcon
  number: string
  title: string
  tag: string
  description: string
  image: string
}

const FEATURES: Feature[] = [
  { icon: Zap,         number: '01', title: 'Windows Performance', tag: 'Faster PC',       image: '/images/feat-windows.png',  description: 'Boost responsiveness, speed up startup, and eliminate background activity for maximum efficiency.' },
  { icon: Gamepad2,    number: '02', title: 'Gaming Experience',   tag: 'Higher FPS',      image: '/images/feat-gaming.png',   description: 'Improve FPS, reduce stuttering, minimize input lag, and optimize CPU and GPU resources.' },
  { icon: Wifi,        number: '03', title: 'Network Boost',       tag: 'Lower Ping',      image: '/images/feat-network.png',  description: 'Reduce latency, optimize DNS and TCP settings for faster online gaming and stable connections.' },
  { icon: Trash2,      number: '04', title: 'Deep Cleanup',        tag: 'Cleaner Windows', image: '/images/feat-cleanup.png',  description: 'Remove temporary files, cache, and clutter to recover storage and improve performance.' },
  { icon: MemoryStick, number: '05', title: 'Memory Optimization', tag: 'Better Stability', image: '/images/feat-memory.png',  description: 'Free system memory, optimize resource usage, and improve multitasking.' },
  { icon: Settings2,   number: '06', title: 'Advanced Tweaks',     tag: 'Pro Performance', image: '/images/feat-advanced.png', description: 'Access powerful Windows tweaks, privacy improvements, and advanced system optimizations.' },
]

function FeatureCard({ f, index }: { f: Feature; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 80)
          obs.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [index])

  return (
    <div
      ref={ref}
      className="s-card"
      style={{
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(28px) scale(0.97)',
        transition: `opacity 0.6s cubic-bezier(0.2,0.8,0.2,1), transform 0.6s cubic-bezier(0.2,0.8,0.2,1)`,
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: 180, overflow: 'hidden', background: 'var(--bg-2)', flexShrink: 0 }}>
        <Image
          src={f.image}
          alt={f.title}
          fill
          style={{
            objectFit: 'cover',
            objectPosition: 'top',
            filter: 'drop-shadow(0 4px 24px rgba(255,255,255,0.08))',
            transition: 'transform 0.4s ease',
          }}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, transparent 40%, rgba(8,8,8,0.7) 100%)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* Content */}
      <div style={{ padding: '18px 20px 20px', flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 28, height: 28, borderRadius: 4,
              background: 'rgba(255,255,255,0.06)', border: '1px solid var(--line)',
              display: 'grid', placeItems: 'center', color: 'var(--ink-1)',
            }}>
              <f.icon style={{ width: 13, height: 13 }} />
            </div>
            <span className="s-tag" style={{ fontSize: '0.6rem' }}>{f.tag}</span>
          </div>
          <span style={{ fontFamily: 'ui-monospace,monospace', fontSize: '0.62rem', color: 'var(--ink-3)', letterSpacing: '0.06em' }}>{f.number}</span>
        </div>
        <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--ink-0)', letterSpacing: '-0.02em', margin: 0 }}>{f.title}</h3>
        <p style={{ fontSize: '0.8rem', lineHeight: 1.6, color: 'var(--ink-3)', margin: 0 }}>{f.description}</p>
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
    <section id="features" style={{ scrollMarginTop: 64, borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
      <div style={{ maxWidth: 1088, margin: '0 auto', padding: '96px 24px' }}>

        {/* Heading */}
        <div
          ref={headingRef}
          style={{
            textAlign: 'center', marginBottom: 52,
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
            fontSize: 'clamp(1.9rem, 3.8vw, 3rem)',
            fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.08,
            margin: '0 0 14px',
          }}>
            <span style={{ color: 'var(--ink-2)' }}>Unlock Your PC's Full </span>
            <span style={{ color: 'var(--ink-0)' }}>Potential.</span>
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--ink-2)', lineHeight: 1.65, maxWidth: '52ch', marginInline: 'auto' }}>
            Powerful optimization tools designed to maximize Windows performance, increase gaming FPS, reduce latency, and keep your PC running like new.
          </p>
        </div>

        {/* Cards grid — all visible at once, reveal on scroll */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 10,
        }}>
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} f={f} index={i} />
          ))}
        </div>

        {/* Tags */}
        <div style={{ marginTop: 32, display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
          {['Faster PC', 'Higher FPS', 'Lower Ping', 'Lower Latency', 'Better Stability', 'Cleaner Windows', 'Pro Performance'].map(t => (
            <span key={t} className="s-tag" style={{ fontSize: '0.68rem', color: 'var(--ink-3)' }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(255,255,255,0.4)', flexShrink: 0, display: 'inline-block' }} />
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
