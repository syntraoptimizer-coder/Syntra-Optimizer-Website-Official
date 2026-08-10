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
  detail: string
  image: string
}

const FEATURES: Feature[] = [
  {
    icon: Zap, number: '001', title: 'Windows Performance', tag: 'Faster PC',
    image: '/images/feat-windows.png',
    description: 'Boost responsiveness, speed up startup, and eliminate unnecessary background activity for maximum efficiency.',
    detail: 'Syntra disables telemetry services, cleans registry bloat, adjusts power plans, and removes auto-start programs that slow your boot by up to 40%.',
  },
  {
    icon: Gamepad2, number: '002', title: 'Gaming Experience', tag: 'Higher FPS',
    image: '/images/feat-gaming.png',
    description: 'Improve FPS, reduce stuttering, minimize input lag, and optimize CPU and GPU resources for smoother gameplay.',
    detail: 'Per-game GPU priority, interrupt affinity tuning, and HAGS configuration push your hardware to deliver consistent high frames across 1000+ titles.',
  },
  {
    icon: Wifi, number: '003', title: 'Network Boost', tag: 'Lower Ping',
    image: '/images/feat-network.png',
    description: 'Reduce latency, optimize DNS and TCP settings for faster online gaming and more stable connections.',
    detail: 'TCP/IP stack tuning, DNS prefetch, Nagle algorithm disable, and QoS prioritization cut your average ping by 15–30ms in competitive titles.',
  },
  {
    icon: Trash2, number: '004', title: 'Deep Cleanup', tag: 'Cleaner Windows',
    image: '/images/feat-cleanup.png',
    description: 'Remove temporary files, cache, and system clutter to recover storage and improve overall performance.',
    detail: 'Safely removes Windows Update cache, thumbnail databases, prefetch files, and browser caches. Average users recover 8–15GB of drive space.',
  },
  {
    icon: MemoryStick, number: '005', title: 'Memory Optimization', tag: 'Better Stability',
    image: '/images/feat-memory.png',
    description: 'Free system memory, optimize resource usage, and improve multitasking for a smoother experience.',
    detail: 'Releases trapped kernel memory, compresses standby list, and adjusts working set policies to keep your RAM allocation optimal during gaming sessions.',
  },
  {
    icon: Settings2, number: '006', title: 'Advanced Tweaks', tag: 'Pro Performance',
    image: '/images/feat-advanced.png',
    description: 'Access powerful Windows tweaks, privacy improvements, power settings, and advanced system optimizations.',
    detail: 'Exposes BIOS-level settings, Resizable BAR configuration, XMP/EXPO memory profiles, and GPU driver tweaks normally reserved for enthusiasts.',
  },
]

export function Features() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [slideProgress, setSlideProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const total = el.offsetHeight - window.innerHeight
      const scrolled = -rect.top
      const p = Math.max(0, Math.min(1, scrolled / total))
      const idx = Math.min(Math.floor(p * FEATURES.length), FEATURES.length - 1)
      const sp = (p * FEATURES.length) - Math.floor(p * FEATURES.length)
      setActiveIndex(idx)
      setSlideProgress(sp)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const f = FEATURES[activeIndex]

  return (
    <section id="features" style={{ scrollMarginTop: 64 }}>
      <div ref={containerRef} style={{ height: `${100 + FEATURES.length * 35}vh` }}>
        <div style={{
          position: 'sticky', top: 0, height: '100vh', overflow: 'hidden',
          borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)',
          background: 'var(--bg-0)', display: 'flex', flexDirection: 'column', justifyContent: 'center',
        }}>
          {/* Dot grid */}
          <div className="dot-grid" aria-hidden="true" style={{
            position: 'absolute', inset: 0, opacity: 0.18, pointerEvents: 'none',
            maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, #000 20%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, #000 20%, transparent 80%)',
          }} />

          {/* Image glow behind */}
          <div aria-hidden="true" className="glow glow-soft" style={{
            position: 'absolute', right: '15%', top: '50%',
            width: 500, height: 500, opacity: 0.25, zIndex: 0,
          }} />

          <div style={{ maxWidth: 1088, margin: '0 auto', padding: '0 24px', width: '100%', position: 'relative', zIndex: 1 }}>

            {/* Header row */}
            <div style={{ marginBottom: 40, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <span className="s-tag" style={{ display: 'inline-flex', marginBottom: 10 }}>
                  <span className="live-dot" />
                  Professional Performance Suite
                </span>
                <h2 style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1, color: 'var(--ink-0)', margin: 0 }}>
                  <span style={{ color: 'var(--ink-2)' }}>Unlock Your PC's Full </span>
                  <span style={{ color: 'var(--ink-0)' }}>Potential.</span>
                </h2>
              </div>
              {/* Progress dots */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0 }}>
                {FEATURES.map((_, i) => (
                  <div key={i} style={{
                    width: i === activeIndex ? 18 : 5, height: 2,
                    background: i === activeIndex ? 'var(--ink-0)' : 'var(--bg-4)',
                    borderRadius: 0, transition: 'width 0.35s ease, background 0.35s ease',
                  }} />
                ))}
                <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.62rem', color: 'var(--ink-3)', letterSpacing: '0.08em', marginLeft: 6 }}>
                  {String(activeIndex + 1).padStart(2, '0')} / {String(FEATURES.length).padStart(2, '0')}
                </span>
              </div>
            </div>

            {/* Main layout: left text + right image */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, alignItems: 'stretch', minHeight: 340 }}>

              {/* LEFT — text card */}
              <div className="s-card" style={{
                padding: '28px 28px 24px',
                display: 'flex', flexDirection: 'column',
                animation: 'featIn 0.4s cubic-bezier(0.2,0.8,0.2,1)',
                position: 'relative', overflow: 'hidden',
              }}>
                {/* Card glow */}
                <div aria-hidden="true" style={{
                  position: 'absolute', top: -60, left: -60,
                  width: 240, height: 240, borderRadius: '50%',
                  background: 'radial-gradient(closest-side, rgba(255,255,255,0.07) 0%, transparent 70%)',
                  filter: 'blur(24px)', pointerEvents: 'none',
                }} />

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, position: 'relative' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 4,
                      background: 'rgba(255,255,255,0.08)', border: '1px solid var(--line)',
                      display: 'grid', placeItems: 'center', color: 'var(--ink-0)',
                    }}>
                      <f.icon style={{ width: 16, height: 16 }} />
                    </div>
                    <span className="s-tag" style={{ fontSize: '0.62rem' }}>{f.tag}</span>
                  </div>
                  <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.65rem', color: 'var(--ink-3)', letterSpacing: '0.08em' }}>{f.number}</span>
                </div>

                <div style={{ flex: 1, position: 'relative' }}>
                  <h3 style={{
                    fontSize: 'clamp(1.3rem, 2.2vw, 1.9rem)', fontWeight: 700,
                    letterSpacing: '-0.03em', lineHeight: 1.1,
                    color: 'var(--ink-0)', marginBottom: 12,
                  }}>{f.title}</h3>
                  <p style={{ fontSize: '0.875rem', lineHeight: 1.65, color: 'var(--ink-2)', marginBottom: 14, maxWidth: '38ch' }}>{f.description}</p>
                  <p style={{ fontSize: '0.78rem', lineHeight: 1.6, color: 'var(--ink-3)', maxWidth: '40ch' }}>{f.detail}</p>
                </div>

                {/* Progress bar */}
                <div style={{ marginTop: 24, height: 2, background: 'var(--bg-3)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', background: 'var(--ink-1)', width: `${slideProgress * 100}%`, transition: 'width 0.1s linear' }} />
                </div>
                <p style={{ marginTop: 6, fontFamily: 'ui-monospace, monospace', fontSize: '0.6rem', letterSpacing: '0.08em', color: 'var(--ink-3)', textTransform: 'uppercase' }}>Scroll to explore</p>
              </div>

              {/* RIGHT — image */}
              <div
                key={`img-${activeIndex}`}
                style={{
                  background: 'var(--bg-1)', border: '1px solid var(--line)', borderRadius: 6,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  overflow: 'hidden', position: 'relative',
                  animation: 'featIn 0.4s cubic-bezier(0.2,0.8,0.2,1)',
                  minHeight: 300,
                }}
              >
                {/* Image glow */}
                <div aria-hidden="true" style={{
                  position: 'absolute', inset: 0, zIndex: 0,
                  background: 'radial-gradient(ellipse at 50% 80%, rgba(255,255,255,0.05) 0%, transparent 60%)',
                  pointerEvents: 'none',
                }} />
                <Image
                  src={f.image}
                  alt={f.title}
                  width={400}
                  height={400}
                  style={{
                    objectFit: 'contain',
                    width: '75%',
                    height: '75%',
                    position: 'relative',
                    zIndex: 1,
                    filter: 'drop-shadow(0 8px 32px rgba(255,255,255,0.12))',
                  }}
                  priority
                />
              </div>
            </div>

            {/* Bottom feature list */}
            <div style={{ marginTop: 12, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {FEATURES.map((feat, i) => (
                <div key={feat.number} style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '6px 10px', borderRadius: 4,
                  border: '1px solid',
                  borderColor: i === activeIndex ? 'var(--line-2)' : 'transparent',
                  background: i === activeIndex ? 'var(--bg-2)' : 'transparent',
                  transition: 'background 0.25s ease, border-color 0.25s ease',
                }}>
                  <feat.icon style={{ width: 11, height: 11, color: i === activeIndex ? 'var(--ink-1)' : 'var(--ink-3)', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.75rem', fontWeight: i === activeIndex ? 600 : 400, color: i === activeIndex ? 'var(--ink-0)' : 'var(--ink-3)', letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>{feat.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes featIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </section>
  )
}
