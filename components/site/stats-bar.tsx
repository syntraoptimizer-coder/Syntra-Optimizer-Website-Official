'use client'

import { useEffect, useRef, useState } from 'react'

type Stat = {
  label: string
  value: number
  suffix?: string
  decimals?: number
}

const STATS: Stat[] = [
  { label: 'Users', value: 100, suffix: '+' },
  { label: 'Average rating', value: 4.8, suffix: '/5', decimals: 1 },
  { label: 'Avg optimization score', value: 92 },
  { label: 'Avg boot time saved', value: 41, suffix: '%' },
]

function useCountUp(target: number, active: boolean, decimals = 0, duration = 1600) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!active) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(target * eased)
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, active, duration])
  return decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString('en-US')
}

function StatItem({ stat, active, index }: { stat: Stat; active: boolean; index: number }) {
  const display = useCountUp(stat.value, active, stat.decimals ?? 0)
  const gradientImage = index < 2
    ? 'radial-gradient(135% 150% at 104% 78%, #ffffff 0%, rgba(255,255,255,0.82) 26%, rgba(190,190,190,0.65) 66%, rgba(130,130,130,0.5) 100%)'
    : 'radial-gradient(135% 150% at -4% 78%, #ffffff 0%, rgba(255,255,255,0.82) 26%, rgba(190,190,190,0.65) 66%, rgba(130,130,130,0.5) 100%)'

  return (
    <div className="relative flex-1 text-center px-6">
      {/* Subtle glow dot */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '40%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 80, height: 80, borderRadius: '50%',
        background: 'rgba(255,255,255,0.9)',
        filter: 'blur(28px)', opacity: 0.1, pointerEvents: 'none',
      }} />
      <div className="relative z-10">
        <div className="font-mono tracking-tight tabular-nums" style={{
          fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
          fontWeight: 700,
          color: 'transparent',
          backgroundImage: gradientImage,
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
        }}>
          {display}{stat.suffix ?? ''}
        </div>
        <div className="mt-2 flex items-center justify-center gap-2">
          <span className="live-dot" aria-hidden="true" />
          <span className="text-sm font-light" style={{
            color: 'rgba(255,255,255,0.38)',
            fontFamily: 'ui-monospace, monospace',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            fontSize: '0.7rem',
          }}>
            {stat.label}
          </span>
        </div>
      </div>
    </div>
  )
}

export function StatsBar() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); observer.disconnect() } },
      { threshold: 0.3 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative overflow-hidden" style={{
      borderTop: '1px solid rgba(255,255,255,0.07)',
      borderBottom: '1px solid rgba(255,255,255,0.07)',
    }}>
      <div ref={ref}
        className="relative z-10 mx-auto flex max-w-6xl items-center justify-center px-4 py-14 sm:px-6"
      >
        {STATS.map((stat, index) => (
          <div key={stat.label} className="flex items-center flex-1">
            <StatItem stat={stat} active={active} index={index} />
            {index < STATS.length - 1 && (
              <div className="stat-separator" aria-hidden="true" />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
