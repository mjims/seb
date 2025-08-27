// app/admin/suspensions/[id]/page.tsx
import { notFound } from 'next/navigation'
import { getSuspensionById } from '@/lib/api-client'
import SuspensionDetailClient from '@/components/admin/suspensions/SuspensionDetailClient'

export default async function SuspensionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  
  const { id } = await params;
  const suspension = await fetchSuspension(id)

  if (!suspension) return notFound()

  return <SuspensionDetailClient suspension={suspension} />
}

async function fetchSuspension(id: string) {
  return getSuspensionById(id)
}
