'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Download, PackageCheck, User, Crown, Wrench, Settings, LayoutDashboard } from 'lucide-react'
import { TabBar } from '@/components/ui/tab-bar'
import { UpdateTimeline, type UpdateItem } from '@/components/dashboard/update-timeline'
import { AccountSettings } from '@/components/dashboard/account-settings'

const TABS = [
  { id: 'overview',  label: 'Overview',  icon: LayoutDashboard },
  { id: 'downloads', label: 'Downloads', icon: Download },
  { id: 'settings',  label: 'Settings',  icon: Settings },
] as const

function formatDate(date: string | null) {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

interface Props {
  user: any
  name: string
  email: string
  role: 'free' | 'premium'
  serviceCount: number
  initials: string
  updates: UpdateItem[]
}

export function DashboardTabs({ user, name, email, role, serviceCount, initials, updates }: Props) {
  const [tab, setTab] = useState<'overview' | 'downloads' | 'settings'>('overview')

  const hasPremium = role === 'premium' || serviceCount > 0

  const Badges = () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
      {role === 'premium' && (
        <span className="s-tag" style={{ gap: 5 }}>
          <Crown style={{ width: 10, height: 10 }} />Premium
        </span>
      )}
      {serviceCount > 0 && (
        <span className="s-tag" style={{ gap: 5, color: '#8ab4ff' }}>
          <Wrench style={{ width: 10, height: 10 }} />
          {serviceCount > 1 ? `Service x${serviceCount}` : 'Service'}
        </span>
      )}
      {role === 'free' && serviceCount === 0 && (
        <span className="s-tag" style={{ color: 'var(--ink-3)' }}>Free</span>
      )}
    </div>
  )

  return (
    <div>
      <TabBar
        tabs={TABS}
        activeTab={tab}
        onChange={(id) => setTab(id as typeof tab)}
        style={{ marginBottom: 32 }}
      />

      {/* ── OVERVIEW ── */}
      {tab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 16, alignItems: 'start' }}>

          {/* Updates */}
          <div className="s-card" style={{ padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div style={{ width: 30, height: 30, borderRadius: 4, background: 'rgba(255,255,255,0.06)', border: '1px solid var(--line)', display: 'grid', placeItems: 'center', color: 'var(--ink-1)' }}>
                <PackageCheck style={{ width: 14, height: 14 }} />
              </div>
              <h2 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ink-0)', letterSpacing: '-0.01em' }}>Syntra Optimizer Updates</h2>
            </div>
            <UpdateTimeline updates={updates} />
          </div>

          {/* Profile sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div className="s-card" style={{ padding: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div style={{ width: 30, height: 30, borderRadius: 4, background: 'rgba(255,255,255,0.06)', border: '1px solid var(--line)', display: 'grid', placeItems: 'center', color: 'var(--ink-1)' }}>
                  <User style={{ width: 14, height: 14 }} />
                </div>
                <h2 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ink-0)', letterSpacing: '-0.01em' }}>Profile</h2>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 6, flexShrink: 0,
                  background: 'rgba(255,255,255,0.08)', border: '1px solid var(--line)',
                  display: 'grid', placeItems: 'center',
                  fontSize: '0.78rem', fontWeight: 700, color: 'var(--ink-1)',
                }}>{initials || 'SY'}</div>
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ink-0)', letterSpacing: '-0.01em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--ink-3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{email}</p>
                </div>
              </div>
              <Badges />
              <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { label: 'Member since', value: formatDate(user.created_at) },
                  { label: 'Email verified', value: user.email_confirmed_at ? 'Yes' : 'No' },
                ].map(r => (
                  <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                    <span style={{ color: 'var(--ink-3)' }}>{r.label}</span>
                    <span style={{ color: 'var(--ink-1)' }}>{r.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick download */}
            {hasPremium ? (
              <a href="/api/download" className="btn-primary" style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
                <Download style={{ width: 13, height: 13 }} />Download v1.1.1
              </a>
            ) : (
              <Link href="/checkout?plan=premium" className="btn-primary" style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
                <Crown style={{ width: 13, height: 13 }} />Get Premium
              </Link>
            )}
          </div>
        </div>
      )}

      {/* ── DOWNLOADS ── */}
      {tab === 'downloads' && (
        <div style={{ maxWidth: 560 }}>
          <div className="s-card" style={{ padding: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
              <div style={{ width: 30, height: 30, borderRadius: 4, background: 'rgba(255,255,255,0.06)', border: '1px solid var(--line)', display: 'grid', placeItems: 'center', color: 'var(--ink-1)' }}>
                <Download style={{ width: 14, height: 14 }} />
              </div>
              <h2 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ink-0)', letterSpacing: '-0.01em' }}>Syntra Optimizer</h2>
            </div>

            {!hasPremium ? (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <p style={{ fontSize: '0.875rem', color: 'var(--ink-2)', marginBottom: 20 }}>
                  Purchase a license to download Syntra Optimizer.
                </p>
                <Link href="/checkout?plan=premium" className="btn-primary" style={{ display: 'inline-flex', gap: 7 }}>
                  <Crown style={{ width: 13, height: 13 }} />Get Premium
                </Link>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: 20, padding: 16, background: 'var(--bg-2)', borderRadius: 4, border: '1px solid var(--line)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontSize: '0.83rem', fontWeight: 600, color: 'var(--ink-0)' }}>Syntra Optimizer Setup</span>
                    <span className="s-tag" style={{ fontSize: '0.62rem' }}>Latest</span>
                  </div>
                  <div style={{ display: 'flex', gap: 16, fontSize: '0.75rem', color: 'var(--ink-3)', marginBottom: 16 }}>
                    <span>v1.1.1</span>
                    <span>Windows 10/11</span>
                    <span>105 MB</span>
                  </div>
                  <a href="/api/download" className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, width: '100%' }}>
                    <Download style={{ width: 13, height: 13 }} />Download
                  </a>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--ink-3)', lineHeight: 1.5 }}>
                  Your download is protected and linked to your account. Do not share this link.
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── SETTINGS ── */}
      {tab === 'settings' && (
        <div style={{ maxWidth: 560, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <AccountSettings />
        </div>
      )}
    </div>
  )
}
