import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { TeamsClient } from './teams-client'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Join the Team — Syntra Optimizer',
  description: 'Join the Syntra Optimizer team. We are looking for passionate people to help us grow.',
}

export default async function TeamsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Check if user already applied
  let existingApplication = null
  if (user) {
    const { data } = await supabase
      .from('applications')
      .select('role, status, created_at')
      .eq('user_id', user.id)
      .maybeSingle()
    existingApplication = data
  }

  return (
    <TeamsClient
      user={user ? { id: user.id, email: user.email ?? '' } : null}
      existingApplication={existingApplication}
    />
  )
}
