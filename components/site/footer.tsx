'use client'

import Link from 'next/link'
import { Logo } from '@/components/site/logo'

const NAV = {
  Product: [
    { label: 'Features', href: '#features' },
    { label: 'Benchmarks', href: '#benchmarks' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Changelog', href: '/changelog' },
    { label: 'Teams', href: '/teams' },
  ],
  Resources: [
    { label: 'Download', href: '/checkout?plan=premium' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'FAQ', href: '#faq' },
  ],
  Company: [
    { label: 'About', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Contact', href: '#' },
    { label: 'Discord', href: 'https://discord.gg/syntra' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Refund Policy', href: '/refund-policy' },
  ],
}

function DiscordIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 16, height: 16 }} aria-hidden="true">
      <path d="M20.32 4.37A19.8 19.8 0 0 0 15.4 2.9a.07.07 0 0 0-.08.03c-.2.38-.44.87-.6 1.25a18.3 18.3 0 0 0-5.44 0c-.16-.39-.4-.87-.6-1.25a.08.08 0 0 0-.09-.03A19.7 19.7 0 0 0 3.68 4.37a.07.07 0 0 0-.03.03C.53 9.05-.32 13.58.1 18.06a.08.08 0 0 0 .03.05 19.9 19.9 0 0 0 6 3.03.08.08 0 0 0 .08-.03c.46-.63.87-1.29 1.23-1.99a.08.08 0 0 0-.04-.11 13.1 13.1 0 0 1-1.87-.89.08.08 0 0 1 0-.13l.37-.29a.07.07 0 0 1 .08-.01 14.2 14.2 0 0 0 12.06 0 .07.07 0 0 1 .08 0l.37.3a.08.08 0 0 1 0 .13c-.6.35-1.22.64-1.87.89a.08.08 0 0 0-.04.11c.36.7.78 1.36 1.23 1.99a.08.08 0 0 0 .08.03 19.8 19.8 0 0 0 6.01-3.03.08.08 0 0 0 .03-.05c.5-5.18-.84-9.67-3.54-13.66a.06.06 0 0 0-.03-.03ZM8.02 15.33c-1.18 0-2.16-1.08-2.16-2.42 0-1.33.96-2.42 2.16-2.42 1.21 0 2.18 1.1 2.16 2.42 0 1.34-.96 2.42-2.16 2.42Zm7.97 0c-1.18 0-2.16-1.08-2.16-2.42 0-1.33.96-2.42 2.16-2.42 1.21 0 2.18 1.1 2.16 2.42 0 1.34-.95 2.42-2.16 2.42Z" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 15, height: 15 }} aria-hidden="true">
      <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.66l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.01 4.13H5.05l12.03 15.64Z" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer style={{
      background: 'var(--bg-page)',
      borderTop: '1px solid rgba(255,255,255,0.08)',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '72px 24px 40px' }}>

        {/* Main grid */}
        <div style={{
          display: 'grid',
          gap: 48,
          gridTemplateColumns: '1.6fr 1fr 1fr 1fr',
        }}>
          {/* Brand column */}
          <div>
            <Logo />
            <p style={{
              marginTop: 16, fontSize: '0.875rem',
              lineHeight: 1.65, color: 'rgba(255,255,255,0.45)',
              maxWidth: '28ch', letterSpacing: '-0.02em',
            }}>
              PC optimization infrastructure for gamers and creators. Boost FPS, clean Windows, reduce latency — in one click.
            </p>
            {/* Social icons */}
            <div style={{ marginTop: 20, display: 'flex', gap: 8 }}>
              {[
                { label: 'Discord', Icon: DiscordIcon, href: 'https://discord.gg/syntra' },
                { label: 'X', Icon: XIcon, href: '#' },
              ].map(({ label, Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  style={{
                    width: 34, height: 34, borderRadius: 8,
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'grid', placeItems: 'center',
                    color: 'rgba(255,255,255,0.45)',
                    textDecoration: 'none',
                    background: 'rgba(255,255,255,0.03)',
                    transition: 'border-color 0.15s ease, color 0.15s ease, background 0.15s ease',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLAnchorElement
                    el.style.color = 'rgba(255,255,255,0.9)'
                    el.style.borderColor = 'rgba(20,77,199,0.5)'
                    el.style.background = 'rgba(20,77,199,0.1)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLAnchorElement
                    el.style.color = 'rgba(255,255,255,0.45)'
                    el.style.borderColor = 'rgba(255,255,255,0.1)'
                    el.style.background = 'rgba(255,255,255,0.03)'
                  }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(NAV).map(([heading, links]) => (
            <div key={heading}>
              <h3 style={{
                fontSize: '0.8rem', fontWeight: 500,
                letterSpacing: '-0.01em',
                color: 'rgba(255,255,255,0.85)',
                marginBottom: 18,
              }}>{heading}</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {links.map(l => (
                  <li key={l.label}>
                    {l.href.startsWith('http') ? (
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: '0.875rem',
                          color: 'rgba(255,255,255,0.45)',
                          textDecoration: 'none',
                          letterSpacing: '-0.02em',
                          transition: 'color 0.15s ease',
                        }}
                        onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#fff' }}
                        onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.45)' }}
                      >
                        {l.label}
                      </a>
                    ) : (
                      <Link
                        href={l.href}
                        style={{
                          fontSize: '0.875rem',
                          color: 'rgba(255,255,255,0.45)',
                          textDecoration: 'none',
                          letterSpacing: '-0.02em',
                          transition: 'color 0.15s ease',
                        }}
                        onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#fff' }}
                        onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.45)' }}
                      >
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{
          marginTop: 56,
          height: 1,
          background: 'rgba(255,255,255,0.07)',
        }} />

        {/* ── Giant Wordmark ── */}
        <div
          aria-hidden="true"
          style={{
            overflow: 'hidden',
            textAlign: 'center',
            margin: '40px -24px 0',
            lineHeight: 0.85,
            userSelect: 'none',
          }}
        >
          <span style={{
            fontFamily: "'Geist', 'Switzer', ui-sans-serif, sans-serif",
            fontSize: 'clamp(80px, 20vw, 260px)',
            fontWeight: 800,
            letterSpacing: '-0.06em',
            color: 'transparent',
            WebkitTextStroke: '1.5px rgba(255,255,255,0.05)',
            display: 'block',
            whiteSpace: 'nowrap',
          }}>
            SYNTRA
          </span>
        </div>

        {/* Copyright row */}
        <div style={{
          marginTop: 24,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 8,
        }}>
          <p style={{
            fontSize: '0.8rem',
            color: 'rgba(255,255,255,0.3)',
            letterSpacing: '-0.02em',
          }}>
            © {new Date().getFullYear()} Syntra Optimizer. All rights reserved.
          </p>
          <p style={{
            fontSize: '0.8rem',
            color: 'rgba(255,255,255,0.3)',
            letterSpacing: '-0.02em',
          }}>
            Built for Windows 10 &amp; 11.
          </p>
        </div>
      </div>
    </footer>
  )
}
