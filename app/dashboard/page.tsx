import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AppChrome } from '@/components/site/app-chrome'
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
    <AppChrome crumb="dashboard" actions={<SignOutButton />}>
      <WelcomeToast name={name.split(' ')[0]} />

      <div style={{ marginBottom: 32 }}>
        <p className="section-eyebrow">
          <span className="live-dot" />
          Dashboard
        </p>
        <h1 style={{
          fontSize: 'clamp(1.6rem, 3vw, 2.3rem)', fontWeight: 600,
          letterSpacing: '-0.05em', lineHeight: 1.1,
          color: '#fff', margin: '0 0 8px',
        }}>
          Welcome back, {name.split(' ')[0]}
        </h1>
        <p style={{ fontSize: '0.92rem', color: 'rgba(255,255,255,0.45)', letterSpacing: '-0.03em' }}>
          Here's what's new in Syntra Optimizer.
        </p>
      </div>

      <DashboardTabs
        user={user}
        name={name}
        email={email}
        role={role as 'free' | 'premium'}
        serviceCount={serviceCount}
        initials={initials}
        updates={updates ?? []}
      />
    </AppChrome>
  )
}
