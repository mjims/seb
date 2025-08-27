// app/admin/withdrawals/[id]/page.tsx
import { notFound } from 'next/navigation'
import WithdrawalDetailHeader from '@/components/admin/withdrawals/WithdrawalDetailHeader'
import WithdrawalInfoCard from '@/components/admin/withdrawals/WithdrawalInfoCard'
import ApprovalActions from '@/components/admin/withdrawals/ApprovalActions'
import { getWithdrawalById } from '@/lib/api-client'

export default async function WithdrawalDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;

  const withdrawal = await getWithdrawalById(id)
  if (!withdrawal) return notFound()

  return (
    <div className="space-y-6">
      <WithdrawalDetailHeader withdrawal={withdrawal} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <WithdrawalInfoCard withdrawal={withdrawal} />
        </div>
        <div className="lg:col-span-1">
          <ApprovalActions withdrawal={withdrawal} />
        </div>
      </div>
    </div>
  )
}