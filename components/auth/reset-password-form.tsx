'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle2, Loader2, ArrowLeft, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { Field } from '@/components/auth/field'
import { createClient } from '@/lib/supabase/client'

type Errors = { password?: string; confirmPassword?: string; form?: string }

export function ResetPasswordForm() {
  const router = useRouter()
  const [values, setValues] = useState({ password: '', confirmPassword: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'no-session'>('idle')
  const [hasSession, setHasSession] = useState(false)

  useEffect(() => {
    const checkSession = async () => {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        setHasSession(true)
      } else {
        setStatus('no-session')
      }
    }
    checkSession()
  }, [])

  if (!hasSession && status === 'idle') {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="size-6 animate-spin" style={{ color: 'rgba(255,255,255,0.4)' }} />
      </div>
    )
  }

  function validate(): Errors {
    const next: Errors = {}
    if (!values.password) next.password = 'Password is required.'
    else if (values.password.length < 8) next.password = 'Password must be at least 8 characters.'
    if (!values.confirmPassword) next.confirmPassword = 'Please confirm your password.'
    else if (values.password !== values.confirmPassword) next.confirmPassword = 'Passwords do not match.'
    return next
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length > 0) return
    setStatus('submitting')
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password: values.password })
    if (error) {
      setStatus('idle')
      setErrors({ form: error.message })
      return
    }
    setStatus('success')
    setTimeout(() => router.push('/login'), 2000)
  }

  if (status === 'no-session') {
    return (
      <div className="space-y-6">
        <div
          className="rounded-2xl p-6 text-center"
          style={{ background: 'rgba(255,80,80,0.06)', border: '1px solid rgba(255,80,80,0.2)' }}
        >
          <AlertCircle className="mx-auto size-8" style={{ color: 'rgba(255,100,100,0.8)' }} />
          <h2 className="mt-3 font-medium" style={{ color: '#ffffff' }}>Invalid reset link</h2>
          <p className="mt-1 text-sm" style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 300 }}>
            This password reset link is invalid or has expired. Please request a new one.
          </p>
        </div>
        <Link
          href="/forgot-password"
          className="inline-flex items-center gap-2 text-sm transition-colors duration-200 hover:text-white"
          style={{ color: 'rgba(255,255,255,0.4)' }}
        >
          <ArrowLeft className="size-4" />
          Request new reset link
        </Link>
      </div>
    )
  }

  if (status === 'success') {
    return (
      <div className="space-y-6">
        <div
          className="rounded-2xl p-6 text-center"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <CheckCircle2 className="mx-auto size-8" style={{ color: 'rgba(255,255,255,0.8)' }} />
          <h2 className="mt-3 font-medium" style={{ color: '#ffffff' }}>Password updated</h2>
          <p className="mt-1 text-sm" style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 300 }}>
            Your password has been successfully reset. Redirecting you to sign in…
          </p>
        </div>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-sm transition-colors duration-200 hover:text-white"
          style={{ color: 'rgba(255,255,255,0.4)' }}
        >
          <ArrowLeft className="size-4" />
          Go to sign in
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
          label="New password"
          type="password"
          autoComplete="new-password"
          placeholder="••••••••"
          value={values.password}
          error={errors.password}
          onChange={(e) => setValues((v) => ({ ...v, password: e.target.value }))}
        />
        <Field
          label="Confirm password"
          type="password"
          autoComplete="new-password"
          placeholder="••••••••"
          value={values.confirmPassword}
          error={errors.confirmPassword}
          onChange={(e) => setValues((v) => ({ ...v, confirmPassword: e.target.value }))}
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full text-sm font-semibold transition-all duration-200 hover:-translate-y-px disabled:opacity-60"
          style={{ background: 'rgba(255,255,255,0.92)', color: '#080808', boxShadow: '0 0 28px -8px rgba(255,255,255,0.45)' }}
        >
          {status === 'submitting' && <Loader2 className="size-4 animate-spin" />}
          {status === 'submitting' ? 'Updating password…' : 'Update password'}
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
