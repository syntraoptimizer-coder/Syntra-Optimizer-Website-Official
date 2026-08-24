import { Bug, Package, Rocket, ShieldCheck, Wand2 } from 'lucide-react'

export type UpdateItem = {
  id: string
  version: string
  title: string
  body: string
  category: string
  published_at: string | null
}

const CATEGORY_STYLES: Record<string, { bg: string; border: string; color: string }> = {
  Performance: { bg: 'rgba(20,77,199,0.12)',   border: 'rgba(20,77,199,0.3)',   color: '#b8d7ff' },
  'New feature':{ bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.3)', color: '#6ee7b7' },
  Fix:          { bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.3)', color: '#fcd34d' },
  UI:           { bg: 'rgba(56,189,248,0.12)', border: 'rgba(56,189,248,0.3)', color: '#7dd3fc' },
  Security:     { bg: 'rgba(239,68,68,0.12)',  border: 'rgba(239,68,68,0.3)',  color: '#fca5a5' },
}

function CategoryIcon({ category }: { category: string }) {
  const s = { width: 11, height: 11 }
  if (category === 'New feature') return <Rocket style={s} />
  if (category === 'Fix')         return <Bug style={s} />
  if (category === 'UI')          return <Wand2 style={s} />
  if (category === 'Security')    return <ShieldCheck style={s} />
  return <Package style={s} />
}

function formatDate(date: string | null) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function UpdateTimeline({ updates }: { updates: UpdateItem[] }) {
  if (updates.length === 0) {
    return (
      <div style={{
        marginTop: 16, borderRadius: 12, padding: '32px 24px',
        textAlign: 'center', fontSize: '0.83rem',
        border: '1px dashed rgba(255,255,255,0.1)',
        color: 'rgba(255,255,255,0.3)',
      }}>
        No updates available yet. Check back soon.
      </div>
    )
  }

  return (
    <ol style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
      {updates.map((update) => {
        const cat = CATEGORY_STYLES[update.category] ?? CATEGORY_STYLES.Performance
        return (
          <li
            key={update.id}
            style={{
              position: 'relative',
              borderRadius: 12,
              border: '1px solid rgba(255,255,255,0.07)',
              background: 'rgba(255,255,255,0.025)',
              padding: '14px 16px',
              transition: 'border-color .2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(20,77,199,0.3)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)')}
          >
            {/* Top row */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
              {/* Version */}
              <span style={{
                fontFamily: 'ui-monospace, monospace',
                fontSize: '0.78rem', fontWeight: 600,
                color: '#b8d7ff', letterSpacing: '0.02em',
              }}>
                v{update.version}
              </span>

              {/* Category badge */}
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                padding: '2px 8px',
                borderRadius: 20,
                background: cat.bg,
                border: `1px solid ${cat.border}`,
                color: cat.color,
                fontSize: '0.7rem', fontWeight: 500,
              }}>
                <CategoryIcon category={update.category} />
                {update.category}
              </span>

              {/* Date */}
              <span style={{
                marginLeft: 'auto',
                fontSize: '0.72rem',
                color: 'rgba(255,255,255,0.3)',
                fontFamily: 'ui-monospace, monospace',
              }}>
                {formatDate(update.published_at)}
              </span>
            </div>

            {/* Title */}
            <p style={{
              marginTop: 8, marginBottom: 0,
              fontSize: '0.875rem', fontWeight: 600,
              color: 'rgba(255,255,255,0.85)',
              letterSpacing: '-0.03em',
            }}>
              {update.title}
            </p>

            {/* Body */}
            <p style={{
              marginTop: 4, marginBottom: 0,
              fontSize: '0.82rem', lineHeight: 1.65,
              color: 'rgba(255,255,255,0.42)',
              letterSpacing: '-0.02em',
            }}>
              {update.body}
            </p>
          </li>
        )
      })}
    </ol>
  )
}
