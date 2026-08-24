import { redirect } from 'next/navigation'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Features — Syntra Optimizer',
  description: 'Explore all 6 optimization modules: auto fixes, debloat, network tuning, game optimizer, RAM cleanup, and BIOS tools. One app, full control.',
  alternates: { canonical: 'https://www.syntraoptimizer.site/features' },
  openGraph: {
    title: 'Features — Syntra Optimizer',
    description: '6 powerful modules to make your PC faster, cleaner, and game-ready.',
    url: 'https://www.syntraoptimizer.site/features',
  },
}

export default function FeaturesPage() {
  redirect('/#features')
}
