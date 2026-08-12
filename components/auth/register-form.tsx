'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { Field } from '@/components/auth/field'
import { OAuthButtons } from '@/components/auth/oauth-buttons'
import { createClient } from '@/lib/supabase/client'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
type Errors = { name?: string; email?: string; password?: string; confirm?: string; terms?: string; form?: string }

export function RegisterForm() {
  const router = useRouter()
  const [values, setValues] = useState({ name: '', email: '', password: '', confirm: '', terms: false })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')

  function validate(): Errors {
    const next: Errors = {}
    if (!values.name.trim()) next.name = 'Please enter your name.'
    if (!values.email) next.email = 'Email is required.'
    else if (!EMAIL_RE.test(values.email)) next.email = 'Enter a valid email address.'
    if (!values.password) next.password = 'Password is required.'
    else if (values.password.length < 8) next.password = 'Use at least 8 characters.'
    if (!values.confirm) next.confirm = 'Please confirm your password.'
    else if (values.confirm !== values.password) next.confirm = 'Passwords do not match.'
    if (!values.terms) next.terms = 'You must accept the terms to continue.'
    return next
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length > 0) return
    setStatus('submitting')
    const supabase = createClient()
    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: { data: { full_name: values.name } },
    })
    if (error) {
      setStatus('idle')
      if (error.message.toLowerCase().includes('already registered') || error.message.toLowerCase().includes('already exists')) {
        setErrors({ form: 'An account with this email already exists. Sign in instead.' })
      } else {
        setErrors({ form: error.message })
      }
      return
    }
    // If user exists but is unconfirmed, Supabase returns a fake success with no session
    if (!data.user || (data.user && !data.session && !data.user.identities?.length)) {
      setStatus('idle')
      setErrors({ form: 'An account with this email already exists. Sign in instead.' })
      return
    }
    if (data.user) {
      await supabase.from('profiles').upsert({ id: data.user.id, full_name: values.name.trim(), email: values.email })
    }
    setStatus('success')
    // With email confirmation ON, session is null — redirect after 3s anyway
    setTimeout(() => {
      router.push('/dashboard')
      router.refresh()
    }, 3000)
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center gap-6 py-8 text-center">
        {/* Animated checkmark */}
        <div
          className="grid size-16 place-items-center rounded-2xl"
          style={{
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.14)',
            boxShadow: '0 0 40px -10px rgba(255,255,255,0.3)',
            animation: 'fadeInScale 0.4s ease',
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <div>
          <h2
            className="text-xl font-light tracking-tight"
            style={{
              color: '#ffffff',
              letterSpacing: '-0.022em',
            }}
          >
            Welcome, {values.name.split(' ')[0]} 👋
          </h2>
          <p
            className="mt-2 text-sm font-light"
            style={{ color: 'rgba(255,255,255,0.42)' }}
          >
            Your account is ready. Taking you to your dashboard…
          </p>
        </div>

        {/* Progress bar */}
        <div
          className="w-32 overflow-hidden rounded-full"
          style={{ height: 2, background: 'rgba(255,255,255,0.08)' }}
        >
          <div
            style={{
              height: '100%',
              background: 'rgba(255,255,255,0.7)',
              borderRadius: 999,
              animation: 'progressBar 3s linear forwards',
            }}
          />
        </div>

        <style>{`
          @keyframes fadeInScale {
            from { opacity: 0; transform: scale(0.85); }
            to { opacity: 1; transform: scale(1); }
          }
          @keyframes progressBar {
            from { width: 0%; }
            to { width: 100%; }
          }
        `}</style>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <OAuthButtons />
      <div className="flex items-center gap-3">
        <span className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.08)' }} />
        <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>or sign up with email</span>
        <span className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.08)' }} />
      </div>
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {errors.form && (
          <div
            className="rounded-xl px-3.5 py-2.5 text-sm"
            style={{ background: 'rgba(255,80,80,0.08)', border: '1px solid rgba(255,80,80,0.2)', color: 'rgba(255,120,120,0.9)' }}
          >
            {errors.form}
            {errors.form.includes('already exists') && (
              <Link
                href="/login"
                className="ml-2 font-medium underline transition-colors hover:text-white"
                style={{ color: 'rgba(255,160,160,0.9)' }}
              >
                Sign in →
              </Link>
            )}
          </div>
        )}
        <Field label="Full name" autoComplete="name" placeholder="Alex Morgan"
          value={values.name} error={errors.name}
          onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))} />
        <Field label="Email" type="email" autoComplete="email" placeholder="you@example.com"
          value={values.email} error={errors.email}
          onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))} />
        <Field label="Password" type="password" autoComplete="new-password" placeholder="At least 8 characters"
          value={values.password} error={errors.password}
          onChange={(e) => setValues((v) => ({ ...v, password: e.target.value }))} />
        <Field label="Confirm password" type="password" autoComplete="new-password" placeholder="Re-enter your password"
          value={values.confirm} error={errors.confirm}
          onChange={(e) => setValues((v) => ({ ...v, confirm: e.target.value }))} />

        <div>
          <label className="flex items-start gap-2.5 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={values.terms}
              onChange={(e) => setValues((v) => ({ ...v, terms: e.target.checked }))}
              className="mt-0.5 size-4 shrink-0 rounded accent-white"
            />
            <span style={{ color: 'rgba(255,255,255,0.42)', fontWeight: 300 }}>
              I agree to the{' '}
              <Link href="/terms" className="transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.65)' }}>Terms</Link>
              {' '}and{' '}
              <Link href="/privacy" className="transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.65)' }}>Privacy Policy</Link>.
            </span>
          </label>
          {errors.terms && <p className="mt-1.5 text-xs" style={{ color: 'rgba(255,100,100,0.9)' }}>{errors.terms}</p>}
        </div>

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full text-sm font-semibold transition-all duration-200 hover:-translate-y-px disabled:opacity-60"
          style={{ background: 'rgba(255,255,255,0.92)', color: '#080808', boxShadow: '0 0 28px -8px rgba(255,255,255,0.45)' }}
        >
          {status === 'submitting' && <Loader2 className="size-4 animate-spin" />}
          {status === 'submitting' ? 'Creating account…' : 'Create account'}
        </button>
      </form>
      <p className="text-center text-sm" style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 300 }}>
        Already have an account?{' '}
        <Link href="/login" className="font-medium transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.7)' }}>
          Sign in
        </Link>
      </p>
    </div>
  )
}
