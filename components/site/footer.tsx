'use client'

import Link from 'next/link'
import { Logo } from '@/components/site/logo'

const NAV = {
  Product:  [{ label: 'Features', href: '#features' }, { label: 'Benchmarks', href: '#benchmarks' }, { label: 'Pricing', href: '#pricing' }, { label: 'Changelog', href: '/changelog' }, { label: 'Teams', href: '/teams' }, { label: 'Download', href: '/checkout?plan=premium' }],
  Community: [{ label: 'Discord', href: '#' }, { label: 'Teams', href: '/teams' }, { label: 'Support', href: '#' }],
  Company:  [{ label: 'About', href: '#' }, { label: 'Blog', href: '#' }, { label: 'Contact', href: '#' }],
  Legal:    [{ label: 'Privacy', href: '/privacy' }, { label: 'Terms', href: '/terms' }, { label: 'Refund Policy', href: '/refund-policy' }],
}

function DiscordIcon() {
  return <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 15, height: 15 }} aria-hidden="true"><path d="M20.32 4.37A19.8 19.8 0 0 0 15.4 2.9a.07.07 0 0 0-.08.03c-.2.38-.44.87-.6 1.25a18.3 18.3 0 0 0-5.44 0c-.16-.39-.4-.87-.6-1.25a.08.08 0 0 0-.09-.03A19.7 19.7 0 0 0 3.68 4.37a.07.07 0 0 0-.03.03C.53 9.05-.32 13.58.1 18.06a.08.08 0 0 0 .03.05 19.9 19.9 0 0 0 6 3.03.08.08 0 0 0 .08-.03c.46-.63.87-1.29 1.23-1.99a.08.08 0 0 0-.04-.11 13.1 13.1 0 0 1-1.87-.89.08.08 0 0 1 0-.13l.37-.29a.07.07 0 0 1 .08-.01 14.2 14.2 0 0 0 12.06 0 .07.07 0 0 1 .08 0l.37.3a.08.08 0 0 1 0 .13c-.6.35-1.22.64-1.87.89a.08.08 0 0 0-.04.11c.36.7.78 1.36 1.23 1.99a.08.08 0 0 0 .08.03 19.8 19.8 0 0 0 6.01-3.03.08.08 0 0 0 .03-.05c.5-5.18-.84-9.67-3.54-13.66a.06.06 0 0 0-.03-.03ZM8.02 15.33c-1.18 0-2.16-1.08-2.16-2.42 0-1.33.96-2.42 2.16-2.42 1.21 0 2.18 1.1 2.16 2.42 0 1.34-.96 2.42-2.16 2.42Zm7.97 0c-1.18 0-2.16-1.08-2.16-2.42 0-1.33.96-2.42 2.16-2.42 1.21 0 2.18 1.1 2.16 2.42 0 1.34-.95 2.42-2.16 2.42Z" /></svg>
}
function XIcon() {
  return <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 14, height: 14 }} aria-hidden="true"><path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.66l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.01 4.13H5.05l12.03 15.64Z" /></svg>
}

export function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--line)' }}>
      <div style={{ maxWidth: 1088, margin: '0 auto', padding: '64px 24px 40px' }}>
        <div style={{ display: 'grid', gap: 40, gridTemplateColumns: '1.4fr 1fr 1fr 1fr 1fr' }}>
          <div>
            <Logo />
            <p style={{ marginTop: 14, fontSize: '0.82rem', lineHeight: 1.6, color: 'var(--ink-3)', maxWidth: '28ch' }}>
              Optimize your PC. Instantly. Higher FPS, faster boots, cleaner Windows.
            </p>
            <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
              {[{ label: 'Discord', Icon: DiscordIcon, href: 'https://discord.gg/syntra' }, { label: 'X', Icon: XIcon, href: '#' }].map(({ label, Icon, href }) => (
                <a key={label} href={href} aria-label={label} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined} style={{
                  width: 32, height: 32, borderRadius: 4,
                  border: '1px solid var(--line)', display: 'grid', placeItems: 'center',
                  color: 'var(--ink-3)', textDecoration: 'none',
                  transition: 'border-color 0.15s ease, color 0.15s ease',
                }}>
                  <Icon />
                </a>
              ))}
            </div>
          </div>
          {Object.entries(NAV).map(([heading, links]) => (
            <div key={heading}>
              <h3 style={{ fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 16, fontFamily: 'ui-monospace, monospace' }}>{heading}</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {links.map(l => (
                  <li key={l.label}>
                    {l.href.startsWith('http') ? (
                      <a href={l.href} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.83rem', color: 'var(--ink-3)', textDecoration: 'none' }}>
                        {l.label}
                      </a>
                    ) : (
                      <Link href={l.href} style={{ fontSize: '0.83rem', color: 'var(--ink-3)', textDecoration: 'none' }}>
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 48, paddingTop: 20, borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--ink-3)' }}>© {new Date().getFullYear()} Syntra Optimizer. All rights reserved.</p>
          <p style={{ fontSize: '0.75rem', color: 'var(--ink-3)' }}>Made for Windows 10 &amp; 11.</p>
        </div>
      </div>
    </footer>
  )
}
