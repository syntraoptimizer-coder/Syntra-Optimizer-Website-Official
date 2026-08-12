import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { UpdateTimeline, type UpdateItem } from '@/components/dashboard/update-timeline'
import { Logo } from '@/components/site/logo'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Changelog — Syntra Optimizer',
  description: 'Latest updates and improvements to Syntra Optimizer.',
}

export default async function ChangelogPage() {
  const supabase = await createClient()
  const { data: updates } = await supabase
    .from('updates')
    .select('id, version, title, body, category, published_at')
    .order('published_at', { ascending: false })

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg-0)', fontFamily: 'var(--font-inter), ui-sans-serif, system-ui, sans-serif' }}>
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
            <span style={{ fontSize: '0.78rem', color: 'var(--ink-3)', fontFamily: 'ui-monospace, monospace' }}>/ changelog</span>
          </div>
          <Link href="/" style={{
            display: 'inline-flex', alignItems: 'center', height: 30, padding: '0 12px',
            borderRadius: 4, fontSize: '0.8rem', color: 'var(--ink-3)',
            background: 'none', textDecoration: 'none',
            transition: 'color 0.15s ease',
          }}>Home</Link>
        </div>
      </header>

      <main style={{ position: 'relative', zIndex: 10, maxWidth: 1040, margin: '0 auto', padding: '40px 16px 80px' }}>
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 700,
            letterSpacing: '-0.03em', lineHeight: 1.1,
            color: 'var(--ink-0)', marginBottom: 6,
          }}>
            Changelog
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--ink-3)' }}>
            Latest updates and improvements to Syntra Optimizer.
          </p>
        </div>

        {/* Updates */}
        <div className="s-card" style={{ padding: 24 }}>
          <UpdateTimeline updates={updates ?? []} />
        </div>
      </main>
    </div>
  )
}
