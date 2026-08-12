import { Bug, ChevronRight, Package, Rocket, ShieldCheck, Wand2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export type UpdateItem = {
  id: string
  version: string
  title: string
  body: string
  category: string
  published_at: string | null
}

const CATEGORY_STYLES: Record<string, string> = {
  Performance: 'border-primary/30 bg-primary/10 text-primary',
  'New feature': 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
  Fix: 'border-amber-500/30 bg-amber-500/10 text-amber-400',
  UI: 'border-sky-500/30 bg-sky-500/10 text-sky-400',
  Security: 'border-red-500/30 bg-red-500/10 text-red-400',
}

function CategoryIcon({ category }: { category: string }) {
  if (category === 'New feature') return <Rocket className="size-3.5" />
  if (category === 'Fix') return <Bug className="size-3.5" />
  if (category === 'UI') return <Wand2 className="size-3.5" />
  if (category === 'Security') return <ShieldCheck className="size-3.5" />
  return <Package className="size-3.5" />
}

function formatDate(date: string | null) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function UpdateTimeline({ updates }: { updates: UpdateItem[] }) {
  if (updates.length === 0) {
    return (
      <div
        className="mt-4 rounded-xl p-8 text-center text-sm"
        style={{ border: '1px dashed rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.35)' }}
      >
        No updates available yet. Check back soon.
      </div>
    )
  }

  return (
    <ol className="mt-4 space-y-4">
      {updates.map((update) => (
        <li
          key={update.id}
          className="relative rounded-xl border border-border bg-card/40 p-4 transition-colors hover:border-primary/30"
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-sm font-medium text-primary">v{update.version}</span>
            <span
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-medium',
                CATEGORY_STYLES[update.category] ?? CATEGORY_STYLES.Performance,
              )}
            >
              <CategoryIcon category={update.category} />
              {update.category}
            </span>
            <span className="ml-auto text-xs text-muted-foreground">
              {formatDate(update.published_at)}
            </span>
          </div>

          <h3 className="mt-2 flex items-center gap-1 font-medium">
            {update.title}
            <ChevronRight className="size-4 text-muted-foreground" />
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{update.body}</p>
        </li>
      ))}
    </ol>
  )
}