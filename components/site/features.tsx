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
    number: '01',
  },
  {
    icon: Gamepad2,
    title: 'Gaming Experience',
    description: 'Improve FPS, reduce stuttering, minimize input lag, and optimize CPU and GPU resources for smoother gameplay.',
    tag: 'Higher FPS',
    number: '02',
  },
  {
    icon: Wifi,
    title: 'Network Boost',
    description: 'Reduce latency, improve connection stability, optimize DNS and network settings for faster online gaming and downloads.',
    tag: 'Lower Ping',
    number: '03',
  },
  {
    icon: Trash2,
    title: 'Deep Cleanup',
    description: 'Remove temporary files, cache, unnecessary components, and system clutter to recover storage and improve performance.',
    tag: 'Cleaner Windows',
    number: '04',
  },
  {
    icon: MemoryStick,
    title: 'Memory Optimization',
    description: 'Free system memory, optimize resource usage, and improve multitasking for a smoother computing experience.',
    tag: 'Better Stability',
    number: '05',
  },
  {
    icon: Settings2,
    title: 'Advanced Optimization',
    description: 'Access powerful Windows tweaks, privacy improvements, power settings, and advanced system optimizations for maximum performance.',
    tag: 'Pro Performance',
    number: '06',
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

        {/* Stacked sticky cards — animos "How it Works" style */}
        <div
          className="mt-14 relative"
          style={{ paddingBottom: `${(FEATURES.length - 1) * 1.6}rem` }}
        >
          {FEATURES.map((feature, i) => (
            <div
              key={feature.title}
              className="stack-card dt-section-reveal"
              style={{
                top: `calc(80px + ${i * 1.6}rem)`,
                padding: '2rem',
                marginBottom: i < FEATURES.length - 1 ? '1.5rem' : 0,
                zIndex: i + 1,
                // Slightly scale down cards further back
                transformOrigin: 'top center',
              }}
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-8">
                {/* Number + icon */}
                <div className="flex items-center gap-4 sm:flex-col sm:items-start sm:gap-3 flex-none">
                  <div
                    className="grid size-12 place-items-center rounded-xl"
                    style={{
                      background: 'rgba(255,255,255,0.07)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: 'rgba(255,255,255,0.85)',
                    }}
                  >
                    <feature.icon className="size-5" />
                  </div>
                  <span
                    style={{
                      fontFamily: 'ui-monospace, monospace',
                      fontSize: '0.68rem',
                      letterSpacing: '0.1em',
                      color: 'rgba(255,255,255,0.25)',
                    }}
                  >
                    {feature.number}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3
                      className="text-base font-medium"
                      style={{ color: 'rgba(255,255,255,0.92)' }}
                    >
                      {feature.title}
                    </h3>
                    <span
                      className="section-tag"
                      style={{ fontSize: '0.62rem' }}
                    >
                      {feature.tag}
                    </span>
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'rgba(255,255,255,0.42)', fontWeight: 300, maxWidth: '60ch' }}
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom highlights */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 dt-section-reveal">
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
