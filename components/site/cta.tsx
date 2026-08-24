import Link from 'next/link'
import { Download, ArrowRight, Star } from 'lucide-react'

const AVATARS = [
  { initials: 'DA', bg: 'linear-gradient(135deg,#144dc7,#3b82f6)' },
  { initials: 'CR', bg: 'linear-gradient(135deg,#6366f1,#8b5cf6)' },
  { initials: 'NP', bg: 'linear-gradient(135deg,#0ea5e9,#38bdf8)' },
  { initials: 'ZN', bg: 'linear-gradient(135deg,#10b981,#34d399)' },
  { initials: 'KV', bg: 'linear-gradient(135deg,#f59e0b,#fbbf24)' },
]

export function Cta() {
  return (
    <section style={{ padding: '0 24px 100px', background: 'var(--bg-page)' }}>
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        position: 'relative', overflow: 'hidden',
        borderRadius: 30,
        border: '1.5px solid rgba(20,77,199,0.25)',
        background: 'var(--bg-card)',
        padding: '90px 48px',
        textAlign: 'center',
      }}>
        {/* ── Blue glow top centre ── */}
        <div aria-hidden="true" className="glow glow-blue" style={{
          position: 'absolute', left: '50%', top: '-5%',
          width: 800, height: 500, opacity: 0.35, zIndex: 0,
        }} />

        {/* ── Dot grid texture ── */}
        <div className="card-texture" aria-hidden="true" style={{ opacity: 0.8 }} />

        {/* ── Blue accent strips on sides ── */}
        <div aria-hidden="true" style={{
          position: 'absolute', left: 0, top: '20%', bottom: '20%',
          width: 2, borderRadius: 2,
          background: 'linear-gradient(to bottom, transparent, rgba(20,77,199,0.6), transparent)',
        }} />
        <div aria-hidden="true" style={{
          position: 'absolute', right: 0, top: '20%', bottom: '20%',
          width: 2, borderRadius: 2,
          background: 'linear-gradient(to bottom, transparent, rgba(20,77,199,0.6), transparent)',
        }} />

        {/* ── Content ── */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p className="section-eyebrow" style={{ justifyContent: 'center' }}>
            <span className="live-dot" />
            Start optimizing today
          </p>

          <h2 style={{
            fontSize: 'clamp(2rem, 4.5vw, 3.6rem)', fontWeight: 600,
            letterSpacing: '-0.05em', lineHeight: 1.05,
            marginBottom: 18, color: '#fff',
          }}>
            Your PC has more<br />
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>to give.</span>
          </h2>

          <p style={{
            fontSize: '1rem', color: 'rgba(255,255,255,0.5)',
            lineHeight: 1.65, maxWidth: 460, marginInline: 'auto',
            marginBottom: 40, letterSpacing: '-0.03em',
          }}>
            Join 100+ gamers and creators running faster, cleaner machines.
            Optimize in minutes — or let an expert handle it for you.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 40 }}>
            <Link href="/checkout?plan=premium" className="btn-primary" style={{ padding: '13px 30px', fontSize: '0.95rem' }}>
              <Download style={{ width: 15, height: 15 }} />
              Get Started
              <ArrowRight style={{ width: 13, height: 13 }} />
            </Link>
            <a href="#pricing" className="btn-ghost" style={{ padding: '13px 28px', fontSize: '0.95rem' }}>
              Compare plans
            </a>
          </div>

          {/* Social proof pill */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 12,
            padding: '10px 20px',
            background: 'rgba(0,0,0,0.35)',
            border: '1px solid rgba(20,77,199,0.3)',
            borderRadius: 40,
            backdropFilter: 'blur(10px)',
            boxShadow: 'rgba(255,255,255,0.1) 0px 1px 1.4px 0px inset',
          }}>
            {/* Stacked avatars */}
            <div style={{ display: 'flex' }}>
              {AVATARS.map((av, i) => (
                <div key={av.initials} style={{
                  width: 26, height: 26, borderRadius: '50%',
                  background: av.bg,
                  border: '2px solid var(--bg-card)',
                  marginLeft: i === 0 ? 0 : -7,
                  display: 'grid', placeItems: 'center',
                  fontSize: '0.52rem', fontWeight: 700,
                  color: 'rgba(255,255,255,0.9)',
                  position: 'relative', zIndex: AVATARS.length - i,
                }}>
                  {av.initials}
                </div>
              ))}
            </div>

            {/* Stars */}
            <div style={{ display: 'flex', gap: 1 }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} style={{ width: 10, height: 10, fill: '#f5c518', color: '#f5c518' }} />
              ))}
            </div>

            <span style={{
              fontSize: '0.78rem', color: 'rgba(255,255,255,0.55)',
              letterSpacing: '-0.02em', whiteSpace: 'nowrap',
            }}>
              <strong style={{ color: '#fff', fontWeight: 600 }}>4.8</strong> · 100+ optimized PCs
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
