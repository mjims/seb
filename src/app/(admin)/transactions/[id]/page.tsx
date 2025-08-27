// app/admin/transactions/[id]/page.tsx
import { notFound } from 'next/navigation'
import TransactionDetailCard from '@/components/admin/transactions/TransactionDetailCard'
import TransactionTimeline from '@/components/admin/transactions/TransactionTimeline'
import { Button } from '@/components/ui/button'
import { getTransactionById } from '@/lib/api-client'


export default async function TransactionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const transaction = await getTransactionById(id)
  
  if (!transaction) return notFound()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Détails de la transaction</h1>
        <div className="flex gap-2">
          <Button variant="outline" disabled>
            Exporter en PDF
          </Button>
          <Button variant="outline" disabled>
            Rembourser
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TransactionDetailCard transaction={transaction} />
        </div>
        <div className="lg:col-span-1">
          <TransactionTimeline transactionId={transaction.id} />
        </div>
      </div>
    </div>
  )
}
