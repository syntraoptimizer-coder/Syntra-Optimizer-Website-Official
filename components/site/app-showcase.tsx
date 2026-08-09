'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import { SectionHeading } from '@/components/site/section-heading'

const SLIDES = [
  {
    image: '/images/app-dashboard.png',
    label: 'Dashboard',
    title: 'Real-time PC performance',
    description: 'Monitor CPU, RAM, Disk and Network live. Get AI-powered recommendations and optimize your system in one click.',
    tag: '01',
  },
  {
    image: '/images/app-login.png',
    label: 'Quick Access',
    title: 'Sign in and start optimizing',
    description: 'Get started in seconds with Google or Discord. Your optimization history and settings are saved to your account.',
    tag: '02',
  },
  {
    image: '/images/app-updates.png',
    label: 'Always Updated',
    title: 'New optimizations every release',
    description: 'Each release brings new performance tweaks, stability fixes, and advanced tools. Stay ahead automatically.',
    tag: '03',
  },
]

export function AppShowcase() {
  const [current, setCurrent] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const [direction, setDirection] = useState<'next' | 'prev'>('next')
  const [animating, setAnimating] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const goTo = useCallback((index: number, dir: 'next' | 'prev' = 'next') => {
    if (animating || index === current) return
    setDirection(dir)
    setPrev(current)
    setAnimating(true)
    setTimeout(() => {
      setCurrent(index)
      setPrev(null)
      setAnimating(false)
    }, 500)
  }, [animating, current])

  const next = useCallback(() => goTo((current + 1) % SLIDES.length, 'next'), [current, goTo])
  const prevSlide = useCallback(() => goTo((current - 1 + SLIDES.length) % SLIDES.length, 'prev'), [current, goTo])

  useEffect(() => {
    timerRef.current = setInterval(next, 5000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [next])

  const slide = SLIDES[current]

  return (
    <section className="relative overflow-hidden" style={{
      borderTop: '1px solid rgba(255,255,255,0.07)',
      borderBottom: '1px solid rgba(255,255,255,0.07)',
      background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(255,255,255,0.03) 0%, transparent 70%)',
    }}>
      {/* Background grid */}
      <div className="eco-tiles" aria-hidden="true" />

      {/* Ambient glow */}
      <div aria-hidden="true" className="glow glow-soft" style={{
        left: '50%', top: '60%', width: 800, height: 600, opacity: 0.12,
      }} />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <SectionHeading
          eyebrow="See it in action"
          title="Built for performance,"
          accent="designed for you."
          description="A powerful Windows optimizer with a clean interface. Everything you need in one app."
        />

        <div className="mt-16 relative">
          {/* ── 3D Floating screen mockup ── */}
          <div
            className="relative mx-auto"
            style={{
              maxWidth: 900,
              perspective: '1200px',
            }}
          >
            {/* Outer frame — monitor bezel */}
            <div
              style={{
                position: 'relative',
                borderRadius: '16px',
                padding: '10px 10px 40px',
                background: 'linear-gradient(160deg, rgba(40,40,40,0.9) 0%, rgba(15,15,15,0.95) 100%)',
                border: '1px solid rgba(255,255,255,0.12)',
                boxShadow: `
                  0 0 0 1px rgba(255,255,255,0.06),
                  0 40px 80px -20px rgba(0,0,0,0.9),
                  0 0 120px -40px rgba(255,255,255,0.08)
                `,
                transform: 'rotateX(2deg)',
                transformOrigin: 'bottom center',
              }}
            >
              {/* Top bar — window chrome */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                paddingBottom: 8,
                paddingLeft: 4,
              }}>
                {['#ff5f57', '#febc2e', '#28c840'].map((c, i) => (
                  <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.8 }} />
                ))}
                <div style={{
                  flex: 1,
                  height: 20,
                  background: 'rgba(255,255,255,0.04)',
                  borderRadius: 4,
                  marginLeft: 8,
                }} />
              </div>

              {/* Screen area */}
              <div
                style={{
                  position: 'relative',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  background: '#080808',
                  aspectRatio: '16/10',
                }}
              >
                {/* Current slide */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: animating ? 0 : 1,
                    transform: animating
                      ? `translateX(${direction === 'next' ? '-20px' : '20px'})`
                      : 'translateX(0)',
                    transition: 'opacity 0.5s ease, transform 0.5s ease',
                  }}
                >
                  <Image
                    src={slide.image}
                    alt={slide.label}
                    fill
                    className="object-cover object-top"
                    priority
                  />
                </div>

                {/* Screen glare overlay */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%)',
                    zIndex: 2,
                  }}
                />

                {/* Bottom fade */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    bottom: 0, left: 0, right: 0,
                    height: '30%',
                    background: 'linear-gradient(to top, rgba(8,8,8,0.7), transparent)',
                    zIndex: 3,
                    pointerEvents: 'none',
                  }}
                />

                {/* Slide counter badge */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 14,
                    right: 14,
                    zIndex: 4,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '4px 10px',
                    background: 'rgba(8,8,8,0.8)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: 4,
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <span style={{
                    fontFamily: 'ui-monospace, monospace',
                    fontSize: '0.65rem',
                    color: 'rgba(255,255,255,0.5)',
                    letterSpacing: '0.08em',
                  }}>
                    {slide.tag} / 0{SLIDES.length}
                  </span>
                </div>
              </div>

              {/* Monitor stand */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 120,
                height: 28,
                background: 'linear-gradient(to bottom, rgba(35,35,35,0.9), rgba(20,20,20,0.9))',
                borderRadius: '0 0 8px 8px',
                borderTop: '1px solid rgba(255,255,255,0.08)',
              }} />
            </div>

            {/* Screen glow reflection on floor */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                bottom: -40,
                left: '10%',
                right: '10%',
                height: 60,
                background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.08) 0%, transparent 70%)',
                filter: 'blur(20px)',
                pointerEvents: 'none',
              }}
            />
          </div>

          {/* ── Controls & info below mockup ── */}
          <div className="mt-10 flex flex-col items-center gap-6">
            {/* Slide title + description */}
            <div
              className="text-center max-w-lg"
              style={{
                opacity: animating ? 0 : 1,
                transform: animating ? 'translateY(6px)' : 'translateY(0)',
                transition: 'opacity 0.4s ease, transform 0.4s ease',
              }}
            >
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: 500,
                letterSpacing: '-0.02em',
                color: 'rgba(255,255,255,0.9)',
                marginBottom: 6,
              }}>
                {slide.title}
              </h3>
              <p style={{
                fontSize: '0.88rem',
                color: 'rgba(255,255,255,0.42)',
                fontWeight: 300,
                lineHeight: 1.6,
              }}>
                {slide.description}
              </p>
            </div>

            {/* Navigation dots + arrows */}
            <div className="flex items-center gap-5">
              {/* Prev */}
              <button
                onClick={prevSlide}
                className="grid size-9 place-items-center transition-all duration-200 hover:scale-110"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 4,
                  color: 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                }}
                aria-label="Previous"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              {/* Dots */}
              <div className="flex items-center gap-2">
                {SLIDES.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i, i > current ? 'next' : 'prev')}
                    className="transition-all duration-300"
                    style={{
                      width: i === current ? 28 : 8,
                      height: 8,
                      borderRadius: 0,
                      background: i === current
                        ? 'rgba(255,255,255,0.85)'
                        : 'rgba(255,255,255,0.18)',
                      cursor: 'pointer',
                      border: 'none',
                    }}
                    aria-label={`Slide ${i + 1}: ${s.label}`}
                  />
                ))}
              </div>

              {/* Next */}
              <button
                onClick={next}
                className="grid size-9 place-items-center transition-all duration-200 hover:scale-110"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 4,
                  color: 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                }}
                aria-label="Next"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>

            {/* Slide labels */}
            <div className="flex items-center gap-6">
              {SLIDES.map((s, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i, i > current ? 'next' : 'prev')}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'ui-monospace, monospace',
                    fontSize: '0.68rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: i === current
                      ? 'rgba(255,255,255,0.8)'
                      : 'rgba(255,255,255,0.28)',
                    transition: 'color 0.2s ease',
                    padding: '4px 0',
                    borderBottom: i === current
                      ? '1px solid rgba(255,255,255,0.5)'
                      : '1px solid transparent',
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
