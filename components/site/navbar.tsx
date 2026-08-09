'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, User, Crown, Wrench } from 'lucide-react'
import { Logo } from '@/components/site/logo'
import { createClient } from '@/lib/supabase/client'

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Benchmarks', href: '#benchmarks' },
  { label: 'Pricing', href: '#pricing' },
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
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user || null)

      if (session?.user) {
        const { data: roleData } = await supabase
          .from('user_roles')
          .select('role, service_count')
          .eq('user_id', session.user.id)
          .maybeSingle()
        setUserRole(roleData?.role || 'free')
        setServiceCount(roleData?.service_count || 0)
      }

      setLoading(false)

      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
        setUser(session?.user || null)
        if (session?.user) {
          const { data: roleData } = await supabase
            .from('user_roles')
            .select('role, service_count')
            .eq('user_id', session.user.id)
            .maybeSingle()
          setUserRole(roleData?.role || 'free')
          setServiceCount(roleData?.service_count || 0)
        } else {
          setUserRole('free')
        }
      })

      return () => subscription.unsubscribe()
    }

    checkUser()
  }, [])

  const getRoleBadge = () => (
    <div className="flex items-center gap-1.5">
      {userRole === 'premium' && (
        <div className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium"
          style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)' }}>
          <Crown className="size-3" /> Premium
        </div>
      )}
      {serviceCount > 0 && (
        <div className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium"
          style={{ background: 'rgba(88,101,242,0.12)', color: 'rgba(180,185,255,0.9)' }}>
          <Wrench className="size-3" />
          {serviceCount > 1 ? `Service x${serviceCount}` : 'Service'}
        </div>
      )}
    </div>
  )

  return (
    <header className="sticky top-0 z-50 flex justify-center px-4 pt-5">
      {/* ── Glass pill navbar ── */}
      <div
        className="w-full max-w-[900px] transition-all duration-300"
        style={{
          borderRadius: 999,
          background: scrolled
            ? 'rgba(8, 8, 8, 0.72)'
            : 'rgba(8, 8, 8, 0.42)',
          border: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(18px) saturate(140%)',
          WebkitBackdropFilter: 'blur(18px) saturate(140%)',
          boxShadow: scrolled ? '0 8px 40px -12px rgba(0,0,0,0.7)' : 'none',
        }}
      >
        <div className="flex h-14 items-center justify-between px-3 pl-4">
          {/* Logo */}
          <Logo />

          {/* Nav links — desktop */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-light transition-all duration-200 hover:bg-white/5"
                style={{ color: 'rgba(255,255,255,0.6)' }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions — desktop */}
          <div className="hidden items-center gap-2 md:flex">
            {loading ? (
              <div
                className="h-9 w-20 animate-pulse rounded-full"
                style={{ background: 'rgba(255,255,255,0.06)' }}
              />
            ) : user ? (
              <div className="flex items-center gap-2">
                {getRoleBadge()}
                <Link
                  href="/dashboard"
                  className="inline-flex h-9 items-center gap-2 rounded-full px-4 text-sm font-medium transition-all duration-200 hover:bg-white/8"
                  style={{ color: 'rgba(255,255,255,0.75)' }}
                >
                  <User className="size-4" />
                  Dashboard
                </Link>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="inline-flex h-9 items-center rounded-full px-4 text-sm font-light transition-all duration-200 hover:bg-white/6"
                  style={{ color: 'rgba(255,255,255,0.6)' }}
                >
                  Log in
                </Link>
                <Link
                  href="/checkout?plan=premium"
                  className="btn-bevel inline-flex h-9 items-center gap-2 rounded-full px-5 text-sm"
                  style={{ boxShadow: '0 0 24px -6px rgba(255,255,255,0.5)' }}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Hamburger — mobile */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid size-9 place-items-center rounded-full transition-all duration-200 md:hidden"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.8)',
            }}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="absolute top-[76px] left-4 right-4 rounded-2xl p-4 md:hidden"
          style={{
            background: 'rgba(8,8,8,0.9)',
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        >
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-2.5 text-sm transition-all duration-150 hover:bg-white/6"
                style={{ color: 'rgba(255,255,255,0.6)' }}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-3 flex flex-col gap-2 border-t pt-3" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            {loading ? (
              <div className="h-10 w-full animate-pulse rounded-xl" style={{ background: 'rgba(255,255,255,0.06)' }} />
            ) : user ? (
              <div className="flex flex-col gap-2">
                {getRoleBadge()}
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-medium"
                  style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.8)' }}
                >
                  <User className="size-4" />
                  Dashboard
                </Link>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="flex h-10 items-center justify-center rounded-xl text-sm"
                  style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.65)' }}
                >
                  Log in
                </Link>
                <Link
                  href="/checkout?plan=premium"
                  onClick={() => setOpen(false)}
                  className="flex h-10 items-center justify-center rounded-xl text-sm font-semibold"
                  style={{ background: 'rgba(255,255,255,0.92)', color: '#080808' }}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
