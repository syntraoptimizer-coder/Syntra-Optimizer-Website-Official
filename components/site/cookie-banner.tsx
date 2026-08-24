'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { getConsent, setConsent, hasConsented, type ConsentPayload } from '@/lib/cookies'

type View = 'banner' | 'detail' | 'hidden'

export function CookieBanner() {
  const [view, setView] = useState<View>('hidden')
  const [analytics, setAnalytics] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (!hasConsented()) {
      setView('banner')
    } else {
      const c = getConsent()
      if (c) setAnalytics(c.analytics)
    }
    const handler = () => {
      const c = getConsent()
      if (c) setAnalytics(c.analytics)
      setView('detail')
    }
    window.addEventListener('syntra:open-cookie-settings', handler)
    return () => window.removeEventListener('syntra:open-cookie-settings', handler)
  }, [])

  const save = useCallback((analyticsValue: boolean) => {
    const payload: ConsentPayload = setConsent(analyticsValue)
    if (payload.analytics) {
      const gaId = process.env.NEXT_PUBLIC_GA_ID
      if (gaId && !document.getElementById('ga-script')) {
        const s = document.createElement('script')
        s.id = 'ga-script'
        s.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
        s.async = true
        document.head.appendChild(s)
        const w = window as any // eslint-disable-line @typescript-eslint/no-explicit-any
        w.dataLayer = w.dataLayer || []
        w.gtag = function () { w.dataLayer.push(arguments) }
        w.gtag('js', new Date())
        w.gtag('config', gaId, { anonymize_ip: true })
      }
    } else {
      ;['_ga', '_gid'].forEach(n => {
        document.cookie = `${n}=; max-age=0; path=/`
        document.cookie = `${n}=; max-age=0; path=/; domain=.${location.hostname}`
      })
    }
    setView('hidden')
  }, [])

  const acceptAll  = useCallback(() => { setAnalytics(true);  save(true)  }, [save])
  const rejectAll  = useCallback(() => { setAnalytics(false); save(false) }, [save])
  const saveCustom = useCallback(() => save(analytics), [analytics, save])

  if (!mounted || view === 'hidden') return null

  const isDetail = view === 'detail'

  return (
    <>
      {/* Backdrop detail */}
      {isDetail && (
        <div
          aria-hidden="true"
          onClick={() => setView('hidden')}
          style={{
            position: 'fixed', inset: 0, zIndex: 9998,
            background: 'rgba(0,3,9,0.65)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            animation: 'sn-fade-in 0.18s ease',
          }}
        />
      )}

      <style>{`
        @keyframes sn-cookie-up {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes sn-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>

      {/* Card */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Cookie preferences"
        style={{
          position: 'fixed',
          zIndex: 9999,
          /* ── bas-gauche ── */
          bottom: 24,
          left: 24,
          width: 'min(92vw, 360px)',
          /* si detail → centré */
          ...(isDetail ? {
            bottom: '50%',
            left: '50%',
            transform: 'translate(-50%, 50%)',
            width: 'min(94vw, 440px)',
          } : {}),
          background: 'rgba(5, 10, 22, 0.97)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 18,
          overflow: 'hidden',
          boxShadow: '0 24px 60px -8px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.06)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          fontFamily: "'Geist', 'Switzer', ui-sans-serif, system-ui, sans-serif",
          animation: 'sn-cookie-up 0.24s cubic-bezier(0.2,0.8,0.2,1)',
        }}
      >
        {/* Blue accent top bar */}
        <div style={{
          height: 2,
          background: 'linear-gradient(90deg, transparent 0%, rgba(20,77,199,0.8) 40%, rgba(184,215,255,0.9) 60%, rgba(20,77,199,0.8) 80%, transparent 100%)',
        }} />

        <div style={{ padding: '18px 20px 20px' }}>

          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {/* Icon */}
              <div style={{
                width: 34, height: 34, borderRadius: 10, flexShrink: 0,
                background: 'rgba(20,77,199,0.16)',
                border: '1px solid rgba(20,77,199,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 17,
              }}>
                🍪
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700, color: '#fff', letterSpacing: '-0.04em' }}>
                  {isDetail ? 'Cookie preferences' : 'We use cookies'}
                </p>
                {!isDetail && (
                  <p style={{ margin: '3px 0 0', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '-0.02em' }}>
                    We keep it minimal.
                  </p>
                )}
              </div>
            </div>

            {isDetail && (
              <button
                onClick={() => setView('hidden')}
                aria-label="Close"
                style={{
                  flexShrink: 0, width: 28, height: 28, borderRadius: 7,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  cursor: 'pointer', color: 'rgba(255,255,255,0.4)',
                  fontSize: 16, lineHeight: 1,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background .15s, color .15s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)'
                  ;(e.currentTarget as HTMLElement).style.color = '#fff'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'
                  ;(e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.4)'
                }}
              >×</button>
            )}
          </div>

          {/* Banner body */}
          {!isDetail && (
            <p style={{
              margin: '0 0 16px',
              fontSize: '0.8rem', lineHeight: 1.6,
              color: 'rgba(255,255,255,0.45)',
              letterSpacing: '-0.02em',
            }}>
              Essential cookies keep the site running. Analytics help us improve it — your choice.{' '}
              <button
                onClick={() => setView('detail')}
                style={{
                  background: 'none', border: 'none', padding: 0,
                  color: '#b8d7ff', cursor: 'pointer',
                  fontSize: 'inherit', letterSpacing: 'inherit',
                  textDecoration: 'underline', textUnderlineOffset: 2,
                  fontFamily: 'inherit',
                }}
              >
                Customize
              </button>
            </p>
          )}

          {/* Category rows (detail only) */}
          {isDetail && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, margin: '0 0 16px' }}>
              <CategoryRow
                title="Necessary"
                description="Login, cart, site functionality — always required."
                enabled={true}
                locked={true}
                onToggle={() => {}}
              />
              <CategoryRow
                title="Analytics"
                description="Anonymised traffic data via Google Analytics."
                enabled={analytics}
                locked={false}
                onToggle={() => setAnalytics(v => !v)}
              />
            </div>
          )}

          {/* Buttons */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isDetail ? '1fr 1fr 1fr' : '1fr 1fr',
            gap: 7,
          }}>
            <Btn label="Reject" onClick={rejectAll} variant="ghost" />
            {isDetail && <Btn label="Save" onClick={saveCustom} variant="ghost" />}
            <Btn label="Accept all" onClick={acceptAll} variant="primary" />
          </div>

          {/* Footer */}
          <p style={{
            marginTop: 12, textAlign: 'center',
            fontSize: '0.68rem', color: 'rgba(255,255,255,0.2)',
          }}>
            <Link href="/politique-cookies" style={{ color: 'rgba(255,255,255,0.28)', textDecoration: 'underline', textUnderlineOffset: 2 }}>
              Cookie policy
            </Link>
            {' · '}
            <Link href="/privacy" style={{ color: 'rgba(255,255,255,0.28)', textDecoration: 'underline', textUnderlineOffset: 2 }}>
              Privacy
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

/* ─── CategoryRow ───────────────────────────────────────────────── */
function CategoryRow({ title, description, enabled, locked, onToggle }: {
  title: string; description: string; enabled: boolean; locked: boolean; onToggle: () => void
}) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14,
      padding: '12px 14px',
      background: 'rgba(255,255,255,0.03)',
      border: `1px solid ${enabled && !locked ? 'rgba(20,77,199,0.3)' : 'rgba(255,255,255,0.07)'}`,
      borderRadius: 12,
      transition: 'border-color .2s',
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 2 }}>
          <p style={{ margin: 0, fontSize: '0.84rem', fontWeight: 600, color: '#fff', letterSpacing: '-0.03em' }}>
            {title}
          </p>
          {locked && (
            <span style={{
              fontSize: '0.58rem', fontWeight: 600,
              color: '#b8d7ff',
              background: 'rgba(20,77,199,0.2)',
              border: '1px solid rgba(20,77,199,0.32)',
              borderRadius: 4, padding: '1px 6px',
              letterSpacing: '0.04em', textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}>Always on</span>
          )}
        </div>
        <p style={{ margin: 0, fontSize: '0.75rem', color: 'rgba(255,255,255,0.36)', letterSpacing: '-0.02em', lineHeight: 1.5 }}>
          {description}
        </p>
      </div>

      {/* Toggle */}
      <button
        role="switch"
        aria-checked={enabled}
        disabled={locked}
        onClick={onToggle}
        style={{
          flexShrink: 0,
          width: 40, height: 22, borderRadius: 11,
          background: enabled ? '#144dc7' : 'rgba(255,255,255,0.08)',
          border: `1px solid ${enabled ? 'rgba(20,77,199,0.7)' : 'rgba(255,255,255,0.12)'}`,
          cursor: locked ? 'default' : 'pointer',
          position: 'relative',
          transition: 'background .2s, border-color .2s',
          opacity: locked ? 0.42 : 1,
        }}
      >
        <span style={{
          position: 'absolute',
          top: 2, left: enabled ? 20 : 2,
          width: 16, height: 16, borderRadius: '50%',
          background: '#fff',
          boxShadow: '0 1px 4px rgba(0,0,0,0.35)',
          transition: 'left .18s cubic-bezier(.4,0,.2,1)',
        }} />
      </button>
    </div>
  )
}

/* ─── Btn ───────────────────────────────────────────────────────── */
function Btn({ label, onClick, variant }: { label: string; onClick: () => void; variant: 'primary' | 'ghost' }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '9px 12px',
        borderRadius: 9,
        fontSize: '0.82rem', fontWeight: 600,
        letterSpacing: '-0.03em',
        cursor: 'pointer', border: '1px solid',
        fontFamily: 'inherit',
        whiteSpace: 'nowrap',
        transition: 'transform .12s, filter .12s',
        ...(variant === 'primary' ? {
          background: '#fff', color: '#000309', borderColor: 'transparent',
          boxShadow: 'rgba(255,255,255,0.85) 0px 1px 0px inset, 0 3px 14px -4px rgba(255,255,255,0.3)',
        } : {
          background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.6)', borderColor: 'rgba(255,255,255,0.1)',
        }),
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.filter = 'brightness(1.1)'
        el.style.transform = 'translateY(-1px)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.filter = 'none'
        el.style.transform = 'none'
      }}
    >
      {label}
    </button>
  )
}
