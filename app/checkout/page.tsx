import type { Metadata } from 'next'
import { Suspense } from 'react'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { CheckoutForm } from '@/components/checkout/checkout-form'

export const metadata: Metadata = {
  title: 'Checkout — Syntra Optimizer',
  description: 'Complete your Syntra Optimizer purchase. One-time payment, instant access.',
  robots: { index: false },
}

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>
}) {
  const params = await searchParams
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?next=/checkout?plan=' + (params.plan || 'premium'))
  }

  const plan = params.plan || 'premium'

  return (
    <div className="min-h-dvh">
      <Suspense fallback={<div className="flex items-center justify-center py-20" style={{ color: 'rgba(255,255,255,0.4)' }}>Loading...</div>}>
        <CheckoutForm user={user} plan={plan} />
      </Suspense>
    </div>
  )
}
