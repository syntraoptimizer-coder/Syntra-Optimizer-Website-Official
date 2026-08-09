import {
  Zap,
  Gamepad2,
  Wifi,
  Trash2,
  MemoryStick,
  Settings2,
} from 'lucide-react'
import { SectionHeading } from '@/components/site/section-heading'

const FEATURES = [
  {
    icon: Zap,
    title: 'Windows Performance',
    description: 'Boost responsiveness, speed up startup, eliminate unnecessary background activity, and keep Windows running at maximum efficiency.',
    tag: 'Faster PC',
  },
  {
    icon: Gamepad2,
    title: 'Gaming Experience',
    description: 'Improve FPS, reduce stuttering, minimize input lag, and optimize CPU and GPU resources for smoother gameplay.',
    tag: 'Higher FPS',
  },
  {
    icon: Wifi,
    title: 'Network Boost',
    description: 'Reduce latency, improve connection stability, optimize DNS and network settings for faster online gaming and downloads.',
    tag: 'Lower Ping',
  },
  {
    icon: Trash2,
    title: 'Deep Cleanup',
    description: 'Remove temporary files, cache, unnecessary components, and system clutter to recover storage and improve performance.',
    tag: 'Cleaner Windows',
  },
  {
    icon: MemoryStick,
    title: 'Memory Optimization',
    description: 'Free system memory, optimize resource usage, and improve multitasking for a smoother computing experience.',
    tag: 'Better Stability',
  },
  {
    icon: Settings2,
    title: 'Advanced Optimization',
    description: 'Access powerful Windows tweaks, privacy improvements, power settings, and advanced system optimizations for maximum performance.',
    tag: 'Pro Performance',
  },
]

export function Features() {
  return (
    <section id="features" className="relative scroll-mt-16 overflow-hidden">
      <div className="eco-tiles" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <SectionHeading
          eyebrow="Professional Performance Suite"
          title="Unlock Your PC's Full"
          accent="Potential."
          description="Powerful optimization tools designed to maximize Windows performance, increase gaming FPS, reduce latency, and keep your PC running like new."
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="eco-card glass-card rounded-2xl p-6 overflow-hidden group"
            >
              <div className="mb-4 flex items-center justify-between">
                <div
                  className="grid size-11 place-items-center rounded-xl transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.85)',
                  }}
                >
                  <feature.icon className="size-5" />
                </div>
                <span
                  className="section-tag"
                  style={{ fontSize: '0.62rem' }}
                >
                  {feature.tag}
                </span>
              </div>
              <h3 className="text-base font-medium" style={{ color: 'rgba(255,255,255,0.9)' }}>
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.42)', fontWeight: 300 }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {['Faster PC', 'Higher FPS', 'Lower Ping', 'Lower Latency', 'Better Stability', 'Cleaner Windows', 'Pro Performance'].map((item) => (
            <div
              key={item}
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'rgba(255,255,255,0.55)',
              }}
            >
              <span className="size-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.6)' }} />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
