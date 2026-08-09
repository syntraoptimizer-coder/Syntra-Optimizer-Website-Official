import Link from 'next/link'
import { Download } from 'lucide-react'

export function Cta() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div
        className="relative overflow-hidden rounded-2xl px-6 py-20 text-center sm:px-12"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        {/* Glow layers */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          background: 'radial-gradient(65% 110% at 50% 0%, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.04) 40%, transparent 72%)',
        }} />
        <div aria-hidden="true" className="glow glow-white" style={{
          position: 'absolute', left: '50%', top: '-10%',
          width: 700, height: 400, opacity: 0.22, zIndex: 0,
        }} />

        {/* Specks */}
        {[
          { top: '20%', left: '8%' }, { top: '65%', left: '14%' },
          { top: '30%', right: '10%' }, { top: '72%', right: '18%' },
        ].map((s, i) => (
          <div key={i} className="speck" style={{ position: 'absolute', opacity: 0.35, ...s }} aria-hidden="true" />
        ))}

        <div className="relative z-10">
          {/* Sharp tag */}
          <div className="flex justify-center mb-6">
            <span className="section-tag">
              <span className="size-1.5 rounded-full bg-white/60" />
              Start optimizing today
            </span>
          </div>

          <h2
            className="text-balance"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.4rem)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 1.0,
            }}
          >
            <span className="block" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Your PC has more
            </span>
            <span
              className="block"
              style={{
                color: 'transparent',
                backgroundImage: 'radial-gradient(ellipse at 50% 100%, #ffffff 0%, rgba(255,255,255,0.65) 70%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
              }}
            >
              to give.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-pretty leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.44)', fontWeight: 300 }}>
            Join 100+ gamers and creators running faster, cleaner machines. Optimize in
            minutes — or let an expert do it for you.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/checkout?plan=premium" className="btn-bevel">
              <Download className="size-4" />
              Get Started
            </Link>
            <a href="#pricing" className="btn-bevel-ghost">
              Compare plans
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
