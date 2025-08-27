// app/admin/payments/page.tsx
import PaymentLinksTable from '@/components/admin/payments/PaymentLinksTable'
import CreatePaymentLinkDialog from '@/components/admin/payments/CreatePaymentLinkDialog'
import { Link2, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function PaymentsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link2 className="w-6 h-6" />
          <h1 className="text-2xl font-bold">Liens de paiement</h1>
        </div>
        {/* <CreatePaymentLinkDialog>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nouveau lien
          </Button>
        </CreatePaymentLinkDialog> */}
      </div>

      <PaymentLinksTable />
    </div>
  )
}