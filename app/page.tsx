import { SpanPage } from '@/components/span/span-page'
import { SpanEnhance } from '@/components/span/span-enhance'
import { getLaunchPricing } from '@/lib/pricing'

export default async function HomePage() {
  const launchPricing = await getLaunchPricing()
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Syntra Optimizer',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Windows 10, Windows 11',
    offers: [
      {
        '@type': 'Offer',
        price: (launchPricing.activePriceCents / 100).toFixed(2),
        priceCurrency: 'USD',
        name: launchPricing.enabled ? 'Self-Service License — Launch pricing' : 'Self-Service License',
      },
      {
        '@type': 'Offer',
        price: '6',
        priceCurrency: 'USD',
        name: 'Done-For-You Session',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '100',
      bestRating: '5',
    },
    url: 'https://www.syntraoptimizer.site',
    description: 'Boost your Windows 10/11 PC with one click. Auto fixes, debloating, network tuning & game optimizer.',
  }

  return (
    <div className="min-h-dvh">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SpanPage initialPricing={launchPricing} />
      <SpanEnhance />
    </div>
  )
}
