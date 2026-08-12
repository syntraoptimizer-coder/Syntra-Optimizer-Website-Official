'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Crown, Wrench, User } from 'lucide-react'
import { Logo } from '@/components/site/logo'
import { createClient } from '@/lib/supabase/client'

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Benchmarks', href: '#benchmarks' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Changelog', href: '/changelog' },
  { label: 'FAQ', href: '#faq' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [userRole, setUserRole] = useState<'free' | 'premium'>('free')
  const [serviceCount, setServiceCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_e, session) => {
        setUser(session?.user || null)
        if (session?.user) {
          const { data } = await supabase.from('user_roles').select('role, service_count').eq('user_id', session.user.id).maybeSingle()
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
        <span className="s-tag" style={{ gap: 5 }}><Crown style={{ width: 10, height: 10 }} />Premium</span>
      )}
      {serviceCount > 0 && (
        <span className="s-tag" style={{ gap: 5, color: '#8ab4ff' }}><Wrench style={{ width: 10, height: 10 }} />{serviceCount} session{serviceCount > 1 ? 's' : ''} purchased</span>
      )}
    </div>
  )

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, display: 'flex', justifyContent: 'center', padding: '16px 16px 0' }}>
      <div style={{
        width: '100%', maxWidth: 920,
        background: scrolled ? 'rgba(10,10,10,0.88)' : 'rgba(10,10,10,0.55)',
        border: '1px solid var(--line)',
        borderRadius: 8,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: scrolled ? '0 4px 32px -8px rgba(0,0,0,0.7)' : 'none',
        transition: 'background 0.3s ease, box-shadow 0.3s ease',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 52, padding: '0 14px' }}>
          <Logo />

          {/* Desktop nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 2 }} className="hidden md:flex">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} style={{
                padding: '6px 14px', borderRadius: 4, fontSize: '0.83rem',
                fontWeight: 400, color: 'var(--ink-2)',
                transition: 'color 0.15s ease, background 0.15s ease',
                textDecoration: 'none',
              }}
                onMouseEnter={e => { (e.target as HTMLElement).style.color = 'var(--ink-0)'; (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; }}
                onMouseLeave={e => { (e.target as HTMLElement).style.color = 'var(--ink-2)'; (e.target as HTMLElement).style.background = 'transparent'; }}
              >{l.label}</a>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex" style={{ alignItems: 'center', gap: 8 }}>
            {loading ? (
              <div style={{ width: 80, height: 32, background: 'var(--bg-2)', borderRadius: 4 }} />
            ) : user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {badges()}
                <Link href="/dashboard" className="btn-ghost" style={{ padding: '6px 14px', fontSize: '0.83rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <User style={{ width: 13, height: 13 }} />Dashboard
                </Link>
              </div>
            ) : (
              <>
                <Link href="/login" className="btn-ghost" style={{ padding: '6px 14px', fontSize: '0.83rem' }}>Log in</Link>
                <Link href="/checkout?plan=premium" className="btn-primary" style={{ padding: '6px 16px', fontSize: '0.83rem' }}>Get Started</Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(v => !v)}
            className="md:hidden"
            style={{
              width: 34, height: 34, borderRadius: 4,
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
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden" style={{
          position: 'absolute', top: 76, left: 16, right: 16,
          background: 'rgba(10,10,10,0.95)', border: '1px solid var(--line)',
          borderRadius: 8, padding: 12,
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        }}>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
                padding: '10px 12px', borderRadius: 4, fontSize: '0.875rem',
                color: 'var(--ink-2)', textDecoration: 'none',
              }}>{l.label}</a>
            ))}
          </nav>
          <div style={{ borderTop: '1px solid var(--line)', marginTop: 8, paddingTop: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {user ? (
              <>
                {badges()}
                <Link href="/dashboard" onClick={() => setOpen(false)} className="btn-ghost" style={{ textAlign: 'center' }}>Dashboard</Link>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setOpen(false)} className="btn-ghost" style={{ textAlign: 'center' }}>Log in</Link>
                <Link href="/checkout?plan=premium" onClick={() => setOpen(false)} className="btn-primary" style={{ textAlign: 'center' }}>Get Started</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
