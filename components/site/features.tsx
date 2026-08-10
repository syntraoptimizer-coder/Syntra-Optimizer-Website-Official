'use client'

import { useEffect, useRef, useState } from 'react'
import { Zap, Gamepad2, Wifi, Trash2, MemoryStick, Settings2, type LucideIcon } from 'lucide-react'

type Feature = {
  icon: LucideIcon
  number: string
  title: string
  tag: string
  description: string
  detail: string
}

const FEATURES: Feature[] = [
  {
    icon: Zap,
    number: '001',
    title: 'Windows Performance',
    tag: 'Faster PC',
    description: 'Boost responsiveness, speed up startup, and eliminate unnecessary background activity for maximum efficiency.',
    detail: 'Syntra disables telemetry services, cleans registry bloat, adjusts power plans, and removes auto-start programs that slow your boot by up to 40%.',
  },
  {
    icon: Gamepad2,
    number: '002',
    title: 'Gaming Experience',
    tag: 'Higher FPS',
    description: 'Improve FPS, reduce stuttering, minimize input lag, and optimize CPU and GPU resources for smoother gameplay.',
    detail: 'Per-game GPU priority, interrupt affinity tuning, and HAGS configuration push your hardware to deliver consistent high frames across 1000+ titles.',
  },
  {
    icon: Wifi,
    number: '003',
    title: 'Network Boost',
    tag: 'Lower Ping',
    description: 'Reduce latency, optimize DNS and TCP settings for faster online gaming and more stable connections.',
    detail: 'TCP/IP stack tuning, DNS prefetch, Nagle algorithm disable, and QoS prioritization cut your average ping by 15–30ms in competitive titles.',
  },
  {
    icon: Trash2,
    number: '004',
    title: 'Deep Cleanup',
    tag: 'Cleaner Windows',
    description: 'Remove temporary files, cache, and system clutter to recover storage and improve overall performance.',
    detail: 'Safely removes Windows Update cache, thumbnail databases, prefetch files, and browser caches. Average users recover 8–15GB of drive space.',
  },
  {
    icon: MemoryStick,
    number: '005',
    title: 'Memory Optimization',
    tag: 'Better Stability',
    description: 'Free system memory, optimize resource usage, and improve multitasking for a smoother experience.',
    detail: 'Releases trapped kernel memory, compresses standby list, and adjusts working set policies to keep your RAM allocation optimal during gaming sessions.',
  },
  {
    icon: Settings2,
    number: '006',
    title: 'Advanced Tweaks',
    tag: 'Pro Performance',
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
      {/* Scroll container — 7x viewport height */}
      <div
        ref={containerRef}
        style={{ height: `${(FEATURES.length + 1) * 100}vh` }}
      >
        {/* Sticky panel */}
        <div style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          borderTop: '1px solid var(--line)',
          borderBottom: '1px solid var(--line)',
          background: 'var(--bg-0)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
          {/* Dot grid */}
          <div className="dot-grid" aria-hidden="true" style={{
            position: 'absolute', inset: 0, opacity: 0.2, pointerEvents: 'none',
            maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, #000 20%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, #000 20%, transparent 80%)',
          }} />

          <div style={{ maxWidth: 1088, margin: '0 auto', padding: '0 24px', width: '100%', position: 'relative', zIndex: 1 }}>

            {/* Header */}
            <div style={{ marginBottom: 48, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
              <div>
                <span className="s-tag" style={{ display: 'inline-flex', marginBottom: 12 }}>
                  <span className="live-dot" />
                  Professional Performance Suite
                </span>
                <h2 style={{
                  fontSize: 'clamp(1.6rem, 3vw, 2.6rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.1,
                  color: 'var(--ink-0)',
                  margin: 0,
                }}>
                  <span style={{ color: 'var(--ink-2)' }}>Unlock Your PC's Full </span>
                  <span style={{ color: 'var(--ink-0)' }}>Potential.</span>
                </h2>
              </div>

              {/* Progress indicator */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                {FEATURES.map((_, i) => (
                  <div key={i} style={{
                    width: i === activeIndex ? 20 : 6,
                    height: 2,
                    background: i === activeIndex ? 'var(--ink-0)' : 'var(--bg-4)',
                    borderRadius: 0,
                    transition: 'width 0.35s ease, background 0.35s ease',
                  }} />
                ))}
                <span style={{
                  fontFamily: 'ui-monospace, monospace',
                  fontSize: '0.65rem',
                  color: 'var(--ink-3)',
                  letterSpacing: '0.08em',
                  marginLeft: 4,
                }}>
                  {String(activeIndex + 1).padStart(2, '0')} / {String(FEATURES.length).padStart(2, '0')}
                </span>
              </div>
            </div>

            {/* Main card area */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, alignItems: 'stretch' }}>

              {/* Left — active feature card */}
              <div
                key={activeIndex}
                className="s-card"
                style={{
                  padding: 32,
                  minHeight: 300,
                  display: 'flex',
                  flexDirection: 'column',
                  animation: 'featIn 0.38s cubic-bezier(0.2,0.8,0.2,1)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Glow top-left */}
                <div aria-hidden="true" style={{
                  position: 'absolute', top: -40, left: -40,
                  width: 200, height: 200, borderRadius: '50%',
                  background: 'radial-gradient(closest-side, rgba(255,255,255,0.06) 0%, transparent 70%)',
                  filter: 'blur(20px)',
                  pointerEvents: 'none',
                }} />

                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24, position: 'relative' }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 6,
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid var(--line)',
                    display: 'grid', placeItems: 'center',
                    color: 'var(--ink-1)',
                  }}>
                    <f.icon style={{ width: 20, height: 20 }} />
                  </div>
                  <span style={{
                    fontFamily: 'ui-monospace, monospace',
                    fontSize: '0.68rem',
                    color: 'var(--ink-3)',
                    letterSpacing: '0.08em',
                  }}>{f.number}</span>
                </div>

                <div style={{ flex: 1, position: 'relative' }}>
                  <div style={{ marginBottom: 8 }}>
                    <span className="s-tag" style={{ fontSize: '0.62rem', marginBottom: 10, display: 'inline-flex' }}>{f.tag}</span>
                  </div>
                  <h3 style={{
                    fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                    fontWeight: 700,
                    letterSpacing: '-0.03em',
                    lineHeight: 1.1,
                    color: 'var(--ink-0)',
                    marginBottom: 12,
                  }}>{f.title}</h3>
                  <p style={{
                    fontSize: '0.88rem',
                    lineHeight: 1.65,
                    color: 'var(--ink-2)',
                    maxWidth: '38ch',
                  }}>{f.description}</p>
                </div>

                {/* Slide progress bar at bottom */}
                <div style={{
                  marginTop: 28,
                  height: 2,
                  background: 'var(--bg-3)',
                  borderRadius: 0,
                  overflow: 'hidden',
                }}>
                  <div style={{
                    height: '100%',
                    background: 'var(--ink-1)',
                    width: `${slideProgress * 100}%`,
                    transition: 'width 0.1s linear',
                  }} />
                </div>
                <p style={{
                  marginTop: 7,
                  fontFamily: 'ui-monospace, monospace',
                  fontSize: '0.62rem',
                  letterSpacing: '0.08em',
                  color: 'var(--ink-3)',
                  textTransform: 'uppercase',
                }}>Scroll to explore</p>
              </div>

              {/* Right — feature list + detail */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {FEATURES.map((feat, i) => (
                  <div
                    key={feat.number}
                    style={{
                      padding: '12px 16px',
                      borderRadius: 4,
                      border: '1px solid',
                      borderColor: i === activeIndex ? 'var(--line-2)' : 'transparent',
                      background: i === activeIndex ? 'var(--bg-2)' : 'transparent',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 12,
                      cursor: 'default',
                      transition: 'background 0.25s ease, border-color 0.25s ease',
                    }}
                  >
                    <div style={{
                      width: 28, height: 28, borderRadius: 4, flexShrink: 0,
                      background: i === activeIndex ? 'rgba(255,255,255,0.08)' : 'var(--bg-2)',
                      border: '1px solid var(--line)',
                      display: 'grid', placeItems: 'center',
                      color: i === activeIndex ? 'var(--ink-1)' : 'var(--ink-3)',
                      transition: 'background 0.25s ease, color 0.25s ease',
                    }}>
                      <feat.icon style={{ width: 13, height: 13 }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: i === activeIndex ? 6 : 0 }}>
                        <span style={{
                          fontSize: '0.83rem',
                          fontWeight: 600,
                          color: i === activeIndex ? 'var(--ink-0)' : 'var(--ink-3)',
                          letterSpacing: '-0.01em',
                          transition: 'color 0.25s ease',
                        }}>{feat.title}</span>
                        {i === activeIndex && (
                          <span className="s-tag" style={{ fontSize: '0.58rem', padding: '2px 6px' }}>{feat.tag}</span>
                        )}
                      </div>
                      {/* Expand detail on active */}
                      <div style={{
                        maxHeight: i === activeIndex ? 80 : 0,
                        overflow: 'hidden',
                        transition: 'max-height 0.35s cubic-bezier(0.2,0.8,0.2,1)',
                      }}>
                        <p style={{
                          fontSize: '0.78rem',
                          lineHeight: 1.55,
                          color: 'var(--ink-3)',
                          paddingRight: 8,
                        }}>{feat.detail}</p>
                      </div>
                    </div>
                    {/* Arrow on active */}
                    <div style={{
                      width: 16, height: 16, flexShrink: 0, marginTop: 4,
                      color: 'var(--ink-3)',
                      opacity: i === activeIndex ? 1 : 0,
                      transition: 'opacity 0.25s ease',
                    }}>
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes featIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}
