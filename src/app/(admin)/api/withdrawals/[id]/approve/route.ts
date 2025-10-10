// app/api/withdrawals/[id]/suspend/route.ts
import { approvedWithdrawal, getWithdrawalById } from '@/lib/api-client'
import { NextResponse } from 'next/server'

export async function POST(
  req: Request,
  ctx: RouteContext<'/api/withdrawals/[id]/approve'>) {
  const { id } = await ctx.params
  if (!id) {
    return NextResponse.json({ detail: 'Missing id param' }, { status: 400 })
  }

  try {
    // Récupérer des infos existants
    const doc = await getWithdrawalById(id)

    if (!doc) {
      return NextResponse.json({ detail: 'Withdrawal not found' }, { status: 404 })
    }

    // Mettre is_active à true
    const approvePayload = {
      ...doc,
      status: "approved",
    }

    const updated = await approvedWithdrawal(id, approvePayload)

    return NextResponse.json(updated, { status: 200 })
  } catch (err: any) {
    console.error('Error approving withdrawal', err)
    // Si axios renvoie err.response.data le renvoyer plus proprement
    const status = err?.response?.status ?? 500
    const data = err?.response?.data ?? { detail: 'Internal server error' }
    return NextResponse.json(data, { status })
  }
}
