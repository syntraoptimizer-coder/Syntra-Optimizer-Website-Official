'use client'

import { useEffect, useState } from 'react'
import { Pricing } from '@/components/site/pricing'

export function PricingSlot() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted ? <Pricing /> : null
}
