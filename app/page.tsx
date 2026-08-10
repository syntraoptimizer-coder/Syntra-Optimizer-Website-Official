import { Navbar } from '@/components/site/navbar'
import { Hero } from '@/components/site/hero'
import { StatsBar } from '@/components/site/stats-bar'
import { Features } from '@/components/site/features'
import { AppShowcase } from '@/components/site/app-showcase'
import { Benchmarks } from '@/components/site/benchmarks'
import { Testimonials } from '@/components/site/testimonials'
import { SupportedGames } from '@/components/site/supported-games'
import { Pricing } from '@/components/site/pricing'
import { Faq } from '@/components/site/faq'
import { Cta } from '@/components/site/cta'
import { Footer } from '@/components/site/footer'
import { DevBanner } from '@/components/site/dev-banner'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Syntra Optimizer',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Windows 10, Windows 11',
  offers: [
    {
      '@type': 'Offer',
      price: '15',
      priceCurrency: 'USD',
      name: 'Self-Service License',
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

export default function HomePage() {
  return (
    <div className="min-h-dvh">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <Features />
        <AppShowcase />
        <Benchmarks />
        <SupportedGames />
        <Testimonials />
        <Pricing />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </div>
  )
}
