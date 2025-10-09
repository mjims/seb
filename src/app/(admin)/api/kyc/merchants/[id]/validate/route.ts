// app/api/users/[id]/suspend/route.ts
import { approvedMerchantKycById, getMerchantsKycById } from '@/lib/api-client'
import { NextResponse } from 'next/server'

export async function POST(
  req: Request,
  ctx: RouteContext<'/api/kyc/merchants/[id]/validate'>) {
    
  const { id } = await ctx.params
  if (!id) {
    return NextResponse.json({ detail: 'Missing id param' }, { status: 400 })
  }
  console.log(id)

  try {
    // Récupérer le doc existant (pour PUT complet)
    const doc = await getMerchantsKycById(id)

    if (!doc) {
      return NextResponse.json({ detail: 'Document not found' }, { status: 404 })
    }

    // Mettre is_active à true
    const approvePayload = {
      ...doc,
      status: "approved",
    }

    // Si ton backend accepte PATCH, tu pourrais: updateUserById(id, { is_active: false })
    const updated = await approvedMerchantKycById(id, approvePayload)

    return NextResponse.json(updated, { status: 200 })
  } catch (err: any) {
    console.error('Error activating user', err)
    // Si axios renvoie err.response.data le renvoyer plus proprement
    const status = err?.response?.status ?? 500
    const data = err?.response?.data ?? { detail: 'Internal server error' }
    return NextResponse.json(data, { status })
  }
}
