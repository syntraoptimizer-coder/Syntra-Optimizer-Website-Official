import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { UpdateTimeline, type UpdateItem } from '@/components/dashboard/update-timeline'
import { AppChrome } from '@/components/site/app-chrome'

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

      <div className="s-card" style={{ padding: 24 }}>
        <UpdateTimeline updates={updates ?? []} />
      </div>
    </AppChrome>
  )
}
