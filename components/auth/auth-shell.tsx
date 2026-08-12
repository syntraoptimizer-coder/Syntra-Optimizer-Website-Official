import Link from 'next/link'
import { ArrowLeft, Zap, Gauge, ShieldCheck } from 'lucide-react'
import { Logo } from '@/components/site/logo'

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
      style={{ background: '#080808' }}
    >
      {/* ── Left panel — form ── */}
      <div className="relative flex flex-col overflow-hidden px-4 py-8 sm:px-8">
        {/* Glow halo */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-10%',
            left: '30%',
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(closest-side, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 44%, transparent 74%)',
            filter: 'blur(56px)',
            mixBlendMode: 'screen',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {/* Top bar */}
        <div className="relative z-10 flex items-center justify-between">
          <Logo />
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm transition-colors duration-200 hover:text-white"
            style={{ color: 'rgba(255,255,255,0.4)' }}
          >
            <ArrowLeft className="size-4" />
            Home
          </Link>
        </div>

        {/* Form area */}
        <div className="relative z-10 flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-sm">
            <h1
              className="tracking-tight"
              style={{
                fontSize: 'clamp(1.6rem, 3vw, 2rem)',
                fontWeight: 300,
                letterSpacing: '-0.024em',
                color: 'transparent',
                backgroundImage: 'linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.7) 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
              }}
            >
              {title}
            </h1>
            <p
              className="mt-2 text-sm"
              style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 300 }}
            >
              {subtitle}
            </p>
            <div className="mt-8">{children}</div>
          </div>
        </div>
      </div>

      {/* ── Right panel — branding ── */}
      <div
        className="relative hidden overflow-hidden lg:block"
        style={{ borderLeft: '1px solid rgba(255,255,255,0.07)' }}
      >
        {/* Glow halos */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-5%',
            left: '60%',
            width: 700,
            height: 700,
            borderRadius: '50%',
            background: 'radial-gradient(closest-side, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 44%, transparent 74%)',
            filter: 'blur(56px)',
            mixBlendMode: 'screen',
            pointerEvents: 'none',
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '70%',
            left: '30%',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(closest-side, rgba(255,255,255,0.1) 0%, transparent 70%)',
            filter: 'blur(48px)',
            mixBlendMode: 'screen',
            pointerEvents: 'none',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Hero grid */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '6.5vmin 6.5vmin',
            maskImage: 'radial-gradient(ellipse 70% 60% at 60% 40%, #000 20%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 60% 40%, #000 20%, transparent 80%)',
            opacity: 0.4,
            pointerEvents: 'none',
          }}
        />

        {/* Speck particles */}
        {[
          { top: '18%', left: '20%', opacity: 0.5 },
          { top: '35%', left: '80%', opacity: 0.35 },
          { top: '60%', left: '15%', opacity: 0.4 },
          { top: '75%', left: '70%', opacity: 0.3 },
          { top: '45%', left: '45%', opacity: 0.25 },
        ].map((s, i) => (
          <div
            key={i}
            aria-hidden="true"
            style={{
              position: 'absolute',
              width: 4,
              height: 4,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.6)',
              ...s,
            }}
          />
        ))}

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col justify-center px-12">
          <span
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium uppercase tracking-widest w-fit"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.5)',
            }}
          >
            <span className="size-1 rounded-full bg-white/70" />
            Syntra Optimizer
          </span>

          <h2
            className="mt-6 text-balance tracking-tight"
            style={{
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              fontWeight: 300,
              letterSpacing: '-0.026em',
              lineHeight: 1.08,
              color: 'transparent',
              backgroundImage: 'radial-gradient(110% 130% at 50% 85%, #ffffff 0%, rgba(255,255,255,0.85) 30%, rgba(195,195,195,0.7) 70%, rgba(130,130,130,0.52) 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
            }}
          >
            Optimize your PC.<br />Instantly.
          </h2>

          <p
            className="mt-4 max-w-md leading-relaxed text-sm"
            style={{ color: 'rgba(255,255,255,0.38)', fontWeight: 300 }}
          >
            Join 100+ gamers and creators running faster, cleaner machines.
          </p>

          <ul className="mt-10 space-y-4">
            {HIGHLIGHTS.map((item) => (
              <li key={item.text} className="flex items-center gap-3">
                <span
                  className="grid size-9 shrink-0 place-items-center rounded-xl"
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.8)',
                  }}
                >
                  <item.icon className="size-4" />
                </span>
                <span
                  className="text-sm"
                  style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 300 }}
                >
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
