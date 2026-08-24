import type { Metadata } from 'next'
import { AuthShell } from '@/components/auth/auth-shell'
import { RegisterForm } from '@/components/auth/register-form'

export const metadata: Metadata = {
  title: 'Create Account — Syntra Optimizer',
  description: 'Create your free Syntra Optimizer account. Get started in seconds and optimize your Windows PC today.',
  robots: { index: false },
}

export default function RegisterPage() {
  return (
    <AuthShell
      title="Create your account"
      subtitle="Get started in seconds — optimize your PC or book an expert."
    >
      <RegisterForm />
    </AuthShell>
  )
}
