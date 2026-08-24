import { Suspense } from 'react'
import type { Metadata } from 'next'
import { AuthShell } from '@/components/auth/auth-shell'
import { ResetPasswordForm } from '@/components/auth/reset-password-form'

export const metadata: Metadata = {
  title: 'Reset Password — Syntra Optimizer',
  description: 'Set your new password for Syntra Optimizer.',
}

export default function ResetPasswordPage() {
  return (
    <AuthShell title="Reset password" subtitle="Enter your new password below.">
      <Suspense>
        <ResetPasswordForm />
      </Suspense>
    </AuthShell>
  )
}
