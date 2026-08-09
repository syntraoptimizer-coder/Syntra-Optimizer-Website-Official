'use client'

import { useEffect, useRef, useState } from 'react'
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
    image: '/images/app-updates.png',
    label: 'Performance',
    title: 'New optimizations every release',
    description: 'Each release brings new performance tweaks, stability fixes, and advanced tools. Stay ahead automatically.',
    tag: '02',
  },
  {
    image: '/images/app-login.png',
    label: 'Quick Access',
    title: 'Sign in and start optimizing',
    description: 'Get started in seconds with Google or Discord. Your settings are saved to your account.',
    tag: '03',
  },
]

export function AppShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0) // 0 to 1 across all slides
  const [activeIndex, setActiveIndex] = useState(0)
  const [slideProgress, setSlideProgress] = useState(0) // 0 to 1 within current slide

  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current
      if (!section) return

      const rect = section.getBoundingClientRect()
      const sectionH = section.offsetHeight
      const viewH = window.innerHeight

      // How far we've scrolled through the sticky section
      const scrolled = -rect.top
      const total = sectionH - viewH
      const p = Math.max(0, Math.min(1, scrolled / total))

      setProgress(p)

      // Which slide we're on
      const slideCount = SLIDES.length
      const idx = Math.min(Math.floor(p * slideCount), slideCount - 1)
      const sp = (p * slideCount) - idx

      setActiveIndex(idx)
      setSlideProgress(sp)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const slide = SLIDES[activeIndex]

  return (
    <div
      ref={sectionRef}
      // Height = viewport × (slides + 1) so each slide gets a full viewport of scroll
      style={{ height: `${(SLIDES.length + 1) * 100}vh` }}
    >
      {/* Sticky container */}
      <div
        ref={stickyRef}
        className="sticky top-0 overflow-hidden"
        style={{
          height: '100vh',
          borderTop: '1px solid rgba(255,255,255,0.07)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(255,255,255,0.02) 0%, transparent 70%)',
        }}
      >
        {/* Background glow */}
        <div aria-hidden="true" className="glow glow-soft" style={{
          left: '50%', top: '50%', width: 900, height: 700, opacity: 0.1,
          position: 'absolute', transform: 'translate(-50%, -50%)',
        }} />
        <div className="eco-tiles" aria-hidden="true" />

        <div className="relative z-10 h-full flex flex-col justify-center mx-auto max-w-6xl px-4 sm:px-6">
          {/* Heading */}
          <div className="text-center mb-10">
            <SectionHeading
              eyebrow="See it in action"
              title="Built for performance,"
              accent="designed for you."
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left — stacked images with parallax */}
            <div
              className="relative select-none"
              style={{ aspectRatio: '16/10' }}
            >
              {SLIDES.map((s, i) => {
                // Each image: visible when activeIndex === i
                // Parallax: translate based on scroll within this slide
                const isActive = i === activeIndex
                const isPast = i < activeIndex

                // Parallax Y — active image moves up as you scroll
                const parallaxY = isActive
                  ? -(slideProgress * 40)
                  : isPast
                  ? -40
                  : 40

                const opacity = isActive
                  ? 1
                  : isPast
                  ? Math.max(0, 1 - (activeIndex - i) * 0.6)
                  : 0

                const scale = isActive ? 1 : isPast ? 0.97 : 1.02

                return (
                  <div
                    key={s.image}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      opacity,
                      transform: `translateY(${parallaxY}px) scale(${scale})`,
                      transition: isActive
                        ? 'opacity 0.6s ease, transform 0.6s ease'
                        : 'opacity 0.4s ease, transform 0.4s ease',
                      zIndex: SLIDES.length - i,
                      borderRadius: '12px',
                      overflow: 'hidden',
                      border: '1px solid rgba(255,255,255,0.1)',
                      boxShadow: isActive
                        ? '0 32px 80px -20px rgba(0,0,0,0.8), 0 0 60px -30px rgba(255,255,255,0.08)'
                        : '0 16px 40px -10px rgba(0,0,0,0.6)',
                    }}
                  >
                    <Image
                      src={s.image}
                      alt={s.label}
                      fill
                      className="object-cover object-top"
                      priority={i === 0}
                    />
                    {/* Screen glare */}
                    <div
                      aria-hidden="true"
                      style={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%)',
                        pointerEvents: 'none',
                        zIndex: 2,
                      }}
                    />
                    {/* Bottom fade */}
                    <div
                      aria-hidden="true"
                      style={{
                        position: 'absolute', bottom: 0, left: 0, right: 0,
                        height: '25%',
                        background: 'linear-gradient(to top, rgba(8,8,8,0.6), transparent)',
                        pointerEvents: 'none', zIndex: 3,
                      }}
                    />
                    {/* Tag */}
                    <div
                      style={{
                        position: 'absolute', bottom: 12, left: 12, zIndex: 4,
                        padding: '3px 8px',
                        background: 'rgba(8,8,8,0.75)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 0,
                        fontFamily: 'ui-monospace, monospace',
                        fontSize: '0.65rem',
                        letterSpacing: '0.1em',
                        color: 'rgba(255,255,255,0.5)',
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      {s.tag} / 0{SLIDES.length}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Right — text that changes per slide */}
            <div
              style={{
                opacity: 1,
                transition: 'opacity 0.4s ease',
              }}
            >
              {/* Step indicators */}
              <div className="flex flex-col gap-3 mb-8">
                {SLIDES.map((s, i) => (
                  <div
                    key={s.label}
                    className="flex items-center gap-3"
                    style={{ opacity: i === activeIndex ? 1 : 0.35, transition: 'opacity 0.4s ease' }}
                  >
                    <div
                      style={{
                        width: i === activeIndex ? 32 : 8,
                        height: 2,
                        background: i === activeIndex
                          ? 'rgba(255,255,255,0.85)'
                          : 'rgba(255,255,255,0.2)',
                        borderRadius: 0,
                        transition: 'width 0.4s ease, background 0.4s ease',
                        flexShrink: 0,
                      }}
                    />
                    <span style={{
                      fontFamily: 'ui-monospace, monospace',
                      fontSize: '0.68rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: i === activeIndex
                        ? 'rgba(255,255,255,0.7)'
                        : 'rgba(255,255,255,0.25)',
                      transition: 'color 0.4s ease',
                    }}>
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Active slide content */}
              <div key={activeIndex} style={{ animation: 'fadeUp 0.5s ease' }}>
                <h3 style={{
                  fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                  fontWeight: 400,
                  letterSpacing: '-0.028em',
                  lineHeight: 1.15,
                  color: 'transparent',
                  backgroundImage: 'linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.7) 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  marginBottom: 12,
                }}>
                  {slide.title}
                </h3>
                <p style={{
                  fontSize: '0.95rem',
                  color: 'rgba(255,255,255,0.44)',
                  fontWeight: 300,
                  lineHeight: 1.7,
                  maxWidth: '38ch',
                }}>
                  {slide.description}
                </p>
              </div>

              {/* Progress bar */}
              <div
                className="mt-8"
                style={{
                  height: 2,
                  background: 'rgba(255,255,255,0.08)',
                  borderRadius: 0,
                  overflow: 'hidden',
                  maxWidth: 240,
                }}
              >
                <div style={{
                  height: '100%',
                  background: 'rgba(255,255,255,0.7)',
                  width: `${progress * 100}%`,
                  transition: 'width 0.1s linear',
                }} />
              </div>
              <p style={{
                marginTop: 8,
                fontFamily: 'ui-monospace, monospace',
                fontSize: '0.65rem',
                letterSpacing: '0.1em',
                color: 'rgba(255,255,255,0.25)',
                textTransform: 'uppercase',
              }}>
                Scroll to explore
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
