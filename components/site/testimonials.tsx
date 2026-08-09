import { Star } from 'lucide-react'
import { SectionHeading } from '@/components/site/section-heading'

const TESTIMONIALS = [
  {
    name: 'Da1ko',
    role: 'Valorant Player',
    quote: 'Huge thanks for your optimization — absolutely incredible! My PC feels much faster, everything is smoother, and I noticed the improvement right away.',
    rating: 5,
  },
  {
    name: 'Crinok',
    role: 'FPS Player',
    quote: "I honestly didn't expect such a huge improvement. My PC boots much faster, games run noticeably smoother, and I've gained several FPS.",
    rating: 5,
  },
  {
    name: 'NovalPusl',
    role: 'PC Enthusiast',
    quote: "I've tried several PC optimization tools before, but this one genuinely stands out. My system feels much more responsive and gaming performance has improved.",
    rating: 5,
  },
  {
    name: 'Zenitud',
    role: 'Casual Gamer',
    quote: 'I was surprised by how much of a difference this made. My PC runs smoother, applications open faster, and I no longer experience stutters while gaming.',
    rating: 5,
  },
  {
    name: 'Kevin12',
    role: 'PC Gamer',
    quote: "Syntra Optimizer exceeded my expectations. My system is faster, multitasking is smoother, and my games run with better stability. Excellent software!",
    rating: 5,
  },
  {
    name: 'Min12_',
    role: 'Daily User',
    quote: "I've been using Syntra Optimizer for a few days now, and the difference is clear. Boot times are shorter, my games feel smoother. Great job!",
    rating: 5,
  },
]

// Triple the array for seamless marquee loop
const MARQUEE_ITEMS = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS]

function initials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
}

function TestimonialCard({ t }: { t: typeof TESTIMONIALS[0] }) {
  return (
    <div
      className="flex-none w-80 glass-card rounded-2xl p-5 mx-2"
      style={{ background: 'rgba(255,255,255,0.03)' }}
    >
      <div className="flex items-center gap-0.5 mb-3" aria-label={`${t.rating} stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="size-3.5" style={{
            fill: i < t.rating ? 'rgba(255,255,255,0.85)' : 'transparent',
            color: i < t.rating ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.15)',
          }} />
        ))}
      </div>
      <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.65)', fontWeight: 300 }}>
        "{t.quote}"
      </p>
      <div className="flex items-center gap-3">
        <span
          className="grid size-8 place-items-center rounded-full text-xs font-semibold flex-none"
          style={{
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: 'rgba(255,255,255,0.7)',
          }}
        >
          {initials(t.name)}
        </span>
        <div>
          <p className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.85)' }}>{t.name}</p>
          <p className="text-xs font-light" style={{
            color: 'rgba(255,255,255,0.38)',
            fontFamily: 'ui-monospace, monospace',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            fontSize: '0.65rem',
          }}>{t.role}</p>
        </div>
      </div>
    </div>
  )
}

export function Testimonials() {
  return (
    <section className="relative overflow-hidden" style={{
      borderTop: '1px solid rgba(255,255,255,0.07)',
      borderBottom: '1px solid rgba(255,255,255,0.07)',
    }}>
      <div className="eco-tiles" aria-hidden="true" />

      <div className="relative z-10 py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Loved by 100+ users"
            title="What players are"
            accent="saying."
            description="From ranked grinders to first-time PC owners, Syntra keeps machines fast."
          />
        </div>

        {/* Marquee */}
        <div className="mt-14 overflow-hidden" style={{
          maskImage: 'linear-gradient(90deg, transparent 0%, #000 10%, #000 90%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, #000 10%, #000 90%, transparent 100%)',
        }}>
          <div className="marquee-track">
            {MARQUEE_ITEMS.map((t, i) => (
              <TestimonialCard key={`${t.name}-${i}`} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
