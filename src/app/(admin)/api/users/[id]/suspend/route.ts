// app/api/users/[id]/suspend/route.ts
import { getUserById, updateUserById } from '@/lib/api-client'
import { NextResponse } from 'next/server'

export async function POST(
  req: Request,
  ctx: RouteContext<'/api/users/[id]/suspend'>) {
    
  const { id } = await ctx.params
  if (!id) {
    return NextResponse.json({ detail: 'Missing id param' }, { status: 400 })
  }
  console.log(id)

  try {
    // Récupérer l'utilisateur existant (pour PUT complet)
    const user = await getUserById(id)

    if (!user) {
      return NextResponse.json({ detail: 'User not found' }, { status: 404 })
    }

    // Mettre is_active à false
    const updatedPayload = {
      ...user,
      is_active: false,
    }

    // Si ton backend accepte PATCH, tu pourrais: updateUserById(id, { is_active: false })
    const updated = await updateUserById(id, updatedPayload)

    return NextResponse.json(updated, { status: 200 })
  } catch (err: any) {
    console.error('Error suspending user', err)
    // Si axios renvoie err.response.data tu peux le renvoyer plus proprement
    const status = err?.response?.status ?? 500
    const data = err?.response?.data ?? { detail: 'Internal server error' }
    return NextResponse.json(data, { status })
  }
}
