'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, TrendingUp } from 'lucide-react'
import { SectionHeading } from '@/components/site/section-heading'

const BEFORE = 68
const AFTER = 92

function Gauge({
  value,
  active,
  variant,
  label,
}: {
  value: number
  active: boolean
  variant: 'before' | 'after'
  label: string
}) {
  const [display, setDisplay] = useState(0)
  const size = 200
  const stroke = 14
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius

  const isAfter = variant === 'after'

  useEffect(() => {
    if (!active) return
    let raf = 0
    const start = performance.now()
    const duration = 1800
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(value * eased))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [value, active])

  const offset = circumference - (display / 100) * circumference

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative p-2"
        style={{ overflow: 'visible' }}
      >
        {/* No extra div — glow only via SVG drop-shadow filter on the stroke */}
        <svg width={size} height={size} className="-rotate-90" style={{ position: 'relative', zIndex: 1, overflow: 'visible' }}>
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth={stroke}
          />
          {/* Progress */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={isAfter ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.3)'}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ filter: isAfter ? 'drop-shadow(0 0 6px rgba(255,255,255,0.9)) drop-shadow(0 0 14px rgba(255,255,255,0.5))' : 'none' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="font-mono tabular-nums"
            style={{
              fontSize: '3rem',
              fontWeight: 300,
              color: isAfter ? '#ffffff' : 'rgba(255,255,255,0.45)',
            }}
          >
            {display}
          </span>
          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>/ 100</span>
        </div>
      </div>
      <span
        className="mt-4 text-sm font-light"
        style={{ color: isAfter ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.35)' }}
      >
        {label}
      </span>
    </div>
  )
}

export function ScoreComparison() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      className="relative overflow-hidden"
      style={{ borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="glow glow-soft"
        style={{ left: '50%', top: '50%', width: 600, height: 400, opacity: 0.2 }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <SectionHeading
          eyebrow="Measurable results"
          title="Watch your system score climb"
          description="Syntra grades your system health before and after optimization so you can see exactly what changed."
        />

        <div
          ref={ref}
          className="mt-16 flex flex-col items-center justify-center gap-10 sm:flex-row sm:gap-16"
        >
          <Gauge value={BEFORE} active={active} variant="before" label="Before" />

          <ArrowRight
            className="size-8 rotate-90 sm:rotate-0"
            style={{ color: 'rgba(255,255,255,0.25)' }}
            aria-hidden="true"
          />

          <Gauge value={AFTER} active={active} variant="after" label="After Syntra" />
        </div>

        <div className="mx-auto mt-10 flex w-fit items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: 'rgba(255,255,255,0.7)',
          }}
        >
          <TrendingUp className="size-4" />
          +{AFTER - BEFORE} point improvement on average
        </div>
      </div>
    </section>
  )
}
