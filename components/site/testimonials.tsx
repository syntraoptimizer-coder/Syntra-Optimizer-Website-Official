import { Star } from 'lucide-react'

const TESTIMONIALS = [
  { name: 'Da1ko',     role: 'Valorant Player',  rating: 5, quote: "Huge thanks — absolutely incredible! My PC feels much faster, everything is smoother, and I noticed the improvement right away.", initials: 'DA', bg: 'linear-gradient(135deg,#144dc7,#3b82f6)' },
  { name: 'Crinok',    role: 'FPS Player',       rating: 5, quote: "I didn't expect such a huge improvement. My PC boots faster, games run noticeably smoother, and I've gained several FPS. Just a few clicks.", initials: 'CR', bg: 'linear-gradient(135deg,#6366f1,#8b5cf6)' },
  { name: 'NovalPusl', role: 'PC Enthusiast',    rating: 5, quote: "I've tried several tools before, but this genuinely stands out. My system feels more responsive and gaming performance has noticeably improved.", initials: 'NP', bg: 'linear-gradient(135deg,#0ea5e9,#38bdf8)' },
  { name: 'Zenitud',   role: 'Casual Gamer',     rating: 5, quote: "Surprised by how much of a difference this made. No more stutters while gaming. Quick and straightforward. Definitely worth trying.", initials: 'ZN', bg: 'linear-gradient(135deg,#10b981,#34d399)' },
  { name: 'Kevin12',   role: 'PC Gamer',         rating: 5, quote: "Syntra Optimizer exceeded my expectations. Faster system, smoother multitasking, better game stability. One-click optimization is incredibly convenient.", initials: 'KV', bg: 'linear-gradient(135deg,#f59e0b,#fbbf24)' },
  { name: 'Min12_',    role: 'Daily User',       rating: 5, quote: "Been using it for a few days — difference is clear. Shorter boot times, smoother games, improved performance. Reliable and does what it promises.", initials: 'MN', bg: 'linear-gradient(135deg,#ec4899,#f472b6)' },
]

const ITEMS = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS]

function Card({ t }: { t: typeof TESTIMONIALS[0] }) {
  return (
    <div
      className="span-card"
      style={{
        flexShrink: 0, width: 320, padding: '22px 22px 20px', margin: '0 6px',
        borderRadius: 20,
        transition: 'border-color 0.2s ease, transform 0.2s ease',
      }}
    >
      {/* Stars */}
      <div style={{ display: 'flex', gap: 2, marginBottom: 14 }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} style={{
            width: 12, height: 12,
            fill: i < t.rating ? '#f5c518' : 'transparent',
            color: i < t.rating ? '#f5c518' : 'rgba(255,255,255,0.15)',
          }} />
        ))}
      </div>

      {/* Quote */}
      <p style={{
        fontSize: '0.85rem', lineHeight: 1.65,
        color: 'rgba(255,255,255,0.55)',
        marginBottom: 20,
        letterSpacing: '-0.02em',
      }}>"{t.quote}"</p>

      {/* Author */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 14,
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10, flexShrink: 0,
          background: t.bg,
          display: 'grid', placeItems: 'center',
          fontSize: '0.62rem', fontWeight: 700,
          color: 'rgba(255,255,255,0.92)',
          letterSpacing: '0.02em',
          boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
        }}>{t.initials}</div>
        <div>
          <p style={{
            fontSize: '0.88rem', fontWeight: 600,
            color: '#fff', lineHeight: 1.2,
            letterSpacing: '-0.03em',
          }}>{t.name}</p>
          <p style={{
            fontSize: '0.68rem',
            color: 'var(--blue-light)',
            fontFamily: 'ui-monospace, monospace',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginTop: 2,
          }}>{t.role}</p>
        </div>
      </div>
    </div>
  )
}

export function Testimonials() {
  return (
    <section style={{
      background: 'var(--bg-page)',
      borderTop: '1px solid var(--line)',
      borderBottom: '1px solid var(--line)',
      overflow: 'hidden',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '96px 24px 48px' }}>
        <div style={{ textAlign: 'center' }}>
          <p className="section-eyebrow" style={{ justifyContent: 'center' }}>
            <span className="live-dot" />
            Loved by 100+ users
          </p>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 600,
            letterSpacing: '-0.05em', lineHeight: 1.1, margin: '0 0 14px', color: '#fff',
          }}>
            What players are{' '}
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>saying.</span>
          </h2>
          <p style={{
            fontSize: '0.95rem', color: 'rgba(255,255,255,0.45)',
            lineHeight: 1.6, maxWidth: '46ch', marginInline: 'auto',
            letterSpacing: '-0.03em',
          }}>
            From ranked grinders to first-time PC owners, Syntra keeps machines fast and games smooth.
          </p>
        </div>
      </div>

      <div style={{
        paddingBottom: 96,
        maskImage: 'linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)',
      }}>
        <div className="marquee-track">
          {ITEMS.map((t, i) => <Card key={`${t.name}-${i}`} t={t} />)}
        </div>
      </div>
    </section>
  )
}
