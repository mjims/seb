// app/admin/withdrawals/[id]/page.tsx
import { notFound } from 'next/navigation'
import WithdrawalDetailHeader from '@/components/admin/withdrawals/WithdrawalDetailHeader'
import WithdrawalInfoCard from '@/components/admin/withdrawals/WithdrawalInfoCard'
import { getMerchantById, getUserById, getWithdrawalById } from '@/lib/api-client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default async function WithdrawalDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  //const [merchant, setMerchant]

  const withdrawal = await getWithdrawalById(id)
  if (!withdrawal) return notFound()
  const merchant = await getMerchantById(withdrawal.merchant)
  //if(!merchant) return notFound();

  return (
    <div className="space-y-6 p-6">
      <WithdrawalDetailHeader withdrawal={withdrawal} merchant={merchant} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <WithdrawalInfoCard withdrawal={withdrawal} merchant={merchant}/>
        </div>
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className=''>Historiques de retraits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-center bg-amber-200 p-4'>Fonctionnalité à implémenter</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}