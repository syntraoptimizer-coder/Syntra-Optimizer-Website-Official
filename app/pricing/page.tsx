import { redirect } from 'next/navigation'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing — Syntra Optimizer',
  description: 'Simple, one-time pricing. Buy the Self-Service license for $15 or book a Done-For-You expert session for $6. No subscriptions.',
  alternates: { canonical: 'https://www.syntraoptimizer.site/pricing' },
  openGraph: {
    title: 'Pricing — Syntra Optimizer',
    description: 'One-time license from $15. No subscriptions, no hidden fees.',
    url: 'https://www.syntraoptimizer.site/pricing',
  },
}

export default function PricingPage() {
  redirect('/#pricing')
}
