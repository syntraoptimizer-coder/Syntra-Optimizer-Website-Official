import { Star } from 'lucide-react'
import { SectionHeading } from '@/components/site/section-heading'

const TESTIMONIALS = [
  { name: 'Da1ko',     role: 'Valorant Player',  rating: 5, quote: "Huge thanks — absolutely incredible! My PC feels much faster, everything is smoother, and I noticed the improvement right away. Highly recommend." },
  { name: 'Crinok',    role: 'FPS Player',       rating: 5, quote: "I didn't expect such a huge improvement. My PC boots faster, games run noticeably smoother, and I've gained several FPS. Just a few clicks." },
  { name: 'NovalPusl', role: 'PC Enthusiast',    rating: 5, quote: "I've tried several tools before, but this genuinely stands out. My system feels more responsive and gaming performance has noticeably improved." },
  { name: 'Zenitud',   role: 'Casual Gamer',     rating: 5, quote: "Surprised by how much of a difference this made. No more stutters while gaming. Quick and straightforward. Definitely worth trying." },
  { name: 'Kevin12',   role: 'PC Gamer',         rating: 5, quote: "Syntra Optimizer exceeded my expectations. Faster system, smoother multitasking, better game stability. One-click optimization is incredibly convenient." },
  { name: 'Min12_',    role: 'Daily User',       rating: 5, quote: "Been using it for a few days — difference is clear. Shorter boot times, smoother games, improved performance. Reliable and does what it promises." },
]

const ITEMS = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS]

function initials(n: string) { return n.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase() }

function Card({ t }: { t: typeof TESTIMONIALS[0] }) {
  return (
    <div className="s-card" style={{ flexShrink: 0, width: 300, padding: 20, margin: '0 6px' }}>
      <div style={{ display: 'flex', gap: 2, marginBottom: 12 }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} style={{ width: 12, height: 12, fill: i < t.rating ? 'var(--ink-1)' : 'transparent', color: i < t.rating ? 'var(--ink-1)' : 'var(--bg-4)' }} />
        ))}
      </div>
      <p style={{ fontSize: '0.82rem', lineHeight: 1.6, color: 'var(--ink-2)', marginBottom: 16 }}>"{t.quote}"</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 30, height: 30, borderRadius: 4, border: '1px solid var(--line)',
          background: 'var(--bg-2)', display: 'grid', placeItems: 'center',
          fontSize: '0.68rem', fontWeight: 600, color: 'var(--ink-2)', flexShrink: 0,
        }}>{initials(t.name)}</div>
        <div>
          <p style={{ fontSize: '0.83rem', fontWeight: 600, color: 'var(--ink-0)' }}>{t.name}</p>
          <p style={{ fontSize: '0.68rem', color: 'var(--ink-3)', fontFamily: 'ui-monospace, monospace', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{t.role}</p>
        </div>
      </div>
    </div>
  )
}

export function Testimonials() {
  return (
    <section style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1088, margin: '0 auto', padding: '96px 24px 48px' }}>
        <SectionHeading eyebrow="Loved by 100+ users" title="What players are" accent="saying." description="From ranked grinders to first-time PC owners, Syntra keeps machines fast." />
      </div>
      <div style={{ paddingBottom: 96, maskImage: 'linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)', WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)' }}>
        <div className="marquee-track">
          {ITEMS.map((t, i) => <Card key={`${t.name}-${i}`} t={t} />)}
        </div>
      </div>
    </section>
  )
}
