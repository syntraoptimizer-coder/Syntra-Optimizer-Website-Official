'use client'

import { useState } from 'react'
import { X, AlertTriangle } from 'lucide-react'

export function DevBanner() {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-center gap-3 px-4 py-2.5 text-center text-sm"
      style={{
        background: 'rgba(10,10,10,0.85)',
        borderBottom: '1px solid rgba(255,200,50,0.25)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <AlertTriangle
        className="size-4 shrink-0"
        style={{ color: 'rgba(255,200,50,0.85)' }}
      />
      <p style={{ color: 'rgba(255,200,50,0.85)', fontWeight: 300 }}>
        <span className="font-medium">Site under development</span>
      </p>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 grid size-6 place-items-center rounded-full transition-all duration-150 hover:bg-white/10"
        style={{ color: 'rgba(255,200,50,0.6)' }}
        aria-label="Close"
      >
        <X className="size-3.5" />
      </button>
    </div>
  )
}
