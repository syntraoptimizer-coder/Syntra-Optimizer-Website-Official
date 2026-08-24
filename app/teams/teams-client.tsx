'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Users, CheckCircle2, ArrowRight, Lock, Loader2, Shield, Wrench, MessageSquare, Paintbrush, Code2, Video } from 'lucide-react'
import { Navbar } from '@/components/site/navbar'
import { createClient } from '@/lib/supabase/client'

const ROLES = [
  {
    id: 'moderator',
    icon: Shield,
    title: 'Moderator',
    desc: 'Help manage the community, answer questions, and keep discussions healthy.',
    skills: ['Communication', 'Patience', 'Available daily'],
  },
  {
    id: 'support',
    icon: Wrench,
    title: 'Support Agent',
    desc: 'Help users troubleshoot optimization issues and guide them through the app.',
    skills: ['PC knowledge', 'Windows expertise', 'Problem solving'],
  },
  {
    id: 'content',
    icon: Video,
    title: 'Content Creator',
    desc: 'Create tutorials, guides, and showcase videos about Syntra Optimizer.',
    skills: ['Video editing', 'Gaming audience', 'Creative'],
  },
  {
    id: 'designer',
    icon: Paintbrush,
    title: 'UI/UX Designer',
    desc: 'Help design future features and improve the visual experience of the app.',
    skills: ['Figma', 'Dark UI', 'Attention to detail'],
  },
  {
    id: 'developer',
    icon: Code2,
    title: 'Developer',
    desc: 'Contribute to the Electron app or web platform development.',
    skills: ['React / TypeScript', 'Electron', 'Windows APIs'],
  },
  {
    id: 'community',
    icon: MessageSquare,
    title: 'Community Manager',
    desc: 'Grow and animate the Discord community and social media presence.',
    skills: ['Discord', 'Social media', 'Organized'],
  },
]

interface Props {
  user: { id: string; email: string } | null
  existingApplication: { role: string; status: string; created_at: string } | null
}

export function TeamsClient({ user, existingApplication }: Props) {
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [message, setMessage] = useState('')
  const [discord, setDiscord] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleApply(e: React.FormEvent) {
    e.preventDefault()
    if (!user) return
    if (!selectedRole) { setErrorMsg('Please select a role.'); return }
    if (message.trim().length < 30) { setErrorMsg('Please write at least 30 characters in your message.'); return }
    if (!discord.trim()) { setErrorMsg('Please enter your Discord username.'); return }

    setStatus('loading')
    setErrorMsg('')

    const supabase = createClient()
    const { error } = await supabase.from('applications').insert({
      user_id: user.id,
      role: selectedRole,
      message: message.trim(),
      discord: discord.trim() || null,
    })

    if (error) {
      setStatus('error')
      setErrorMsg(error.message)
    } else {
      setStatus('success')
    }
  }

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg-page)' }}>

      {/* Glow */}
      <div aria-hidden="true" className="glow glow-blue" style={{
        position: 'fixed', top: '0%', left: '50%', width: 800, height: 500, opacity: 0.35, zIndex: 0,
      }} />

      {/* Same top bar as the landing page */}
      <Navbar />

      <main style={{ position: 'relative', zIndex: 10, maxWidth: 1040, margin: '0 auto', padding: '104px 16px 100px' }}>

        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <span className="s-tag" style={{ display: 'inline-flex', marginBottom: 20 }}>
            <span className="live-dot" />
            We're hiring
          </span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.06, marginBottom: 18, marginTop: 0 }}>
            <span style={{ color: 'var(--ink-2)' }}>Help us build</span><br />
            <span style={{ color: 'var(--ink-0)' }}>something great.</span>
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--ink-2)', lineHeight: 1.7, maxWidth: '50ch', marginInline: 'auto' }}>
            Syntra Optimizer is growing. We're looking for passionate people who love gaming, PC optimization, and building communities. Join us and shape the future of the product.
          </p>
        </div>

        {/* Open roles */}
        <div style={{ marginBottom: 72 }}>
          <div style={{ marginBottom: 24 }}>
            <span className="s-tag" style={{ display: 'inline-flex', marginBottom: 10 }}><Users style={{ width: 10, height: 10 }} />Open positions</span>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--ink-0)', margin: 0 }}>Choose your role</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 8 }}>
            {ROLES.map((role) => (
              <div
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className="s-card"
                style={{
                  padding: 20, cursor: 'pointer',
                  borderColor: selectedRole === role.id ? 'rgba(20,77,199,0.55)' : 'rgba(255,255,255,0.1)',
                  boxShadow: selectedRole === role.id ? '0 0 0 1px rgba(20,77,199,0.25), 0 12px 32px rgba(20,77,199,0.18)' : 'none',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                  position: 'relative',
                }}
              >
                {selectedRole === role.id && (
                  <div style={{ position: 'absolute', top: 12, right: 12 }}>
                    <CheckCircle2 style={{ width: 16, height: 16, color: 'var(--ink-0)' }} />
                  </div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: 6,
                    background: selectedRole === role.id ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)',
                    border: '1px solid var(--line)', display: 'grid', placeItems: 'center',
                    color: selectedRole === role.id ? 'var(--ink-0)' : 'var(--ink-2)',
                    transition: 'background 0.2s ease, color 0.2s ease',
                  }}>
                    <role.icon style={{ width: 15, height: 15 }} />
                  </div>
                  <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--ink-0)', margin: 0, letterSpacing: '-0.01em' }}>{role.title}</h3>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--ink-2)', lineHeight: 1.6, margin: '0 0 12px' }}>{role.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                  {role.skills.map(s => (
                    <span key={s} className="s-tag" style={{ fontSize: '0.6rem', color: 'var(--ink-3)' }}>{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Application form */}
        <div style={{ maxWidth: 640 }}>
          <div style={{ marginBottom: 24 }}>
            <span className="s-tag" style={{ display: 'inline-flex', marginBottom: 10 }}><ArrowRight style={{ width: 10, height: 10 }} />Apply</span>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--ink-0)', margin: 0 }}>Submit your application</h2>
          </div>

          {/* Already applied */}
          {existingApplication ? (
            <div className="s-card" style={{ padding: 28, textAlign: 'center' }}>
              <CheckCircle2 style={{ width: 36, height: 36, color: 'var(--ink-0)', margin: '0 auto 16px' }} />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--ink-0)', marginBottom: 8 }}>Application submitted</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--ink-2)', marginBottom: 16, lineHeight: 1.6 }}>
                You already applied for <strong style={{ color: 'var(--ink-0)' }}>{existingApplication.role}</strong>.
                Status: <span style={{ color: existingApplication.status === 'pending' ? 'rgba(253,224,71,0.8)' : 'rgba(134,239,172,0.8)', fontWeight: 600 }}>{existingApplication.status}</span>
              </p>
              <p style={{ fontSize: '0.75rem', color: 'var(--ink-3)' }}>We'll get back to you via email or Discord.</p>
            </div>
          ) : status === 'success' ? (
            <div className="s-card" style={{ padding: 28, textAlign: 'center' }}>
              <CheckCircle2 style={{ width: 36, height: 36, color: 'var(--ink-0)', margin: '0 auto 16px' }} />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--ink-0)', marginBottom: 8 }}>Application received!</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--ink-2)', lineHeight: 1.6 }}>
                Thanks for applying. We review all applications and will contact you via email or Discord within a few days.
              </p>
            </div>
          ) : !user ? (
            /* Not logged in */
            <div className="s-card" style={{ padding: 28, textAlign: 'center' }}>
              <Lock style={{ width: 32, height: 32, color: 'var(--ink-2)', margin: '0 auto 16px' }} />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--ink-0)', marginBottom: 8 }}>Sign in to apply</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--ink-2)', marginBottom: 24, lineHeight: 1.6 }}>
                You need a Syntra account to submit an application. It's free and takes 30 seconds.
              </p>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/login?next=/teams" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
                  Sign in
                </Link>
                <Link href="/register?next=/teams" className="btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
                  Create account
                </Link>
              </div>
            </div>
          ) : (
            /* Form */
            <form onSubmit={handleApply} className="s-card" style={{ padding: 28 }}>
              <div style={{ marginBottom: 20, padding: '10px 14px', background: 'var(--bg-2)', borderRadius: 4, border: '1px solid var(--line)', fontSize: '0.82rem', color: 'var(--ink-2)' }}>
                Applying as <strong style={{ color: 'var(--ink-0)' }}>{user.email}</strong>
              </div>

              {/* Selected role display */}
              {selectedRole && (
                <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: 'rgba(255,255,255,0.04)', borderRadius: 4, border: '1px solid rgba(255,255,255,0.15)' }}>
                  <CheckCircle2 style={{ width: 13, height: 13, color: 'var(--ink-0)', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.82rem', color: 'var(--ink-0)', fontWeight: 500 }}>
                    {ROLES.find(r => r.id === selectedRole)?.title}
                  </span>
                  <button type="button" onClick={() => setSelectedRole(null)} style={{ marginLeft: 'auto', fontSize: '0.72rem', color: 'var(--ink-3)', background: 'none', border: 'none', cursor: 'pointer' }}>Change</button>
                </div>
              )}

              {/* Message */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, color: 'var(--ink-1)', marginBottom: 8 }}>
                  Why do you want to join? *
                </label>
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Tell us about yourself, your experience, and why you want to join the Syntra team..."
                  rows={5}
                  style={{
                    width: '100%', padding: '10px 12px', borderRadius: 4,
                    background: 'var(--bg-2)', border: '1px solid var(--line)',
                    color: 'var(--ink-0)', fontSize: '0.875rem', lineHeight: 1.6,
                    resize: 'vertical', outline: 'none', fontFamily: 'inherit',
                  }}
                  onFocus={e => (e.target.style.borderColor = 'rgba(255,255,255,0.25)')}
                  onBlur={e => (e.target.style.borderColor = 'var(--line)')}
                />
                <p style={{ fontSize: '0.72rem', color: 'var(--ink-3)', marginTop: 5 }}>{message.length} / 500 characters</p>
              </div>

              {/* Discord */}
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, color: 'var(--ink-1)', marginBottom: 8 }}>
                  Discord username <span style={{ color: 'var(--ink-3)', fontWeight: 400 }}>*</span>
                </label>
                <input
                  type="text"
                  value={discord}
                  onChange={e => setDiscord(e.target.value)}
                  placeholder="e.g. @username"
                  style={{
                    width: '100%', padding: '10px 12px', borderRadius: 4,
                    background: 'var(--bg-2)', border: '1px solid var(--line)',
                    color: 'var(--ink-0)', fontSize: '0.875rem', outline: 'none', fontFamily: 'inherit',
                  }}
                  onFocus={e => (e.target.style.borderColor = 'rgba(255,255,255,0.25)')}
                  onBlur={e => (e.target.style.borderColor = 'var(--line)')}
                />
              </div>

              {errorMsg && (
                <p style={{ fontSize: '0.8rem', color: 'rgba(255,100,100,0.9)', marginBottom: 16, padding: '8px 12px', background: 'rgba(255,80,80,0.08)', borderRadius: 4, border: '1px solid rgba(255,80,80,0.2)' }}>
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary"
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
              >
                {status === 'loading' && <Loader2 style={{ width: 14, height: 14, animation: 'spin 1s linear infinite' }} />}
                {status === 'loading' ? 'Submitting…' : 'Submit Application'}
              </button>

              <p style={{ fontSize: '0.72rem', color: 'var(--ink-3)', marginTop: 12, textAlign: 'center', lineHeight: 1.5 }}>
                We review all applications within 3–5 business days and respond via email.
              </p>
            </form>
          )}
        </div>
      </main>

      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}
