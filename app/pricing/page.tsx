import type { Metadata } from 'next'
import { AppChrome } from '@/components/site/app-chrome'
import { Pricing } from '@/components/site/pricing'
import { getLaunchPricing } from '@/lib/pricing'

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

export default async function PricingPage() {
  const launchPricing = await getLaunchPricing()

  return (
    <AppChrome crumb="pricing">
      <Pricing initialPricing={launchPricing} />
    </AppChrome>
  )
}
