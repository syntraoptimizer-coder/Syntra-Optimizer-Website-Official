'use client'

import { useEffect, useRef, useState } from 'react'

const STATS = [
  { label: 'Users', value: 100, suffix: '+' },
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

function StatItem({ stat, active, index }: { stat: typeof STATS[0]; active: boolean; index: number }) {
  const display = useCountUp(stat.value, active, stat.decimals ?? 0)
  const gradL = 'radial-gradient(135% 150% at 104% 78%, #f5f5f7 0%, rgba(245,245,247,0.7) 40%, rgba(150,150,155,0.5) 100%)'
  const gradR = 'radial-gradient(135% 150% at -4% 78%, #f5f5f7 0%, rgba(245,245,247,0.7) 40%, rgba(150,150,155,0.5) 100%)'
  return (
    <div style={{ flex: 1, textAlign: 'center', padding: '0 24px' }}>
      <div style={{
        fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '-0.02em', tabularNums: 'true',
        fontSize: 'clamp(2rem, 4vw, 3.2rem)',
        color: 'transparent',
        backgroundImage: index < 2 ? gradL : gradR,
        WebkitBackgroundClip: 'text', backgroundClip: 'text',
      }}>
        {display}{stat.suffix ?? ''}
      </div>
      <div style={{
        marginTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        fontFamily: 'ui-monospace, monospace', fontSize: '0.68rem',
        letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-3)',
      }}>
        <span className="live-dot" />
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
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setActive(true); obs.disconnect() } }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <section style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
      <div ref={ref} style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        maxWidth: 1024, margin: '0 auto', padding: '52px 24px',
        flexWrap: 'wrap', gap: 0,
      }}>
        {STATS.map((s, i) => (
          <div key={s.label} style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 140 }}>
            <StatItem stat={s} active={active} index={i} />
            {i < STATS.length - 1 && <div className="stat-sep" />}
          </div>
        ))}
      </div>
    </section>
  )
}
