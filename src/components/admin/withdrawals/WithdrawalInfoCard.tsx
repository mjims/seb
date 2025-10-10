// components/admin/Withdrawals/WithdrawalInfoCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Banknote, CreditCard, User, FileText, Calendar, Clock } from 'lucide-react'
import { format } from 'date-fns'
import { WithdrawalRequestType } from '@/types/withdrawal'
import { MerchantType } from '@/types/merchant'

interface WithdrawalInfoCardProps {
  withdrawal: WithdrawalRequestType,
  merchant: MerchantType
}

export default function WithdrawalInfoCard({ withdrawal, merchant }: WithdrawalInfoCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Détails du retrait</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <Banknote className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Montant brut</p>
              <p className="font-medium">
                {new Intl.NumberFormat('fr-FR', {
                  style: 'currency',
                  currency: "xof"
                }).format(withdrawal.amount)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Banknote className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Montant net</p>
              <p className="font-medium">
                {new Intl.NumberFormat('fr-FR', {
                  style: 'currency',
                  currency: "xof"
                }).format(withdrawal.amount)}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Demandé par</p>
              <p className="font-medium">{merchant.business_name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <CreditCard className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Compte bénéficiaire</p>
              <p className="font-medium">{withdrawal.account_name}</p>
              <p className="font-medium">{withdrawal.account_number}</p>
            </div>
          </div>
        </div>

        <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Date de demande</p>
              <p>{format(new Date(withdrawal.created_at), 'dd MMM yyy à HH:mm')}</p>
            </div>
          </div>

          {withdrawal.processed_at && (
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Date de traitement</p>
                <p>{format(new Date(withdrawal.processed_at), 'dd MMM yyy à HH:mm')}</p>
              </div>
            </div>
          )}
        </div>

        {withdrawal.notes && (
          <div className="border-t pt-4">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Notes</p>
                <p className="font-medium">{withdrawal.notes}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}