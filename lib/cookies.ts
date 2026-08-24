/**
 * lib/cookies.ts
 * Typed helpers for every Syntra cookie.
 *
 * Server-side (Route Handlers, Server Actions, middleware):
 *   import { cookies } from 'next/headers'
 *   Use the raw Next.js cookies() API — these helpers are for client-side only.
 *
 * Client-side (browser document.cookie):
 *   All helpers below work in 'use client' components.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export type ConsentPayload = {
  necessary: true        // always true, cannot be disabled
  analytics: boolean
  version: number        // bump when cookie categories change
  timestamp: number      // unix ms
}

// ─── Low-level helpers ────────────────────────────────────────────────────────

function getClientCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie
    .split('; ')
    .find(row => row.startsWith(`${name}=`))
  return match ? decodeURIComponent(match.split('=').slice(1).join('=')) : null
}

function setClientCookie(
  name: string,
  value: string,
  options: {
    maxAge?: number          // seconds; omit for session cookie
    sameSite?: 'strict' | 'lax' | 'none'
    path?: string
    secure?: boolean
  } = {}
) {
  if (typeof document === 'undefined') return
  const parts: string[] = [`${name}=${encodeURIComponent(value)}`]
  if (options.maxAge !== undefined) parts.push(`max-age=${options.maxAge}`)
  parts.push(`path=${options.path ?? '/'}`)
  parts.push(`samesite=${options.sameSite ?? 'lax'}`)
  if (options.secure ?? location.protocol === 'https:') parts.push('secure')
  document.cookie = parts.join('; ')
}

function deleteClientCookie(name: string) {
  setClientCookie(name, '', { maxAge: 0 })
}

// ─── COOKIE NAMES ─────────────────────────────────────────────────────────────

export const COOKIE_NAMES = {
  consent:       'syntra_consent',
  lang:          'syntra_lang',
  cart:          'syntra_cart',
  serviceSpec:   'syntra_service_spec',
  contactDraft:  'syntra_contact_draft',
  // syntra_session is httpOnly — set only from the server, never accessible here
} as const

// ─── CONSENT ──────────────────────────────────────────────────────────────────

const CONSENT_VERSION = 1
const CONSENT_MAX_AGE = 60 * 60 * 24 * 180 // 6 months in seconds

export function getConsent(): ConsentPayload | null {
  const raw = getClientCookie(COOKIE_NAMES.consent)
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as ConsentPayload
    // Invalidate stale consent versions
    if (parsed.version !== CONSENT_VERSION) return null
    return parsed
  } catch {
    return null
  }
}

export function setConsent(analytics: boolean): ConsentPayload {
  const payload: ConsentPayload = {
    necessary: true,
    analytics,
    version: CONSENT_VERSION,
    timestamp: Date.now(),
  }
  setClientCookie(COOKIE_NAMES.consent, JSON.stringify(payload), {
    maxAge: CONSENT_MAX_AGE,
    sameSite: 'lax',
  })
  return payload
}

export function hasConsented(): boolean {
  return getConsent() !== null
}

export function hasAnalyticsConsent(): boolean {
  return getConsent()?.analytics === true
}

export function revokeConsent(): void {
  deleteClientCookie(COOKIE_NAMES.consent)
}

// ─── LANG ─────────────────────────────────────────────────────────────────────

export function getLang(): string | null {
  return getClientCookie(COOKIE_NAMES.lang)
}

export function setLang(lang: string): void {
  // No max-age = persists until user clears cookies (browser default)
  setClientCookie(COOKIE_NAMES.lang, lang, { sameSite: 'lax' })
}

// ─── CART ─────────────────────────────────────────────────────────────────────

export type CartPayload = {
  plan: string
  addons?: string[]
}

export function getCart(): CartPayload | null {
  const raw = getClientCookie(COOKIE_NAMES.cart)
  if (!raw) return null
  try { return JSON.parse(raw) as CartPayload } catch { return null }
}

export function setCart(cart: CartPayload): void {
  setClientCookie(COOKIE_NAMES.cart, JSON.stringify(cart), { sameSite: 'lax' })
}

export function clearCart(): void {
  deleteClientCookie(COOKIE_NAMES.cart)
}

// ─── SERVICE SPEC ─────────────────────────────────────────────────────────────

export type ServiceSpec = {
  cpu?: string
  gpu?: string
  ram?: string
  os?: string
  games?: string[]
  notes?: string
}

export function getServiceSpec(): ServiceSpec | null {
  const raw = getClientCookie(COOKIE_NAMES.serviceSpec)
  if (!raw) return null
  try { return JSON.parse(raw) as ServiceSpec } catch { return null }
}

export function setServiceSpec(spec: ServiceSpec): void {
  setClientCookie(COOKIE_NAMES.serviceSpec, JSON.stringify(spec), { sameSite: 'lax' })
}

export function clearServiceSpec(): void {
  deleteClientCookie(COOKIE_NAMES.serviceSpec)
}

// ─── CONTACT DRAFT ────────────────────────────────────────────────────────────

export type ContactDraft = {
  subject?: string
  message?: string
  email?: string
}

export function getContactDraft(): ContactDraft | null {
  const raw = getClientCookie(COOKIE_NAMES.contactDraft)
  if (!raw) return null
  try { return JSON.parse(raw) as ContactDraft } catch { return null }
}

/**
 * Session cookie — no max-age, deleted when the browser tab closes.
 */
export function setContactDraft(draft: ContactDraft): void {
  setClientCookie(COOKIE_NAMES.contactDraft, JSON.stringify(draft), {
    sameSite: 'lax',
    // maxAge intentionally omitted → session cookie
  })
}

export function clearContactDraft(): void {
  deleteClientCookie(COOKIE_NAMES.contactDraft)
}

// ─── SERVER-SIDE SESSION (reference, set only from API routes) ─────────────────
// syntra_session is httpOnly + secure — it cannot be read/written from JS.
// Set it from a Route Handler like this:
//
//   import { cookies } from 'next/headers'
//
//   const cookieStore = await cookies()
//   cookieStore.set('syntra_session', token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     sameSite: 'lax',
//     maxAge: 60 * 60 * 24 * 30, // 30 days
//     path: '/',
//   })
