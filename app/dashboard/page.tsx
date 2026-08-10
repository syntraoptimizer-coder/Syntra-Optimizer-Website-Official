import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Logo } from '@/components/site/logo'
import { SignOutButton } from '@/components/dashboard/sign-out'
import { WelcomeToast } from '@/components/dashboard/welcome-toast'
import { DashboardTabs } from '@/components/dashboard/dashboard-tabs'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Dashboard — Syntra Optimizer',
  description: 'Your Syntra Optimizer dashboard.',
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles').select('id, full_name, email, avatar_url')
    .eq('id', user.id).maybeSingle()

  const { data: userRole } = await supabase
    .from('user_roles').select('role, service_count').eq('user_id', user.id).maybeSingle()

  const { data: updates } = await supabase
    .from('updates').select('id, version, title, body, category, published_at')
    .order('published_at', { ascending: false }).limit(10)

  const name = profile?.full_name || user.user_metadata?.full_name || user.email?.split('@')[0]
  const email = profile?.email || user.email
  const role = userRole?.role || 'free'
  const serviceCount = userRole?.service_count || 0
  const initials = name.split(' ').map((p: string) => p[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg-0)', fontFamily: 'var(--font-inter), ui-sans-serif, system-ui, sans-serif' }}>
      <WelcomeToast name={name.split(' ')[0]} />

      {/* Ambient glow */}
      <div aria-hidden="true" style={{
        position: 'fixed', top: '-8%', left: '50%', transform: 'translateX(-50%)',
        width: 700, height: 400, borderRadius: '50%', pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(closest-side, rgba(255,255,255,0.12) 0%, transparent 74%)',
        filter: 'blur(56px)', mixBlendMode: 'screen',
      }} />

      {/* Header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 20, display: 'flex', justifyContent: 'center', padding: '14px 16px 0' }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          width: '100%', maxWidth: 1040, height: 48, padding: '0 14px',
          background: 'rgba(8,8,8,0.82)', border: '1px solid var(--line)',
          borderRadius: 8, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Logo />
            <span style={{ fontSize: '0.78rem', color: 'var(--ink-3)', fontFamily: 'ui-monospace, monospace' }}>/ dashboard</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Link href="/" style={{
              display: 'inline-flex', alignItems: 'center', height: 30, padding: '0 12px',
              borderRadius: 4, fontSize: '0.8rem', color: 'var(--ink-3)',
              background: 'none', textDecoration: 'none',
              transition: 'color 0.15s ease',
            }}>Home</Link>
            <SignOutButton />
          </div>
        </div>
      </header>

      <main style={{ position: 'relative', zIndex: 10, maxWidth: 1040, margin: '0 auto', padding: '40px 16px 80px' }}>
        {/* Welcome */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 700,
            letterSpacing: '-0.03em', lineHeight: 1.1,
            color: 'var(--ink-0)', marginBottom: 6,
          }}>
            Welcome back, <span style={{ color: 'var(--ink-0)' }}>{name.split(' ')[0]}</span>
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--ink-3)' }}>
            Here's what's new in Syntra Optimizer.
          </p>
        </div>

        {/* Tabs + content */}
        <DashboardTabs
          user={user}
          name={name}
          email={email}
          role={role as 'free' | 'premium'}
          serviceCount={serviceCount}
          initials={initials}
          updates={updates ?? []}
        />
      </main>
    </div>
  )
}
