'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
      <path fill="#EA4335" d="M12 10.2v3.9h5.5a4.7 4.7 0 0 1-2 3.1v2.6h3.3c1.9-1.8 3-4.4 3-7.5 0-.7-.1-1.4-.2-2.1H12Z" />
      <path fill="#34A853" d="M12 22c2.7 0 5-.9 6.6-2.4l-3.3-2.6c-.9.6-2 1-3.3 1-2.5 0-4.7-1.7-5.4-4H3.2v2.6A10 10 0 0 0 12 22Z" />
      <path fill="#FBBC05" d="M6.6 14c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V7.4H3.2A10 10 0 0 0 2 12c0 1.6.4 3.2 1.2 4.6L6.6 14Z" />
      <path fill="#4285F4" d="M12 6c1.5 0 2.8.5 3.8 1.5l2.9-2.9C16.9 2.9 14.7 2 12 2A10 10 0 0 0 3.2 7.4L6.6 10c.7-2.3 2.9-4 5.4-4Z" />
    </svg>
  )
}

function DiscordIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="#5865F2" className="size-4" aria-hidden="true">
      <path d="M20.32 4.37A19.8 19.8 0 0 0 15.4 2.9a.07.07 0 0 0-.08.03c-.2.38-.44.87-.6 1.25a18.3 18.3 0 0 0-5.44 0c-.16-.39-.4-.87-.6-1.25a.08.08 0 0 0-.09-.03A19.7 19.7 0 0 0 3.68 4.37a.07.07 0 0 0-.03.03C.53 9.05-.32 13.58.1 18.06a.08.08 0 0 0 .03.05 19.9 19.9 0 0 0 6 3.03.08.08 0 0 0 .08-.03c.46-.63.87-1.29 1.23-1.99a.08.08 0 0 0-.04-.11 13.1 13.1 0 0 1-1.87-.89.08.08 0 0 1 0-.13l.37-.29a.07.07 0 0 1 .08-.01 14.2 14.2 0 0 0 12.06 0 .07.07 0 0 1 .08 0l.37.3a.08.08 0 0 1 0 .13c-.6.35-1.22.64-1.87.89a.08.08 0 0 0-.04.11c.36.7.78 1.36 1.23 1.99a.08.08 0 0 0 .08.03 19.8 19.8 0 0 0 6.01-3.03.08.08 0 0 0 .03-.05c.5-5.18-.84-9.67-3.54-13.66a.06.06 0 0 0-.03-.03ZM8.02 15.33c-1.18 0-2.16-1.08-2.16-2.42 0-1.33.96-2.42 2.16-2.42 1.21 0 2.18 1.1 2.16 2.42 0 1.34-.96 2.42-2.16 2.42Zm7.97 0c-1.18 0-2.16-1.08-2.16-2.42 0-1.33.96-2.42 2.16-2.42 1.21 0 2.18 1.1 2.16 2.42 0 1.34-.95 2.42-2.16 2.42Z" />
    </svg>
  )
}

export function OAuthButtons() {
  const [loading, setLoading] = useState<'google' | 'discord' | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleOAuth(provider: 'google' | 'discord') {
    setLoading(provider)
    setError(null)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
    if (error) {
      setLoading(null)
      setError(`${provider} sign-in failed. Please try again.`)
    }
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        {(['google', 'discord'] as const).map((provider) => (
          <button
            key={provider}
            type="button"
            disabled={loading !== null}
            onClick={() => handleOAuth(provider)}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl text-sm font-light capitalize transition-all duration-200 hover:-translate-y-px disabled:opacity-50"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.75)',
            }}
          >
            {loading === provider ? (
              <Loader2 className="size-4 animate-spin" />
            ) : provider === 'google' ? (
              <GoogleIcon />
            ) : (
              <DiscordIcon />
            )}
            {provider.charAt(0).toUpperCase() + provider.slice(1)}
          </button>
        ))}
      </div>
      {error && (
        <p className="text-xs" style={{ color: 'rgba(255,100,100,0.9)' }}>
          {error}
        </p>
      )}
    </div>
  )
}
