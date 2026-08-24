import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import Script from 'next/script'
import { cookies } from 'next/headers'
import './globals.css'
import { LenisProvider } from '@/components/site/lenis-provider'
import { NoContextMenu } from '@/components/site/no-context-menu'
import { CookieBanner } from '@/components/site/cookie-banner'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
  preload: false,
})

// Switzer is not on Google Fonts — we load it via @font-face in globals.css (fontshare CDN)

const BASE_URL = 'https://www.syntraoptimizer.site'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Syntra Optimizer — Optimize your PC. Instantly.',
    template: '%s | Syntra Optimizer',
  },
  description:
    'Boost your Windows 10/11 with one click. Auto fixes, debloating, network tuning & game optimizer. Higher FPS, faster boots, cleaner system.',
  keywords: [
    'PC optimizer',
    'Windows optimizer',
    'FPS boost',
    'PC debloat',
    'Windows 10 optimizer',
    'Windows 11 optimizer',
    'game optimizer',
    'boost PC performance',
    'reduce ping',
    'Syntra Optimizer',
  ],
  authors: [{ name: 'Syntra Optimizer', url: BASE_URL }],
  creator: 'Syntra Optimizer',
  publisher: 'Syntra Optimizer',
  category: 'Software',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'Syntra Optimizer',
    title: 'Syntra Optimizer — Optimize your PC. Instantly.',
    description:
      'Boost FPS, cut boot times & clean your Windows PC in one click. Trusted by 100+ gamers.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Syntra Optimizer — Optimize Your PC With Syntra Optimizer.',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Syntra Optimizer — Optimize your PC. Instantly.',
    description:
      'Boost FPS, cut boot times, and clean your Windows PC in one click.',
    images: ['/og-image.png'],
    creator: '@syntraoptimizer',
  },
  icons: {
    icon: [{ url: '/syntra-logo.png', type: 'image/png' }],
    apple: '/syntra-logo.png',
    shortcut: '/syntra-logo.png',
  },
  manifest: '/site.webmanifest',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#080808',
  width: 'device-width',
  initialScale: 1,
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

/**
 * Read syntra_consent from the request cookies server-side.
 * Returns true only if analytics consent was explicitly granted.
 * Never loads GA before consent — not even on first render.
 */
async function getAnalyticsConsent(): Promise<boolean> {
  try {
    const cookieStore = await cookies()
    const raw = cookieStore.get('syntra_consent')?.value
    if (!raw) return false
    const parsed = JSON.parse(raw)
    return parsed?.analytics === true
  } catch {
    return false
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const analyticsAllowed = await getAnalyticsConsent()

  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable} bg-background`} style={{ fontFamily: 'var(--font-inter), ui-sans-serif, system-ui, sans-serif' }}>
      <body className="font-sans antialiased">
        {/*
          Google Analytics — loaded ONLY if:
          1. A GA_ID env var is set
          2. The user has explicitly accepted analytics in syntra_consent
          CNIL requirement: no tracking before consent, not even a ping.
        */}
        {analyticsAllowed && GA_ID && (
          <>
            <Script
              id="ga-script"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { anonymize_ip: true });
              `}
            </Script>
          </>
        )}

        <NoContextMenu />
        <LenisProvider />
        {children}

        {/* Cookie consent banner — shown client-side if no consent cookie found */}
        <CookieBanner />

        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
