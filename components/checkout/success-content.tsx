'use client'

import { useRouter } from 'next/navigation'
import { CheckCircle2, Crown, Wrench } from 'lucide-react'

const PLANS = {
  premium: { name: 'Premium', icon: Crown },
  service: { name: 'Service', icon: Wrench },
}

interface SuccessContentProps {
  user: any
  plan: string
}

export function SuccessContent({ user, plan }: SuccessContentProps) {
  const router = useRouter()
  const selectedPlan = PLANS[plan as keyof typeof PLANS] || PLANS.premium
  const Icon = selectedPlan.icon

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4">
      <div
        className="w-full max-w-md rounded-3xl p-8 text-center"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <div
          className="mx-auto grid size-16 place-items-center rounded-full"
          style={{
            background: 'rgba(255,255,255,0.08)',
            boxShadow: '0 0 40px -10px rgba(255,255,255,0.3)',
          }}
        >
          <CheckCircle2 className="size-8" style={{ color: '#ffffff' }} />
        </div>

        <h1
          className="mt-6 text-2xl font-light tracking-tight"
          style={{ color: '#ffffff' }}
        >
          Payment Successful!
        </h1>
        <p className="mt-2 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
          Thank you, {user.email}
        </p>

        <div
          className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
          style={{
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.14)',
            color: 'rgba(255,255,255,0.85)',
          }}
        >
          <Icon className="size-4" />
          {selectedPlan.name} access activated
        </div>

        <button
          onClick={() => router.push('/dashboard')}
          className="mt-8 inline-flex h-11 w-full items-center justify-center rounded-full text-sm font-semibold transition-all duration-200 hover:-translate-y-px"
          style={{
            background: 'rgba(255,255,255,0.92)',
            color: '#080808',
            boxShadow: '0 0 28px -8px rgba(255,255,255,0.45)',
          }}
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  )
}
