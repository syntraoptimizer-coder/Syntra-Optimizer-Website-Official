import { createClient } from '@/lib/supabase/server'

export type LaunchPricing = {
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

const DEFAULT_PRICING: LaunchPricing = {
  enabled: true,
  standardPriceCents: 1500,
  launchPriceCents: 1125,
  activePriceCents: 1125,
  label: 'Launch pricing',
  threshold: 100,
  salesCount: 0,
  showProgress: false,
  discountPercent: 25,
}

function asRecord(value: unknown): Record<string, unknown> {
  if (typeof value === 'object' && value !== null) return value as Record<string, unknown>
  return {}
}

function asNumber(value: unknown, fallback: number) {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback
}

export async function getLaunchPricing(): Promise<LaunchPricing> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('settings')
      .select('value')
      .eq('key', 'launch_promo')
      .maybeSingle()

    if (error || !data) return DEFAULT_PRICING

    const value = asRecord(data.value)
    const enabled = value.enabled !== false
    const standardPriceCents = Math.max(1, Math.round(asNumber(value.standard_price_cents, DEFAULT_PRICING.standardPriceCents)))
    const launchPriceCents = Math.max(1, Math.round(asNumber(value.launch_price_cents, DEFAULT_PRICING.launchPriceCents)))
    const threshold = Math.max(1, Math.round(asNumber(value.threshold, DEFAULT_PRICING.threshold)))
    const salesCount = Math.max(0, Math.round(asNumber(value.sales_count, 0)))
    const showProgress = value.show_progress === true
    const promoActive = enabled && salesCount < threshold
    const discountPercent = Math.max(0, Math.round((1 - launchPriceCents / standardPriceCents) * 100))

    return {
      enabled: promoActive,
      standardPriceCents,
      launchPriceCents,
      activePriceCents: promoActive ? launchPriceCents : standardPriceCents,
      label: typeof value.label === 'string' && value.label.trim() ? value.label : DEFAULT_PRICING.label,
      threshold,
      salesCount,
      showProgress,
      discountPercent,
    }
  } catch {
    return DEFAULT_PRICING
  }
}

export function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2).replace(/\.00$/, '')}`
}
