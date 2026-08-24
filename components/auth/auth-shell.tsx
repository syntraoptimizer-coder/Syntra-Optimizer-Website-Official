import { Zap, Gauge, ShieldCheck } from 'lucide-react'
import { Navbar } from '@/components/site/navbar'

const HIGHLIGHTS = [
  { icon: Zap, text: 'One-click optimization for Windows 10 & 11' },
  { icon: Gauge, text: 'Average system score jump from 68 to 92' },
  { icon: ShieldCheck, text: 'Safe, fully reversible changes' },
]

export function AuthShell({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode
  title: string
  subtitle: string
}) {
  return (
    <div
      className="grid min-h-dvh lg:grid-cols-2"
      style={{ background: 'var(--bg-page)' }}
    >
      {/* Same top bar as the landing page */}
      <Navbar />

      <div className="relative flex flex-col overflow-hidden px-4 py-8 pt-24 sm:px-8">
        <div aria-hidden="true" className="glow glow-blue" style={{
          top: '8%', left: '40%', width: 520, height: 520, opacity: 0.4, zIndex: 0,
        }} />

        <div className="relative z-10 flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-sm">
            <p className="section-eyebrow" style={{ marginBottom: 12 }}>
              <span className="live-dot" />
              Syntra Optimizer
            </p>
            <h1 style={{
              fontSize: 'clamp(1.7rem, 3vw, 2.2rem)',
              fontWeight: 600,
              letterSpacing: '-0.05em',
              color: '#fff',
              margin: 0,
            }}>
              {title}
            </h1>
            <p style={{
              marginTop: 8,
              fontSize: '0.92rem',
              color: 'rgba(255,255,255,0.45)',
              letterSpacing: '-0.03em',
            }}>
              {subtitle}
            </p>
            <div className="mt-8">{children}</div>
          </div>
        </div>
      </div>

      <div
        className="relative hidden overflow-hidden lg:block"
        style={{ borderLeft: '1px solid rgba(184,215,255,0.1)', background: 'var(--bg-card)' }}
      >
        <div aria-hidden="true" className="glow glow-blue" style={{
          top: '18%', left: '62%', width: 640, height: 640, opacity: 0.55, zIndex: 0,
        }} />
        <div aria-hidden="true" className="hero-grid" style={{ top: '0%', height: '100%', opacity: 0.22 }} />

        {[
          { top: '18%', left: '20%', opacity: 0.5 },
          { top: '35%', left: '80%', opacity: 0.35 },
          { top: '60%', left: '15%', opacity: 0.4 },
          { top: '75%', left: '70%', opacity: 0.3 },
        ].map((s, i) => (
          <div key={i} className="speck" style={s} aria-hidden="true" />
        ))}

        <div className="relative z-10 flex h-full flex-col justify-center px-12">
          <span className="s-tag w-fit">
            <span className="live-dot" />
            v2.0 live
          </span>

          <h2 style={{
            marginTop: 22,
            fontSize: 'clamp(2rem, 3.5vw, 3.1rem)',
            fontWeight: 600,
            letterSpacing: '-0.05em',
            lineHeight: 1.08,
            color: '#fff',
          }}>
            Optimize your PC.<br />
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>Instantly.</span>
          </h2>

          <p style={{
            marginTop: 14,
            maxWidth: 420,
            fontSize: '0.95rem',
            lineHeight: 1.65,
            color: 'rgba(255,255,255,0.45)',
            letterSpacing: '-0.03em',
          }}>
            Join 100+ gamers and creators running faster, cleaner machines.
          </p>

          <ul className="mt-10 space-y-3">
            {HIGHLIGHTS.map((item) => (
              <li key={item.text} className="flex items-center gap-3">
                <span
                  className="grid size-9 shrink-0 place-items-center"
                  style={{
                    borderRadius: 10,
                    background: 'rgba(20,77,199,0.18)',
                    border: '1px solid rgba(184,215,255,0.18)',
                    color: 'var(--blue-light)',
                  }}
                >
                  <item.icon className="size-4" />
                </span>
                <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', letterSpacing: '-0.03em' }}>
                  {item.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
