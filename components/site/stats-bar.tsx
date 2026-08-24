'use client'

import { useEffect, useRef, useState } from 'react'

const STATS = [
  { label: 'Users optimized', value: 100, suffix: '+' },
  { label: 'Average rating', value: 4.8, suffix: '/5', decimals: 1 },
  { label: 'Avg optimization score', value: 92 },
  { label: 'Avg boot time saved', value: 41, suffix: '%' },
]

function useCountUp(target: number, active: boolean, decimals = 0, duration = 1600) {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!active) return
    let raf = 0
    const t0 = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1)
      setV(target * (1 - Math.pow(1 - p, 3)))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, active, duration])
  return decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString('en-US')
}

function StatItem({ stat, active }: { stat: typeof STATS[0]; active: boolean }) {
  const display = useCountUp(stat.value, active, stat.decimals ?? 0)
  return (
    <div style={{ flex: 1, textAlign: 'center', padding: '0 28px' }}>
      <div style={{
        fontFamily: 'ui-monospace, monospace',
        fontWeight: 700,
        letterSpacing: '-0.04em',
        fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
        color: '#ffffff',
        lineHeight: 1,
      }}>
        {display}{stat.suffix ?? ''}
      </div>
      <div style={{
        marginTop: 8,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        fontFamily: 'ui-monospace, monospace',
        fontSize: '0.65rem',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'var(--blue-light)',
      }}>
        <span className="live-dot" style={{ width: 5, height: 5 }} />
        {stat.label}
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
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setActive(true); obs.disconnect() } },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section style={{
      position: 'relative',
      background: 'var(--bg-page)',
      borderTop: '1px solid var(--line)',
      borderBottom: '1px solid var(--line)',
      overflow: 'hidden',
    }}>
      {/* Blue ambient glow */}
      <div aria-hidden="true" className="glow glow-blue" style={{
        position: 'absolute', left: '50%', top: '50%',
        width: 700, height: 300, opacity: 0.2, zIndex: 0,
      }} />

      {/* Dot grid bg */}
      <div className="dot-grid" aria-hidden="true" style={{
        position: 'absolute', inset: 0, opacity: 0.12, pointerEvents: 'none',
        maskImage: 'radial-gradient(ellipse 60% 80% at 50% 50%, #000 30%, transparent 90%)',
        WebkitMaskImage: 'radial-gradient(ellipse 60% 80% at 50% 50%, #000 30%, transparent 90%)',
      }} />

      <div
        ref={ref}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          maxWidth: 1024, margin: '0 auto', padding: '56px 24px',
          flexWrap: 'wrap', gap: 0, position: 'relative', zIndex: 1,
        }}
      >
        {STATS.map((s, i) => (
          <div key={s.label} style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 160 }}>
            <StatItem stat={s} active={active} />
            {i < STATS.length - 1 && <div className="stat-sep" />}
          </div>
        ))}
      </div>
    </section>
  )
}
