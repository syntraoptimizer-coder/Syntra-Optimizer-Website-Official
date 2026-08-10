import Link from 'next/link'
import { Download } from 'lucide-react'

export function Cta() {
  return (
    <section style={{ padding: '0 24px 96px' }}>
      <div style={{
        maxWidth: 1088, margin: '0 auto',
        position: 'relative', overflow: 'hidden',
        borderRadius: 8, border: '1px solid var(--line)',
        background: 'var(--bg-1)',
        padding: '80px 48px', textAlign: 'center',
      }}>
        {/* Glow */}
        <div aria-hidden="true" className="glow glow-white" style={{
          position: 'absolute', left: '50%', top: '-10%',
          width: 700, height: 450, opacity: 0.18, zIndex: 0,
        }} />
        {/* Dot grid */}
        <div className="dot-grid" aria-hidden="true" style={{
          position: 'absolute', inset: 0, opacity: 0.25, zIndex: 0, pointerEvents: 'none',
          maskImage: 'radial-gradient(ellipse 70% 80% at 50% 0%, #000 20%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 80% at 50% 0%, #000 20%, transparent 80%)',
        }} />

        {/* Specks */}
        {[{ top: '22%', left: '6%' }, { top: '68%', left: '12%' }, { top: '28%', right: '8%' }, { top: '70%', right: '14%' }].map((s, i) => (
          <div key={i} className="speck" style={{ position: 'absolute', opacity: 0.35, ...s }} aria-hidden="true" />
        ))}

        <div style={{ position: 'relative', zIndex: 1 }}>
          <span className="s-tag" style={{ display: 'inline-flex', marginBottom: 24 }}>
            <span className="live-dot" />
            Start optimizing today
          </span>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3.4rem)', fontWeight: 700,
            letterSpacing: '-0.04em', lineHeight: 1.0, marginBottom: 16,
          }}>
            <span style={{ display: 'block', color: 'var(--ink-2)' }}>Your PC has more</span>
            <span style={{ display: 'block', color: 'var(--ink-0)' }}>to give.</span>
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--ink-2)', lineHeight: 1.65, maxWidth: 460, marginInline: 'auto', marginBottom: 36 }}>
            Join 100+ gamers and creators running faster, cleaner machines.
            Optimize in minutes — or let an expert do it for you.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/checkout?plan=premium" className="btn-primary">
              <Download style={{ width: 15, height: 15 }} />Get Started
            </Link>
            <a href="#pricing" className="btn-ghost">Compare plans</a>
          </div>
        </div>
      </div>
    </section>
  )
}
