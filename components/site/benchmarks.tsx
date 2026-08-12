'use client'

import { useEffect, useRef, useState } from 'react'
import { Cpu, MonitorCog, MemoryStick } from 'lucide-react'
import { SectionHeading } from '@/components/site/section-heading'

const BENCHMARKS = [
  { game: 'Fortnite',  cpu: 'Ryzen 5 5600',   gpu: 'RTX 3060',    ram: '16GB DDR4', before: 142, after: 168 },
  { game: 'Valorant',  cpu: 'i5-12400F',       gpu: 'RTX 3060 Ti', ram: '16GB DDR4', before: 288, after: 341 },
  { game: 'CS2',       cpu: 'Ryzen 7 5800X',   gpu: 'RTX 4070',    ram: '32GB DDR4', before: 246, after: 302 },
  { game: 'Warzone',   cpu: 'i7-13700K',       gpu: 'RTX 4070 Ti', ram: '32GB DDR5', before: 118, after: 139 },
]

function BCard({ d, active }: { d: typeof BENCHMARKS[0]; active: boolean }) {
  const imp = Math.round(((d.after - d.before) / d.before) * 100)
  const max = Math.max(d.before, d.after)
  return (
    <div className="s-card hover-lift" style={{ padding: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--ink-0)', letterSpacing: '-0.01em' }}>{d.game}</h3>
        <span className="s-tag" style={{ fontSize: '0.65rem', color: 'var(--ink-1)' }}>+{imp}% FPS</span>
      </div>
      <div style={{ display: 'flex', gap: 12, marginBottom: 18, flexWrap: 'wrap' }}>
        {[{ Icon: Cpu, v: d.cpu }, { Icon: MonitorCog, v: d.gpu }, { Icon: MemoryStick, v: d.ram }].map(({ Icon, v }) => (
          <span key={v} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.72rem', color: 'var(--ink-3)' }}>
            <Icon style={{ width: 11, height: 11 }} />{v}
          </span>
        ))}
      </div>
      {[{ label: 'Before', value: d.before, pct: (d.before / max) * 100, dim: true },
        { label: 'After',  value: d.after,  pct: (d.after  / max) * 100, dim: false }].map(b => (
        <div key={b.label} style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
            <span style={{ fontSize: '0.72rem', color: b.dim ? 'var(--ink-3)' : 'var(--ink-1)', fontWeight: b.dim ? 400 : 500 }}>{b.label}</span>
            <span style={{ fontSize: '0.72rem', fontFamily: 'ui-monospace, monospace', color: b.dim ? 'var(--ink-3)' : 'var(--ink-0)', fontWeight: b.dim ? 400 : 600 }}>{b.value} FPS</span>
          </div>
          <div style={{ height: 4, background: 'var(--bg-3)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{
              height: '100%', borderRadius: 2,
              width: active ? `${b.pct}%` : '0%',
              background: b.dim ? 'var(--bg-4)' : 'linear-gradient(90deg, rgba(255,255,255,0.5), rgba(255,255,255,0.9))',
              boxShadow: b.dim ? 'none' : '0 0 8px rgba(255,255,255,0.3)',
              transition: `width 1.1s cubic-bezier(.4,0,.2,1) ${b.dim ? '0ms' : '180ms'}`,
            }} />
          </div>
        </div>
      ))}
    </div>
  )
}

export function Benchmarks() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setActive(true); obs.disconnect() } }, { threshold: 0.15 })
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return (
    <section id="benchmarks" style={{ scrollMarginTop: 64 }}>
      <div style={{ maxWidth: 1088, margin: '0 auto', padding: '96px 24px' }}>
        <SectionHeading eyebrow="Real hardware, real gains" title="Game benchmark:" accent="before vs after." description="Average FPS measured on real PC configurations before and after Syntra's Game Optimizer." />
        <div ref={ref} style={{ marginTop: 52, display: 'grid', gap: 8, gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
          {BENCHMARKS.map(d => <BCard key={d.game} d={d} active={active} />)}
        </div>
        <p style={{ marginTop: 20, textAlign: 'center', fontSize: '0.72rem', color: 'var(--ink-3)' }}>
          Results vary by hardware, drivers, and in-game settings.
        </p>
      </div>
    </section>
  )
}
