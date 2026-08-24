'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, Loader2, ArrowLeft } from 'lucide-react'
import { Field } from '@/components/auth/field'
import { createClient } from '@/lib/supabase/client'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
type Errors = { email?: string; form?: string }

export function ForgotPasswordForm() {
  const [values, setValues] = useState({ email: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')

  function validate(): Errors {
    const next: Errors = {}
    if (!values.email) next.email = 'Email is required.'
    else if (!EMAIL_RE.test(values.email)) next.email = 'Enter a valid email address.'
    return next
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length > 0) return
    setStatus('submitting')
    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
      redirectTo: `${window.location.origin}/auth/callback?type=recovery`,
    })
    if (error) {
      setStatus('idle')
      setErrors({ form: error.message })
      return
    }
    setStatus('success')
  }

  if (status === 'success') {
    return (
      <div className="space-y-6">
        <div
          className="rounded-2xl p-6 text-center"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <CheckCircle2 className="mx-auto size-8" style={{ color: 'rgba(255,255,255,0.8)' }} />
          <h2 className="mt-3 font-medium" style={{ color: '#ffffff' }}>Check your email</h2>
          <p className="mt-1 text-sm" style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 300 }}>
            We sent a reset link to <span style={{ color: 'rgba(255,255,255,0.7)' }}>{values.email}</span>. Click the link to reset your password.
          </p>
        </div>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-sm transition-colors duration-200 hover:text-white"
          style={{ color: 'rgba(255,255,255,0.4)' }}
        >
          <ArrowLeft className="size-4" />
          Back to sign in
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {errors.form && (
          <p className="rounded-xl px-3.5 py-2.5 text-sm"
            style={{ background: 'rgba(255,80,80,0.08)', border: '1px solid rgba(255,80,80,0.2)', color: 'rgba(255,120,120,0.9)' }}>
            {errors.form}
          </p>
        )}
        <Field
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={values.email}
          error={errors.email}
          onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full text-sm font-semibold transition-all duration-200 hover:-translate-y-px disabled:opacity-60"
          style={{ background: 'rgba(255,255,255,0.92)', color: '#080808', boxShadow: '0 0 28px -8px rgba(255,255,255,0.45)' }}
        >
          {status === 'submitting' && <Loader2 className="size-4 animate-spin" />}
          {status === 'submitting' ? 'Sending reset link…' : 'Send reset link'}
        </button>
      </form>
      <Link
        href="/login"
        className="inline-flex items-center gap-2 text-sm transition-colors duration-200 hover:text-white"
        style={{ color: 'rgba(255,255,255,0.4)' }}
      >
        <ArrowLeft className="size-4" />
        Back to sign in
      </Link>
    </div>
  )
}
