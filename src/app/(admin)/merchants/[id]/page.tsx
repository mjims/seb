import { notFound } from 'next/navigation'
import MerchantDetailHeader from '@/components/admin/merchants/MerchantDetailHeader'
import MerchantInfoCard from '@/components/admin/merchants/MerchantInfoCard'
import MerchantStats from '@/components/admin/merchants/MerchantStats'
import { getMerchantById } from '@/lib/api-client'

export default async function MerchantDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const merchant = await getMerchantById(id)

  if(!merchant) return notFound();

  return (
     <div className="p-6 space-y-6">      
      
      <MerchantDetailHeader merchant={merchant} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MerchantInfoCard merchant={merchant} />
        </div>
        <div className="lg:col-span-1">
          <MerchantStats merchantId={merchant.id} />
        </div>
      </div>
    </div>
  )
}
