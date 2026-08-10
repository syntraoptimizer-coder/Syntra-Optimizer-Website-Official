import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn('inline-flex items-center gap-2', className)} aria-label="Syntra Optimizer home">
      <Image
        src="/syntra-logo.png"
        alt="Syntra"
        width={28}
        height={28}
        style={{ borderRadius: 6 }}
        priority
      />
      <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--ink-0)', letterSpacing: '-0.02em' }}>
        Syntra<span style={{ color: 'var(--ink-3)' }}>.</span>
      </span>
    </Link>
  )
}
