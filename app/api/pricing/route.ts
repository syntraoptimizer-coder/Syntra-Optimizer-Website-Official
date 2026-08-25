import { NextResponse } from 'next/server'
import { getLaunchPricing } from '@/lib/pricing'

export const dynamic = 'force-dynamic'

export async function GET() {
  const pricing = await getLaunchPricing()
  return NextResponse.json({ pricing })
}
