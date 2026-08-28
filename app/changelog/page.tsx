import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { UpdateTimeline, type UpdateItem } from '@/components/dashboard/update-timeline'
import { AppChrome } from '@/components/site/app-chrome'

export const metadata: Metadata = {
  title: 'Changelog — Syntra Optimizer',
  description: 'Latest updates and improvements to Syntra Optimizer.',
}

export default async function ChangelogPage() {
  let updates: UpdateItem[] = []

  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('updates')
      .select('id, version, title, body, category, published_at')
      .order('published_at', { ascending: false })

    updates = data ?? []
  } catch {
    // Keep the public changelog available if Supabase is unavailable or not configured.
  }

  return (
    <AppChrome crumb="changelog">
      <div style={{ marginBottom: 32 }}>
        <p className="section-eyebrow"><span className="live-dot" />Updates</p>
        <h1 style={{
          fontSize: 'clamp(1.6rem, 3vw, 2.3rem)', fontWeight: 600,
          letterSpacing: '-0.05em', lineHeight: 1.1, color: '#fff', margin: '0 0 8px',
        }}>
          Changelog
        </h1>
        <p style={{ fontSize: '0.92rem', color: 'rgba(255,255,255,0.45)' }}>
          Latest updates and improvements to Syntra Optimizer.
        </p>
      </div>

      {updates.length > 0 ? (
        <div className="s-card" style={{ padding: 24 }}>
          <UpdateTimeline updates={updates} />
        </div>
      ) : (
        <div style={{ maxWidth: 620, padding: '18px 0', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
          <p style={{ margin: 0, color: 'var(--ink-2)', fontSize: '0.88rem', lineHeight: 1.6 }}>
            No releases have been published yet. New improvements will appear here as soon as they are ready.
          </p>
        </div>
      )}
    </AppChrome>
  )
}
