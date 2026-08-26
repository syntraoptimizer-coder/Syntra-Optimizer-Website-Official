'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Crown, Wrench, User, ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

/* ── Pixel-faithful port of the landing page's Framer top bar ──
   Links, badges and styles mirror the Framer nav rendered by
   app/span/span-html.ts (logo + v2.0 pill, Features / Changelog /
   Pricing / Dashboard(NEW) / Teams / FAQ, white Get Started CTA). */

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Changelog', href: '/changelog' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Dashboard', href: '/dashboard', new: true },
  { label: 'Teams', href: '/teams' },
  { label: 'FAQ', href: '/help' },
]

const PILL_STYLE: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 3,
  padding: '8px 10px',
  borderRadius: 15,
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  background: 'rgba(7, 16, 28, 0.35)',
  boxShadow: 'rgba(255, 255, 255, 0.38) 0px 1px 2px 0px inset',
}

const LINK_STYLE: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 5,
  padding: '3px 5px',
  borderRadius: 8,
  color: 'rgba(255,255,255,0.7)',
  fontFamily: 'Switzer, "Switzer Placeholder", sans-serif',
  fontSize: 14,
  fontWeight: 400,
  letterSpacing: '-0.04em',
  lineHeight: '1em',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  transition: 'color 0.15s ease, background 0.15s ease',
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [userRole, setUserRole] = useState<'free' | 'premium'>('free')
  const [serviceCount, setServiceCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user || null)
      if (session?.user) {
        const { data } = await supabase.from('user_roles').select('role, service_count').eq('user_id', session.user.id).maybeSingle()
        setUserRole(data?.role || 'free')
        setServiceCount(data?.service_count || 0)
      }
      setLoading(false)
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_e, sess) => {
        setUser(sess?.user || null)
        if (sess?.user) {
          const { data } = await supabase.from('user_roles').select('role, service_count').eq('user_id', sess.user.id).maybeSingle()
          setUserRole(data?.role || 'free')
          setServiceCount(data?.service_count || 0)
        } else { setUserRole('free'); setServiceCount(0) }
      })
      return () => subscription.unsubscribe()
    }
    init()
  }, [])

  const badges = () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      {userRole === 'premium' && (
        <span style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 6, padding: '3px 7px', whiteSpace: 'nowrap', fontSize: '0.68rem', color: 'var(--ink-1)' }}>
          <Crown style={{ width: 9, height: 9 }} />Premium
        </span>
      )}
      {serviceCount > 0 && (
        <span style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 6, padding: '3px 7px', whiteSpace: 'nowrap', fontSize: '0.68rem', color: 'var(--ink-1)' }}>
          <Wrench style={{ width: 9, height: 9 }} />×{serviceCount}
        </span>
      )}
    </div>
  )

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      zIndex: 50,
      display: 'flex', justifyContent: 'center',
      padding: '16px 20px',
      pointerEvents: 'none',
    }}>
      {/* ── Desktop pill (same as landing) ── */}
      <nav
        className="hidden md:flex"
        style={{
          ...PILL_STYLE,
          pointerEvents: 'auto',
          maxWidth: '100%',
        }}
      >
        {/* Logo + v2.0 badge (matches Framer Full Logo) */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 6, textDecoration: 'none', marginRight: 2 }} aria-label="Syntra Optimizer home">
          <Image src="/syntra-logo.png" alt="Syntra" width={25} height={25} style={{ objectFit: 'contain', borderRadius: 6 }} priority />
          <span style={{
            background: 'rgb(14, 37, 66)', borderRadius: 7,
            padding: '2px 6px',
            color: 'rgb(184, 215, 255)',
            fontFamily: '"DEM-MO Mono", ui-monospace, monospace',
            fontSize: 12,
            lineHeight: '1.2em',
            whiteSpace: 'nowrap',
          }}>v2.0</span>
        </Link>

        {/* Nav links */}
        {NAV_LINKS.map(l => (
          <a
            key={l.href}
            href={l.href}
            style={LINK_STYLE}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
          >
            {l.label}
            {l.new && (
              <span style={{
                background: 'rgb(14, 37, 66)', borderRadius: 3,
                padding: '1px 4px',
                color: 'rgb(184, 215, 255)',
                fontFamily: '"DEM-MO Mono", ui-monospace, monospace',
                fontSize: 12,
                lineHeight: '1.2em',
                whiteSpace: 'nowrap',
              }}>NEW</span>
            )}
          </a>
        ))}

        {/* Actions — right side */}
        {loading ? (
          <div style={{ width: 96, height: 32, background: 'rgba(255,255,255,0.05)', borderRadius: 10, marginLeft: 4 }} />
        ) : user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 4 }}>
            <div className="hidden lg:flex">{badges()}</div>
            <Link
              href="/dashboard"
              className="btn-primary"
              style={{
                padding: '7px 16px', fontSize: '0.82rem', borderRadius: 12,
                display: 'flex', alignItems: 'center', gap: 6,
              }}
            >
              <User style={{ width: 13, height: 13 }} />Dashboard
            </Link>
          </div>
        ) : (
          <Link
            href="/checkout?plan=premium"
            className="btn-primary"
            style={{
              padding: '8px 18px', fontSize: '0.82rem', borderRadius: 12,
              display: 'flex', alignItems: 'center', gap: 6,
              marginLeft: 4,
            }}
          >
            Get Started <ArrowRight style={{ width: 13, height: 13 }} />
          </Link>
        )}
      </nav>

      {/* ── Mobile pill ── */}
      <div
        className="glass-pill md:hidden flex w-full items-center justify-between"
        style={{
          padding: '0 14px', height: 50, borderRadius: 14,
          pointerEvents: 'auto',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Image src="/syntra-logo.png" alt="Syntra" width={25} height={25} style={{ objectFit: 'contain', borderRadius: 6 }} priority />
          <span style={{
            background: 'rgb(14, 37, 66)', borderRadius: 7,
            padding: '2px 6px',
            color: 'rgb(184, 215, 255)',
            fontFamily: '"DEM-MO Mono", ui-monospace, monospace',
            fontSize: 12,
            lineHeight: '1.2em',
          }}>v2.0</span>
        </div>
        <button
          onClick={() => setOpen(v => !v)}
          style={{
            width: 34, height: 34, borderRadius: 8,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid var(--line)',
            color: 'var(--ink-1)', cursor: 'pointer',
            display: 'grid', placeItems: 'center',
          }}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X style={{ width: 15, height: 15 }} /> : <Menu style={{ width: 15, height: 15 }} />}
        </button>
      </div>

      {/* ── Mobile dropdown ── */}
      {open && (
        <div
          className="glass-pill md:hidden"
          style={{
            position: 'absolute', top: 74, left: 20, right: 20,
            padding: 12, borderRadius: 14,
            pointerEvents: 'auto',
          }}
        >
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="nav-link" style={{ padding: '10px 12px' }}>{l.label}</a>
            ))}
          </nav>
          <div style={{ borderTop: '1px solid var(--line)', marginTop: 8, paddingTop: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {user ? (
              <>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 6 }}>{badges()}</div>
                <Link href="/dashboard" onClick={() => setOpen(false)} className="btn-primary" style={{ textAlign: 'center', borderRadius: 10 }}>Dashboard</Link>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setOpen(false)} className="btn-ghost" style={{ textAlign: 'center' }}>Log in</Link>
                <Link href="/checkout?plan=premium" onClick={() => setOpen(false)} className="btn-primary" style={{ textAlign: 'center', borderRadius: 10 }}>Get Started</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
