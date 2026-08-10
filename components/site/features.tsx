import { Zap, Gamepad2, Wifi, Trash2, MemoryStick, Settings2 } from 'lucide-react'
import { SectionHeading } from '@/components/site/section-heading'

const FEATURES = [
  { icon: Zap,         title: 'Windows Performance', tag: 'Faster PC',       description: 'Boost responsiveness, speed up startup, and eliminate unnecessary background activity for maximum efficiency.' },
  { icon: Gamepad2,    title: 'Gaming Experience',   tag: 'Higher FPS',      description: 'Improve FPS, reduce stuttering, minimize input lag, and optimize CPU and GPU resources for smoother gameplay.' },
  { icon: Wifi,        title: 'Network Boost',       tag: 'Lower Ping',      description: 'Reduce latency, optimize DNS and TCP settings for faster online gaming and more stable connections.' },
  { icon: Trash2,      title: 'Deep Cleanup',        tag: 'Cleaner Windows', description: 'Remove temporary files, cache, and system clutter to recover storage and improve overall performance.' },
  { icon: MemoryStick, title: 'Memory Optimization', tag: 'Better Stability', description: 'Free system memory, optimize resource usage, and improve multitasking for a smoother experience.' },
  { icon: Settings2,   title: 'Advanced Tweaks',     tag: 'Pro Performance', description: 'Access powerful Windows tweaks, privacy improvements, power settings, and advanced system optimizations.' },
]

const TAGS = ['Faster PC', 'Higher FPS', 'Lower Ping', 'Lower Latency', 'Better Stability', 'Cleaner Windows', 'Pro Performance']

export function Features() {
  return (
    <section id="features" style={{ scrollMarginTop: 64 }}>
      <div style={{ maxWidth: 1088, margin: '0 auto', padding: '96px 24px' }}>
        <SectionHeading
          eyebrow="Professional Performance Suite"
          title="Unlock Your PC's Full"
          accent="Potential."
          description="Powerful optimization tools designed to maximize Windows performance, increase gaming FPS, reduce latency, and keep your PC running like new."
        />

        <div style={{ marginTop: 52, display: 'grid', gap: 8, gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
          {FEATURES.map((f) => (
            <div key={f.title} className="s-card hover-lift" style={{ padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 6, display: 'grid', placeItems: 'center',
                  background: 'rgba(255,255,255,0.05)', border: '1px solid var(--line)',
                  color: 'var(--ink-1)',
                }}>
                  <f.icon style={{ width: 18, height: 18 }} />
                </div>
                <span className="s-tag" style={{ fontSize: '0.62rem' }}>{f.tag}</span>
              </div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--ink-0)', marginBottom: 8, letterSpacing: '-0.01em' }}>{f.title}</h3>
              <p style={{ fontSize: '0.83rem', lineHeight: 1.6, color: 'var(--ink-3)', fontWeight: 400 }}>{f.description}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 36, display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
          {TAGS.map(t => (
            <span key={t} className="s-tag" style={{ fontSize: '0.68rem', color: 'var(--ink-3)' }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(255,255,255,0.4)', flexShrink: 0 }} />
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
