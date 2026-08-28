'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { Field } from '@/components/auth/field'
import { OAuthButtons } from '@/components/auth/oauth-buttons'
import { createClient } from '@/lib/supabase/client'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
type Errors = { email?: string; password?: string; form?: string }

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [values, setValues] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')

  function validate(): Errors {
    const next: Errors = {}
    if (!values.email) next.email = 'Email is required.'
    else if (!EMAIL_RE.test(values.email)) next.email = 'Enter a valid email address.'
    if (!values.password) next.password = 'Password is required.'
    return next
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length > 0) return
    setStatus('submitting')
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    })
    if (error) {
      setStatus('idle')
      setErrors({ form: error.message })
      return
    }
    // The browser client persists the Supabase session in cookies/local storage.
    // Give the server a fresh request so middleware and server components see it.
    router.push(searchParams.get('next') || '/dashboard')
  }

  if (status === 'success') {
    return (
      <div
        className="rounded-2xl p-6 text-center"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}
      >
        <CheckCircle2 className="mx-auto size-8" style={{ color: 'rgba(255,255,255,0.8)' }} />
        <h2 className="mt-3 font-medium" style={{ color: '#ffffff' }}>You're signed in</h2>
        <p className="mt-1 text-sm" style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 300 }}>
          Welcome back. Redirecting you to your dashboard…
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <OAuthButtons />

      <div className="flex items-center gap-3">
        <span className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.08)' }} />
        <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>or continue with email</span>
        <span className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.08)' }} />
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {errors.form && (
          <p
            className="rounded-xl px-3.5 py-2.5 text-sm"
            style={{ background: 'rgba(255,80,80,0.08)', border: '1px solid rgba(255,80,80,0.2)', color: 'rgba(255,120,120,0.9)' }}
          >
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
        <Field
          label="Password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          value={values.password}
          error={errors.password}
          onChange={(e) => setValues((v) => ({ ...v, password: e.target.value }))}
          labelAction={
            <Link
              href="/forgot-password"
              className="text-xs transition-colors duration-200 hover:text-white"
              style={{ color: 'rgba(255,255,255,0.4)' }}
            >
              Forgot password?
            </Link>
          }
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="btn-primary"
          style={{ width: '100%', height: 44 }}
        >
          {status === 'submitting' && <Loader2 className="size-4 animate-spin" />}
          {status === 'submitting' ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      <p className="text-center text-sm" style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 300 }}>
        Don't have an account?{' '}
        <Link
          href="/register"
          className="font-medium transition-colors duration-200 hover:text-white"
          style={{ color: 'rgba(255,255,255,0.7)' }}
        >
          Create one
        </Link>
      </p>
    </div>
  )
}
