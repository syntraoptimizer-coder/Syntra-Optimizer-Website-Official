'use client'

import { useState, useEffect, useCallback } from 'react'
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
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)

  const goTo = useCallback((index: number) => {
    if (animating || index === current) return
    setAnimating(true)
    setTimeout(() => {
      setCurrent(index)
      setAnimating(false)
    }, 300)
  }, [animating, current])

  const next = useCallback(() => goTo((current + 1) % SLIDES.length), [current, goTo])

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  const slide = SLIDES[current]

  return (
    <section
      className="relative overflow-hidden"
      style={{
        borderTop: '1px solid rgba(255,255,255,0.07)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <div className="eco-tiles" aria-hidden="true" />
      <div aria-hidden="true" className="glow glow-soft" style={{
        left: '50%', top: '50%', width: 800, height: 600, opacity: 0.1,
        position: 'absolute', transform: 'translate(-50%, -50%)',
      }} />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <SectionHeading
          eyebrow="See it in action"
          title="Built for performance,"
          accent="designed for you."
          description="A powerful Windows optimizer with a clean interface. Everything you need in one app."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:items-center">
          {/* Image */}
          <div
            className="relative overflow-hidden rounded-2xl"
            style={{
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 32px 80px -20px rgba(0,0,0,0.8)',
              opacity: animating ? 0 : 1,
              transform: animating ? 'scale(0.99)' : 'scale(1)',
              transition: 'opacity 0.3s ease, transform 0.3s ease',
              aspectRatio: '16/10',
            }}
          >
            <Image
              src={slide.image}
              alt={slide.label}
              fill
              className="object-cover object-top"
              priority
            />
            {/* Glare */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%)',
              pointerEvents: 'none',
            }} />
            {/* Bottom fade */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: '25%',
              background: 'linear-gradient(to top, rgba(8,8,8,0.6), transparent)',
              pointerEvents: 'none',
            }} />
            {/* Tag */}
            <div style={{
              position: 'absolute', bottom: 12, left: 12,
              padding: '3px 8px',
              background: 'rgba(8,8,8,0.75)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 0,
              fontFamily: 'ui-monospace, monospace',
              fontSize: '0.65rem',
              letterSpacing: '0.1em',
              color: 'rgba(255,255,255,0.5)',
              backdropFilter: 'blur(8px)',
            }}>
              {slide.tag} / 0{SLIDES.length}
            </div>
          </div>

          {/* Text + controls */}
          <div>
            {/* Step indicators */}
            <div className="flex flex-col gap-3 mb-8">
              {SLIDES.map((s, i) => (
                <button
                  key={s.label}
                  onClick={() => goTo(i)}
                  className="flex items-center gap-3 text-left"
                  style={{ opacity: i === current ? 1 : 0.35, transition: 'opacity 0.4s ease', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <div style={{
                    width: i === current ? 32 : 8,
                    height: 2,
                    background: i === current ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.2)',
                    borderRadius: 0,
                    transition: 'width 0.4s ease',
                    flexShrink: 0,
                  }} />
                  <span style={{
                    fontFamily: 'ui-monospace, monospace',
                    fontSize: '0.68rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase' as const,
                    color: i === current ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.25)',
                    transition: 'color 0.4s ease',
                  }}>
                    {s.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Content */}
            <div
              key={current}
              style={{ animation: 'fadeUp 0.4s ease' }}
            >
              <h3 style={{
                fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
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
            <div className="mt-8" style={{
              height: 2,
              background: 'rgba(255,255,255,0.08)',
              borderRadius: 0,
              overflow: 'hidden',
              maxWidth: 200,
            }}>
              <div style={{
                height: '100%',
                background: 'rgba(255,255,255,0.7)',
                width: `${((current + 1) / SLIDES.length) * 100}%`,
                transition: 'width 0.4s ease',
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
              {current + 1} / {SLIDES.length}
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}
