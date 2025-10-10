import { getWithdrawalById, rejectWithdrawal } from '@/lib/api-client'
import { NextResponse } from 'next/server'



export async function POST(req: Request, ctx: RouteContext<'/api/withdrawals/[id]/rejecte'>) {
  const { id } = await ctx.params
  if (!id) {
    return NextResponse.json({ detail: 'Missing id param' }, { status: 400 })
  }
  
  console.log(id)

  try {
    // Récupérer l'utilisateur existant (pour PUT complet)
    const withdrawal = await getWithdrawalById(id)

    if (!withdrawal) {
      return NextResponse.json({ detail: 'Withdrawal not found' }, { status: 404 })
    }

    // Mettre is_active à true
    const approvePayload = {
      ...withdrawal,
      status: "rejected",
    }

    const updated = await rejectWithdrawal(id, approvePayload)

    return NextResponse.json(updated, { status: 200 })
  } catch (err: any) {
    console.error('Error rejecting withdrawal', err)
    // Si axios renvoie err.response.data le renvoyer plus proprement
    const status = err?.response?.status ?? 500
    const data = err?.response?.data ?? { detail: 'Internal server error' }
    return NextResponse.json(data, { status })
  }
}
