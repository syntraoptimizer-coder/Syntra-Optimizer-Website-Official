import type { Metadata } from 'next'
import Link from 'next/link'
import { CookieSettingsButton } from '@/components/site/cookie-settings-button'
import { Footer } from '@/components/site/footer'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'List of cookies used by Syntra Optimizer and how to manage them.',
  robots: { index: true, follow: true },
}

/* ─── Data ───────────────────────────────────────────────────────────────────── */

type CookieRow = {
  name: string
  category: 'Necessary' | 'Analytics'
  provider: string
  purpose: string
  type: 'HTTP (httpOnly)' | 'Browser'
  duration: string
}

const COOKIES: CookieRow[] = [
  {
    name: 'syntra_session',
    category: 'Necessary',
    provider: 'Syntra Optimizer',
    purpose: 'Keeps the user authenticated between page loads. Set server-side only (httpOnly).',
    type: 'HTTP (httpOnly)',
    duration: '30 days',
  },
  {
    name: 'syntra_consent',
    category: 'Necessary',
    provider: 'Syntra Optimizer',
    purpose: "Stores the user's cookie consent choices so the banner isn't shown on every visit.",
    type: 'Browser',
    duration: '6 months',
  },
  {
    name: 'syntra_lang',
    category: 'Necessary',
    provider: 'Syntra Optimizer',
    purpose: 'Remembers the language selected by the user.',
    type: 'Browser',
    duration: 'Until cleared',
  },
  {
    name: 'syntra_cart',
    category: 'Necessary',
    provider: 'Syntra Optimizer',
    purpose: 'Persists the selected plan / add-ons across navigation before checkout.',
    type: 'Browser',
    duration: 'Until cleared',
  },
  {
    name: 'syntra_service_spec',
    category: 'Necessary',
    provider: 'Syntra Optimizer',
    purpose: 'Saves PC specs entered in the booking form so the user doesn\'t have to re-enter them.',
    type: 'Browser',
    duration: 'Until cleared',
  },
  {
    name: 'syntra_contact_draft',
    category: 'Necessary',
    provider: 'Syntra Optimizer',
    purpose: 'Saves a draft contact message so it survives accidental page refresh.',
    type: 'Browser',
    duration: 'Session (tab close)',
  },
  {
    name: '_ga',
    category: 'Analytics',
    provider: 'Google Analytics',
    purpose: 'Registers a unique ID to generate statistical data on site usage.',
    type: 'Browser',
    duration: '2 years',
  },
  {
    name: '_ga_XXXX',
    category: 'Analytics',
    provider: 'Google Analytics',
    purpose: 'Stores and counts pageviews for a specific GA4 property.',
    type: 'Browser',
    duration: '2 years',
  },
]

const CATEGORY_META: Record<string, { color: string; bg: string; border: string; desc: string }> = {
  Necessary: {
    color: '#b8d7ff',
    bg: 'rgba(20,77,199,0.12)',
    border: 'rgba(20,77,199,0.3)',
    desc: 'Always active. These cookies are required for the site to work and cannot be disabled.',
  },
  Analytics: {
    color: '#a4ffe2',
    bg: 'rgba(0,180,120,0.1)',
    border: 'rgba(0,180,120,0.25)',
    desc: 'Only loaded after you give consent. They help us understand how the site is used.',
  },
}

/* ─── Component ─────────────────────────────────────────────────────────────── */

export default function PolitiqueCookiesPage() {
  const necessary = COOKIES.filter(c => c.category === 'Necessary')
  const analytics = COOKIES.filter(c => c.category === 'Analytics')

  return (
    <main className="cookie-page">
      <div className="cookie-page__aurora" aria-hidden="true" />
      <div className="cookie-page__shell">
        <Link href="/" className="cookie-page__back">
          <span aria-hidden="true">←</span> Back to home
        </Link>

        <div className="cookie-page__hero">
          <div className="cookie-page__eyebrow"><span /> Legal & privacy</div>
          <div className="cookie-page__hero-row">
            <div>
              <h1>Cookie Policy</h1>
              <p>Clear information about the cookies Syntra uses, why they exist, and how you stay in control of your choices.</p>
            </div>
            <div className="cookie-page__status"><span /> Your choices matter</div>
          </div>
        </div>

        <div className="cookie-page__intro">
          <p>This page lists every cookie Syntra Optimizer may place on your device, what it does, and how long it lasts.</p>
          <CookieSettingsButton />
        </div>

        {/* Tables by category */}
        {[
          { label: 'Necessary cookies', rows: necessary },
          { label: 'Analytics cookies', rows: analytics },
        ].map(({ label, rows }) => {
          const cat = rows[0]?.category ?? 'Necessary'
          const meta = CATEGORY_META[cat]
          return (
            <section key={label} className="cookie-section">
              <div className="cookie-section__head">
                <div>
                  <h2>{label}</h2>
                  <p>{meta.desc}</p>
                </div>
                <span className="cookie-section__badge" style={{ color: meta.color, background: meta.bg, borderColor: meta.border }}>
                  {cat === 'Necessary' ? 'Always active' : 'Consent required'}
                </span>
              </div>

              <div className="cookie-table-wrap">
                <table className="cookie-table">
                  <thead>
                    <tr style={{
                      borderBottom: '1px solid rgba(255,255,255,0.07)',
                      background: 'rgba(255,255,255,0.02)',
                    }}>
                      {['Cookie', 'Provider', 'Purpose', 'Type', 'Duration'].map(h => (
                        <th key={h}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, i) => (
                      <tr
                        key={row.name}
                        style={{
                          borderBottom: i < rows.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                        }}
                      >
                        <td><code style={{ color: meta.color, background: meta.bg }}>{row.name}</code></td>
                        <td className="cookie-table__muted cookie-table__nowrap">{row.provider}</td>
                        <td className="cookie-table__purpose">{row.purpose}</td>
                        <td className="cookie-table__muted cookie-table__nowrap cookie-table__small">{row.type}</td>
                        <td className="cookie-table__muted cookie-table__nowrap">{row.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )
        })}

        <footer className="cookie-page__footer">
          <p>
            Last updated {new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}. For questions, visit our{' '}
            <Link href="/contact">contact page</Link> or review our <Link href="/privacy">Privacy Policy</Link>.
          </p>
        </footer>
      </div>
    </main>
    <Footer />
  )
}
