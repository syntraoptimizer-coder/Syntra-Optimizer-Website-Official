import { Suspense } from 'react'
import type { Metadata } from 'next'
import { AuthShell } from '@/components/auth/auth-shell'
import { LoginForm } from '@/components/auth/login-form'

export const metadata: Metadata = {
  title: 'Sign In — Syntra Optimizer',
  description: 'Sign in to your Syntra Optimizer account. Access your dashboard, downloads, and optimization tools.',
  robots: { index: false },
}

export default function LoginPage() {
  return (
    <AuthShell title="Welcome back" subtitle="Sign in to keep your PC running at its best.">
      <Suspense>
        <LoginForm />
      </Suspense>
    </AuthShell>
  )
}
