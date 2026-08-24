'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { CheckCircle2, Crown, Wrench, Loader2 } from 'lucide-react'

const PLANS = {
  premium: { name: 'Premium', icon: Crown, badge: 'Premium' },
  service: { name: 'Service', icon: Wrench, badge: 'Service' },
}

interface ReturnContentProps {
  user: any
  plan: string
}

export function ReturnContent({ user, plan }: ReturnContentProps) {
  const router = useRouter()
  const [isVerifying, setIsVerifying] = useState(true)
  const [hasAccess, setHasAccess] = useState(false)
  const supabase = createClient()

  const selectedPlan = plan === 'service' ? PLANS.service : PLANS.premium
  const Icon = selectedPlan.icon

  useEffect(() => {
    // Poll Supabase for up to 15s waiting for the webhook to update the role
    let attempts = 0
    const maxAttempts = 10

    const check = async () => {
      attempts++
      const { data } = await supabase
        .from('user_roles')
        .select('role, service_count')
        .eq('user_id', user.id)
        .maybeSingle()

      const isPremium = data?.role === 'premium'
      const hasService = (data?.service_count || 0) > 0
      const isConfirmed = plan === 'service' ? hasService : isPremium

      if (isConfirmed) {
        setHasAccess(true)
        setIsVerifying(false)
        return
      }

      if (attempts >= maxAttempts) {
        // Webhook may be delayed — still show success, role will update shortly
        setHasAccess(true)
        setIsVerifying(false)
        return
      }

      setTimeout(check, 1500)
    }

    check()
  }, [user.id, plan, supabase])

  if (isVerifying) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-6 px-4 text-center">
        <Loader2
          className="size-12 animate-spin"
          style={{ color: 'rgba(255,255,255,0.6)' }}
        />
        <h1
          className="text-2xl font-light tracking-tight"
          style={{ color: 'rgba(255,255,255,0.85)' }}
        >
          Confirming your payment…
        </h1>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.38)' }}>
          This usually takes a few seconds.
        </p>
      </div>
    )
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4">
      <div
        className="w-full max-w-md rounded-3xl p-8 text-center"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        {/* Success icon */}
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

        {/* Plan badge */}
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

        <p
          className="mt-4 text-xs leading-relaxed"
          style={{ color: 'rgba(255,255,255,0.35)' }}
        >
          Your account has been upgraded. You can now access all {selectedPlan.name} features.
        </p>

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
