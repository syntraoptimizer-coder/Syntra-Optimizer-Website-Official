'use client'

import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export function SignOutButton() {
  const router = useRouter()

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="btn-ghost"
      style={{ height: 32, padding: '0 12px', fontSize: '0.8rem', borderRadius: 10 }}
    >
      <LogOut className="size-3.5" />
      Sign out
    </button>
  )
}
