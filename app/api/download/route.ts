import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'

async function getB2Token() {
  const keyId = process.env.B2_KEY_ID
  const appKey = process.env.B2_APPLICATION_KEY
  if (!keyId || !appKey) throw new Error('B2 credentials missing')

  const credentials = Buffer.from(`${keyId}:${appKey}`).toString('base64')
  const res = await fetch('https://api.backblazeb2.com/b2api/v3/b2_authorize_account', {
    headers: { Authorization: `Basic ${credentials}` },
  })

  if (!res.ok) throw new Error(`B2 auth failed: ${res.status}`)

  const data = await res.json()
  const apiUrl = data.apiInfo?.storageApi?.apiUrl
  const authorizationToken = data.authorizationToken

  if (!apiUrl || !authorizationToken) {
    throw new Error('B2 missing fields')
  }

  return { authorizationToken, apiUrl }
}

export async function GET(_req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role, service_count')
      .eq('user_id', user.id)
      .maybeSingle()

    const role = roleData?.role || 'free'
    const serviceCount = roleData?.service_count || 0

    if (role !== 'premium' && serviceCount === 0) {
      return NextResponse.json({ error: 'Premium required' }, { status: 403 })
    }

    const { authorizationToken, apiUrl } = await getB2Token()

    const fileId = process.env.B2_FILE_ID
    const filePath = process.env.B2_FILE_PATH || 'Syntra Optimizer Setup 1.1.1.exe'

    if (!fileId) throw new Error('B2_FILE_ID missing')

    // Use b2_download_file_by_id via apiUrl — works with restricted keys
    const fileRes = await fetch(
      `${apiUrl}/b2api/v3/b2_download_file_by_id?fileId=${fileId}`,
      { headers: { Authorization: authorizationToken } }
    )

    if (!fileRes.ok) {
      const txt = await fileRes.text()
      throw new Error(`B2 file fetch failed: ${fileRes.status} ${txt}`)
    }

    const fileName = filePath.split('/').pop() || 'SyntraOptimizer-Setup.exe'

    return new Response(fileRes.body, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Content-Length': fileRes.headers.get('Content-Length') || '',
      },
    })

  } catch (err) {
    console.error('[download]', err)
    return NextResponse.json({
      error: 'Download unavailable',
      detail: err instanceof Error ? err.message : String(err)
    }, { status: 500 })
  }
}
