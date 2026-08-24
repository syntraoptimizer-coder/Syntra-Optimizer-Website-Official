import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'
  const type = searchParams.get('type')

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && data?.user) {
      const user = data.user
      const forwardedHost = request.headers.get('x-forwarded-host')
      const isLocalEnv = process.env.NODE_ENV === 'development'
      const baseUrl = !isLocalEnv && forwardedHost
        ? `https://${forwardedHost}`
        : origin

      // 1. Password recovery — must be first
      if (type === 'recovery' || user.recovery_sent_at) {
        return NextResponse.redirect(`${baseUrl}/reset-password`)
      }

      // 2. Ensure user_roles row exists
      const { data: existingRole } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .maybeSingle()

      if (!existingRole) {
        await supabase.from('user_roles').insert({
          user_id: user.id,
          role: 'free',
          updated_at: new Date().toISOString(),
        })
        const welcomeUrl = new URL(`${baseUrl}${next}`)
        welcomeUrl.searchParams.set('welcome', '1')
        return NextResponse.redirect(welcomeUrl.toString())
      }

      // 3. Normal redirect
      return NextResponse.redirect(`${baseUrl}${next}`)
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth`)
}
