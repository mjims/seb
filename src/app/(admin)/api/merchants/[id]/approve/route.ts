// app/api/merchants/[id]/approve/route.ts
import { patchMerchantById } from '@/lib/api-client'
import { NextResponse } from 'next/server'

export async function POST(
  req: Request,
  ctx: RouteContext<'/api/merchants/[id]/approve'>) {
    
  const { id } = await ctx.params
  if (!id) {
    return NextResponse.json({ detail: 'Missing id param' }, { status: 400 })
  }
  console.log(id)

   try {
    const updated = await patchMerchantById(id, { verification_status: 'approved' })
    return NextResponse.json(updated, { status: 200 })
  } catch (err: any) {
    const status = err?.response?.status ?? 500
    const data = err?.response?.data ?? { detail: 'Internal server error' }
    return NextResponse.json(data, { status })
  }
}
