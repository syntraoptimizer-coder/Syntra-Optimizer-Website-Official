'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Download, PackageCheck, User, Crown, Wrench, Settings, LayoutDashboard, CheckCircle2, Clock } from 'lucide-react'
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

/* ── Reusable section card ── */
function SCard({ title, icon: Icon, children, style }: { title: string; icon: React.ElementType; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div className="s-card" style={{ padding: 24, ...style }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid var(--line)' }}>
        <div style={{
          width: 28, height: 28, borderRadius: 4,
          background: 'rgba(255,255,255,0.06)', border: '1px solid var(--line)',
          display: 'grid', placeItems: 'center', color: 'var(--ink-2)', flexShrink: 0,
        }}>
          <Icon style={{ width: 13, height: 13 }} />
        </div>
        <h2 style={{ fontSize: '0.83rem', fontWeight: 600, color: 'var(--ink-1)', letterSpacing: '-0.01em', margin: 0 }}>{title}</h2>
      </div>
      {children}
    </div>
  )
}

export function DashboardTabs({ user, name, email, role, serviceCount, initials, updates }: Props) {
  const [tab, setTab] = useState<'overview' | 'downloads' | 'settings'>('overview')
  const hasPremium = role === 'premium' || serviceCount > 0

  const Badges = () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
      {role === 'premium' && <span className="s-tag" style={{ gap: 5 }}><Crown style={{ width: 10, height: 10 }} />Premium</span>}
      {serviceCount > 0 && <span className="s-tag" style={{ gap: 5, color: '#8ab4ff' }}><Wrench style={{ width: 10, height: 10 }} />{serviceCount} session{serviceCount > 1 ? 's' : ''} purchased</span>}
      {role === 'free' && serviceCount === 0 && <span className="s-tag" style={{ color: 'var(--ink-3)' }}>Free</span>}
    </div>
  )

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <TabBar tabs={TABS} activeTab={tab} onChange={id => setTab(id as typeof tab)} />
      </div>

      {/* ── OVERVIEW ── */}
      {tab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 12, alignItems: 'start' }}>

          {/* Left — Updates */}
          {updates.length > 0 && (
            <SCard title="Syntra Optimizer Updates" icon={PackageCheck}>
              <UpdateTimeline updates={updates} />
            </SCard>
          )}

          {/* Right sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

            {/* Profile card */}
            <SCard title="Your Profile" icon={User}>
              {/* Avatar + name */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 6, flexShrink: 0,
                  background: 'var(--bg-2)', border: '1px solid var(--line)',
                  display: 'grid', placeItems: 'center',
                  fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink-1)',
                  letterSpacing: '-0.01em',
                }}>{initials || 'SY'}</div>
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ink-0)', letterSpacing: '-0.01em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: 2 }}>{name}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--ink-3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{email}</p>
                </div>
              </div>

              {/* Badges */}
              <Badges />

              {/* Meta */}
              <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 9 }}>
                {[
                  { icon: Clock, label: 'Member since', value: formatDate(user.created_at) },
                  { icon: CheckCircle2, label: 'Email verified', value: user.email_confirmed_at ? 'Yes' : 'No' },
                ].map(r => (
                  <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem' }}>
                    <span style={{ color: 'var(--ink-3)', display: 'flex', alignItems: 'center', gap: 5 }}>
                      <r.icon style={{ width: 11, height: 11 }} />{r.label}
                    </span>
                    <span style={{ color: 'var(--ink-1)', fontWeight: 500 }}>{r.value}</span>
                  </div>
                ))}
              </div>
            </SCard>

            {/* Download card */}
            <SCard title="Download" icon={Download}>
              {hasPremium ? (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <div>
                      <p style={{ fontSize: '0.83rem', fontWeight: 600, color: 'var(--ink-0)', marginBottom: 3 }}>v1.1.1</p>
                      <p style={{ fontSize: '0.72rem', color: 'var(--ink-3)' }}>Windows 10/11 · 105 MB</p>
                    </div>
                    <span className="s-tag" style={{ fontSize: '0.6rem' }}>Latest</span>
                  </div>
                  <a href="/api/download" className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, width: '100%' }}>
                    <Download style={{ width: 13, height: 13 }} />Download
                  </a>
                </div>
              ) : (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <div>
                      <p style={{ fontSize: '0.83rem', fontWeight: 600, color: 'var(--ink-0)', marginBottom: 3 }}>v1.1.1 (Free)</p>
                      <p style={{ fontSize: '0.72rem', color: 'var(--ink-3)' }}>Windows 10/11 · 105 MB</p>
                    </div>
                    <span className="s-tag" style={{ fontSize: '0.6rem', color: 'var(--ink-3)' }}>Free</span>
                  </div>
                  <a href="https://release-assets.githubusercontent.com/github-production-release-asset/1349544478/b5853f38-9f77-46df-88f4-7fe84e201ba5?sp=r&sv=2018-11-09&sr=b&spr=https&se=2026-08-28T13%3A18%3A52Z&rscd=attachment%3B+filename%3DSyntra-Optimizer-Setup-1.1.1.exe&rsct=application%2Foctet-stream&skoid=96c2d410-5711-43a1-aedd-ab1947aa7ab0&sktid=398a6654-997b-47e9-b12b-9515b896b4de&skt=2026-08-28T12%3A17%3A58Z&ske=2026-08-28T13%3A18%3A52Z&sks=b&skv=2018-11-09&sig=TsqaFbljyqaTP58g6rx5M43C6j9ZTSu0Fp6IotYFJdo%3D&jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmVsZWFzZWFzc2V0cHJvZHVjdGlvbi5ibG9iLmNvcmUud2luZG93cy5uZXQifQ.bww-afs8bmtsWdL5hnG8ahV8f773ri4X8vDDdwcaBVk&response-content-disposition=attachment%3B%20filename%3DSyntra-Optimizer-Setup-1.1.1.exe&response-content-type=application%2Foctet-stream" className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, width: '100%' }}>
                    <Download style={{ width: 13, height: 13 }} />Download Free
                  </a>
                  <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--line)' }}>
                    <p style={{ fontSize: '0.78rem', color: 'var(--ink-2)', lineHeight: 1.5, marginBottom: 10 }}>
                      Upgrade to Premium for full access to all features.
                    </p>
                    <Link href="/checkout?plan=premium" className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, width: '100%', fontSize: '0.78rem' }}>
                      <Crown style={{ width: 12, height: 12 }} />Get Premium — $15
                    </Link>
                  </div>
                </div>
              )}
            </SCard>

            {/* Done-For-You service card */}
            <SCard title="Done-For-You Service" icon={Wrench}>
              <div>
                <p style={{ fontSize: '0.82rem', color: 'var(--ink-2)', lineHeight: 1.55, marginBottom: 14 }}>
                  {serviceCount > 0
                    ? `You've purchased ${serviceCount} session${serviceCount > 1 ? 's' : ''}. Book another expert optimization session for maximum performance.`
                    : 'Get expert optimization done for you. We\'ll remotely configure your PC for maximum performance.'}
                </p>
                <Link href="/checkout?plan=service" className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
                  <Wrench style={{ width: 13, height: 13 }} />{serviceCount > 0 ? 'Book another session' : 'Book a session'}
                </Link>
              </div>
            </SCard>
          </div>
        </div>
      )}

      {/* ── DOWNLOADS ── */}
      {tab === 'downloads' && (
        <div style={{ maxWidth: 600 }}>
          <SCard title="Syntra Optimizer" icon={Download}>
            {/* Free version */}
            <div style={{ padding: '16px 0', borderBottom: '1px solid var(--line)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 16, alignItems: 'center' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ink-0)' }}>Syntra Optimizer (Free)</span>
                    <span className="s-tag" style={{ fontSize: '0.6rem', color: 'var(--ink-3)' }}>Free</span>
                  </div>
                  <div style={{ display: 'flex', gap: 14, fontSize: '0.75rem', color: 'var(--ink-3)' }}>
                    <span>v1.1.1</span>
                    <span>·</span>
                    <span>Windows 10 / 11</span>
                    <span>·</span>
                    <span>105 MB</span>
                  </div>
                </div>
                <a href="https://release-assets.githubusercontent.com/github-production-release-asset/1349544478/b5853f38-9f77-46df-88f4-7fe84e201ba5?sp=r&sv=2018-11-09&sr=b&spr=https&se=2026-08-28T13%3A18%3A52Z&rscd=attachment%3B+filename%3DSyntra-Optimizer-Setup-1.1.1.exe&rsct=application%2Foctet-stream&skoid=96c2d410-5711-43a1-aedd-ab1947aa7ab0&sktid=398a6654-997b-47e9-b12b-9515b896b4de&skt=2026-08-28T12%3A17%3A58Z&ske=2026-08-28T13%3A18%3A52Z&sks=b&skv=2018-11-09&sig=TsqaFbljyqaTP58g6rx5M43C6j9ZTSu0Fp6IotYFJdo%3D&jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmVsZWFzZWFzc2V0cHJvZHVjdGlvbi5ibG9iLmNvcmUud2luZG93cy5uZXQifQ.bww-afs8bmtsWdL5hnG8ahV8f773ri4X8vDDdwcaBVk&response-content-disposition=attachment%3B%20filename%3DSyntra-Optimizer-Setup-1.1.1.exe&response-content-type=application%2Foctet-stream" className="btn-primary" style={{ display: 'inline-flex', gap: 7, whiteSpace: 'nowrap' }}>
                  <Download style={{ width: 13, height: 13 }} />Download
                </a>
              </div>
            </div>

            {/* Premium version */}
            {hasPremium ? (
              <div style={{ padding: '16px 0' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 16, alignItems: 'center' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ink-0)' }}>Syntra Optimizer (Premium)</span>
                      <span className="s-tag" style={{ fontSize: '0.6rem', color: 'var(--ink-1)' }}>Latest</span>
                    </div>
                    <div style={{ display: 'flex', gap: 14, fontSize: '0.75rem', color: 'var(--ink-3)' }}>
                      <span>v1.1.1</span>
                      <span>·</span>
                      <span>Windows 10 / 11</span>
                      <span>·</span>
                      <span>105 MB</span>
                    </div>
                  </div>
                  <a href="/api/download" className="btn-primary" style={{ display: 'inline-flex', gap: 7, whiteSpace: 'nowrap' }}>
                    <Download style={{ width: 13, height: 13 }} />Download
                  </a>
                </div>
                <p style={{ marginTop: 14, fontSize: '0.75rem', color: 'var(--ink-3)', lineHeight: 1.55 }}>
                  Your premium download is secured and tied to your account. Do not share the link.
                </p>
              </div>
            ) : (
              <div style={{ padding: '16px 0', textAlign: 'center' }}>
                <p style={{ fontSize: '0.875rem', color: 'var(--ink-2)', marginBottom: 16, lineHeight: 1.55 }}>
                  Purchase a Self-Service license to unlock the premium version with all features.
                </p>
                <Link href="/checkout?plan=premium" className="btn-primary" style={{ display: 'inline-flex', gap: 7 }}>
                  <Crown style={{ width: 13, height: 13 }} />Get Premium — $15
                </Link>
              </div>
            )}
          </SCard>
        </div>
      )}

      {/* ── SETTINGS ── */}
      {tab === 'settings' && (
        <div style={{ maxWidth: 600 }}>
          <AccountSettings />
        </div>
      )}
    </div>
  )
}
