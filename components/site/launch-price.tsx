'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export type PublicLaunchPricing = {
  enabled: boolean
  standardPriceCents: number
  launchPriceCents: number
  activePriceCents: number
  label: string
  threshold: number
  salesCount: number
  showProgress: boolean
  discountPercent: number
}

const FALLBACK: PublicLaunchPricing = {
  enabled: true,
  standardPriceCents: 1500,
  launchPriceCents: 1125,
  activePriceCents: 1125,
  label: 'Early access offer',
  threshold: 100,
  salesCount: 0,
  showProgress: false,
  discountPercent: 25,
}

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2).replace(/\.00$/, '')}`
}

function PriceMarkup({ pricing, compact = false, card = false }: { pricing: PublicLaunchPricing; compact?: boolean; card?: boolean }) {
  const activePrice = formatPrice(pricing.activePriceCents)
  const standardPrice = formatPrice(pricing.standardPriceCents)

  return (
    <div
      className={`sn-launch-price${compact ? ' sn-launch-price--compact' : ''}${card ? ' sn-launch-price--card' : ''}`}
      aria-label={pricing.enabled ? `${activePrice} launch price, normally ${standardPrice}` : `${activePrice}`}
    >
      <div className="sn-launch-price-row">
        {pricing.enabled && <span className="sn-launch-price-old">{standardPrice}</span>}
        <span className="sn-launch-price-current">{activePrice}</span>
        {pricing.enabled && <span className="sn-launch-price-badge">{pricing.label} · -{pricing.discountPercent}%</span>}
      </div>
      {pricing.enabled && (
        <p className="sn-launch-price-note">
          Price increases as Syntra reaches more early access users.
          {pricing.showProgress && ` ${pricing.salesCount}/${pricing.threshold} joined.`}
        </p>
      )}
    </div>
  )
}

export function LaunchPrice({ compact = false, card = false, hero = false, initialPricing }: { compact?: boolean; card?: boolean; hero?: boolean; initialPricing?: PublicLaunchPricing }) {
  const [pricing, setPricing] = useState<PublicLaunchPricing>(initialPricing ?? FALLBACK)
  const [heroTarget, setHeroTarget] = useState<HTMLElement | null>(null)

  useEffect(() => {
    let active = true
    fetch('/api/pricing', { cache: 'no-store' })
      .then(response => response.ok ? response.json() : null)
      .then(data => {
        if (active && data?.pricing) setPricing(data.pricing)
      })
      .catch(() => undefined)
    return () => { active = false }
  }, [])

  useEffect(() => {
    if (!hero) return
    const heroSection = document.getElementById('general-content-hero-section')
    if (!heroSection) return
    const target = document.createElement('div')
    target.id = 'syntra-launch-price-hero'
    heroSection.appendChild(target)
    setHeroTarget(target)
    return () => target.remove()
  }, [hero])

  const markup = <PriceMarkup pricing={pricing} compact={compact} card={card} />
  if (hero) return heroTarget ? createPortal(markup, heroTarget) : null
  return markup
}
