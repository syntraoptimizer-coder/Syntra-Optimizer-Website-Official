'use client'

import { useEffect, useState } from 'react'
import { Pricing } from '@/components/site/pricing'
import type { PublicLaunchPricing } from '@/components/site/launch-price'

export function PricingSlot({ initialPricing }: { initialPricing?: PublicLaunchPricing }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted ? <Pricing initialPricing={initialPricing} /> : null
}
