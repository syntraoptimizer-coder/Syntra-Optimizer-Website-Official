'use client'

import { useState, useEffect } from 'react'
import { KeyRound, Loader2, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

function DiscordIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5" aria-hidden="true">
      <path d="M20.32 4.37A19.8 19.8 0 0 0 15.4 2.9a.07.07 0 0 0-.08.03c-.2.38-.44.87-.6 1.25a18.3 18.3 0 0 0-5.44 0c-.16-.39-.4-.87-.6-1.25a.08.08 0 0 0-.09-.03A19.7 19.7 0 0 0 3.68 4.37a.07.07 0 0 0-.03.03C.53 9.05-.32 13.58.1 18.06a.08.08 0 0 0 .03.05 19.9 19.9 0 0 0 6 3.03.08.08 0 0 0 .08-.03c.46-.63.87-1.29 1.23-1.99a.08.08 0 0 0-.04-.11 13.1 13.1 0 0 1-1.87-.89.08.08 0 0 1 0-.13l.37-.29a.07.07 0 0 1 .08-.01 14.2 14.2 0 0 0 12.06 0 .07.07 0 0 1 .08 0l.37.3a.08.08 0 0 1 0 .13c-.6.35-1.22.64-1.87.89a.08.08 0 0 0-.04.11c.36.7.78 1.36 1.23 1.99a.08.08 0 0 0 .08.03 19.8 19.8 0 0 0 6.01-3.03.08.08 0 0 0 .03-.05c.5-5.18-.84-9.67-3.54-13.66a.06.06 0 0 0-.03-.03ZM8.02 15.33c-1.18 0-2.16-1.08-2.16-2.42 0-1.33.96-2.42 2.16-2.42 1.21 0 2.18 1.1 2.16 2.42 0 1.34-.96 2.42-2.16 2.42Zm7.97 0c-1.18 0-2.16-1.08-2.16-2.42 0-1.33.96-2.42 2.16-2.42 1.21 0 2.18 1.1 2.16 2.42 0 1.34-.95 2.42-2.16 2.42Z" />
    </svg>
  )
}

export function AccountSettings() {
  const [open, setOpen] = useState(false)
  const [pwStatus, setPwStatus] = useState<'idle' | 'loading' | 'sent'>('idle')
  const [discordStatus, setDiscordStatus] = useState<'idle' | 'loading'>('idle')
  const [discordLinked, setDiscordLinked] = useState(false)
  const [discordUsername, setDiscordUsername] = useState<string | null>(null)
  const [loadingIdentities, setLoadingIdentities] = useState(true)

  useEffect(() => {
    const checkIdentities = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const discordIdentity = user.identities?.find((i) => i.provider === 'discord')
      if (discordIdentity) {
        setDiscordLinked(true)
        const username = discordIdentity.identity_data?.full_name
          || discordIdentity.identity_data?.name
          || discordIdentity.identity_data?.user_name
          || null
        setDiscordUsername(username)
      }
      setLoadingIdentities(false)
    }
    checkIdentities()
  }, [])

  async function handleChangePassword() {
    setPwStatus('loading')
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user?.email) return
    await supabase.auth.resetPasswordForEmail(user.email, {
      redirectTo: `${window.location.origin}/auth/callback?type=recovery`,
    })
    setPwStatus('sent')
    setTimeout(() => setPwStatus('idle'), 4000)
  }

  async function handleLinkDiscord() {
    setDiscordStatus('loading')
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
        scopes: 'identify email guilds',
      },
    })
  }

  return (
    <section
      className="rounded-2xl p-5"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-2 text-left"
      >
        <div className="flex items-center gap-2">
          <div
            className="grid size-8 place-items-center rounded-lg"
            style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.7)' }}
          >
            <KeyRound className="size-4" />
          </div>
          <h2 className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.85)' }}>
            Account Settings
          </h2>
        </div>
        {open
          ? <ChevronUp className="size-4" style={{ color: 'rgba(255,255,255,0.35)' }} />
          : <ChevronDown className="size-4" style={{ color: 'rgba(255,255,255,0.35)' }} />
        }
      </button>

      {open && (
        <div className="mt-5 space-y-3">
          {/* Change password */}
          <div
            className="flex items-center justify-between gap-4 rounded-xl p-4"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <div>
              <p className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.8)' }}>
                Change password
              </p>
              <p className="mt-0.5 text-xs" style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 300 }}>
                We'll send a reset link to your email
              </p>
            </div>
            <button
              type="button"
              onClick={handleChangePassword}
              disabled={pwStatus !== 'idle'}
              className="inline-flex h-9 shrink-0 items-center gap-2 rounded-full px-4 text-xs font-medium transition-all duration-200 hover:-translate-y-px disabled:opacity-60"
              style={
                pwStatus === 'sent'
                  ? { background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)' }
                  : { background: 'rgba(255,255,255,0.92)', color: '#080808', boxShadow: '0 0 20px -6px rgba(255,255,255,0.4)' }
              }
            >
              {pwStatus === 'loading' && <Loader2 className="size-3.5 animate-spin" />}
              {pwStatus === 'sent' && <CheckCircle2 className="size-3.5" />}
              {pwStatus === 'idle' && <KeyRound className="size-3.5" />}
              {pwStatus === 'sent' ? 'Link sent!' : pwStatus === 'loading' ? 'Sending…' : 'Send link'}
            </button>
          </div>

          {/* Link Discord */}
          <div
            className="flex items-center justify-between gap-4 rounded-xl p-4"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="grid size-8 shrink-0 place-items-center rounded-lg"
                style={{ background: 'rgba(88,101,242,0.15)', color: 'rgba(180,185,255,0.9)' }}>
                <DiscordIcon />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.8)' }}>
                  Discord
                </p>
                {loadingIdentities ? (
                  <p className="mt-0.5 text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>Checking…</p>
                ) : discordLinked ? (
                  <div className="mt-1 flex items-center gap-1.5">
                    <CheckCircle2 className="size-3" style={{ color: 'rgba(88,101,242,0.9)' }} />
                    <span className="text-xs truncate" style={{ color: 'rgba(180,185,255,0.8)' }}>
                      {discordUsername ? `@${discordUsername}` : 'Connected'}
                    </span>
                  </div>
                ) : (
                  <p className="mt-0.5 text-xs" style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 300 }}>
                    Connect to unlock community perks
                  </p>
                )}
              </div>
            </div>

            {!loadingIdentities && (
              discordLinked ? (
                /* Badge "Connected" — no button */
                <div
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium"
                  style={{ background: 'rgba(88,101,242,0.12)', border: '1px solid rgba(88,101,242,0.25)', color: 'rgba(180,185,255,0.9)' }}
                >
                  <CheckCircle2 className="size-3" />
                  Linked
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleLinkDiscord}
                  disabled={discordStatus === 'loading'}
                  className="inline-flex h-9 shrink-0 items-center gap-2 rounded-full px-4 text-xs font-medium transition-all duration-200 hover:-translate-y-px disabled:opacity-60"
                  style={{ background: 'rgba(88,101,242,0.18)', border: '1px solid rgba(88,101,242,0.35)', color: 'rgba(180,185,255,0.9)' }}
                >
                  {discordStatus === 'loading'
                    ? <Loader2 className="size-3.5 animate-spin" />
                    : <DiscordIcon />
                  }
                  {discordStatus === 'loading' ? 'Connecting…' : 'Connect'}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </section>
  )
}
