'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'

export function WelcomeToast({ name }: { name: string }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (searchParams.get('welcome') === '1') {
      setVisible(true)
      // Remove ?welcome=1 from URL cleanly
      router.replace(pathname, { scroll: false })
      // Hide after 3s
      const t = setTimeout(() => setVisible(false), 3000)
      return () => clearTimeout(t)
    }
  }, [searchParams, router, pathname])

  if (!visible) return null

  return (
    <div
      className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2"
      style={{ animation: 'slideUp 0.35s ease' }}
    >
      <div
        className="flex items-center gap-3 rounded-2xl px-5 py-3.5"
        style={{
          background: 'rgba(18,18,18,0.95)',
          border: '1px solid rgba(255,255,255,0.12)',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 8px 40px -8px rgba(0,0,0,0.8)',
        }}
      >
        <div
          className="grid size-8 shrink-0 place-items-center rounded-xl"
          style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-medium" style={{ color: '#ffffff' }}>
            Welcome, {name} 👋
          </p>
          <p className="text-xs font-light" style={{ color: 'rgba(255,255,255,0.42)' }}>
            Your account is ready.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translate(-50%, 12px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
      `}</style>
    </div>
  )
}
