// components/admin/Withdrawals/WithdrawalDetailHeader.tsx
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Banknote, User, Calendar, Clock } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'
import { WithdrawalRequestType } from '@/types/withdrawal'
import { MerchantType } from '@/types/merchant'
import WithdrawalButton from './WithdrawalActions'

interface WithdrawalDetailHeaderProps {
  withdrawal: WithdrawalRequestType,
  merchant: MerchantType
}

export default function WithdrawalDetailHeader({ withdrawal, merchant }: WithdrawalDetailHeaderProps) {
  const statusMap = {
    pending: { label: 'En attente', variant: 'secondary' as const },
    approved: { label: 'Traité', variant: 'success' as const },
    rejected: { label: 'Rejeté', variant: 'destructive' as const },
    completed: { label: 'Complété', variant: 'default' as const }
  }

  return (
    <>
    <div className="gap-4 grid">
      <div className="route flex text-(size:--route-police) font-sans">
        <div className='route-item'>Dashboard</div>
        <div className='flex space-x-1 items-center'>
          <Banknote className="w-4 h-4" />
          <span>Withdrawals</span>
        </div>
      </div>
      <div className="dash-header flex justify-between p-4 bg-white">
        <div className="flex items-center">
          <strong>Demandes de 
            <Link href={`/merchant/${withdrawal.merchant}`}> { merchant.business_name }</Link></strong>
        </div>
        <div className="flex items-center space-x-4">
          <div className="btn">
            {withdrawal.status === 'pending' && (
              <>
                <WithdrawalButton withdrawalID={withdrawal.id} action='approuver' />
                <WithdrawalButton withdrawalID={withdrawal.id} action='rejeter' />
              </>
            )}
          </div>
          <div className="">
            <Link href="/withdrawals/" className="border border-(--link-simple-border) p-2 hover:bg-(--link-simple-bg-hover)">Retour</Link>
          </div>
        </div>
      </div>
    </div>

    <div className="flex items-start justify-between">
      <div>
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gray-100">
            <Banknote className="h-8 w-8 text-gray-500" />
          </div>
          
          <div>
            <h1 className="text-2xl font-bold">
              Retrait de {new Intl.NumberFormat('fr-FR', {
                style: 'currency',
                currency: "cfa"
              }).format(withdrawal.amount)}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <User className="mr-2 h-4 w-4" />
                <Link href={`/admin/users/${withdrawal.account_number}`} className="hover:underline">
                  {merchant.business_name}
                </Link>
              </div>
              
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-2 h-4 w-4" />
                {format(new Date(withdrawal.created_at), 'PPP')}
              </div>
              
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-2 h-4 w-4" />
                {format(new Date(withdrawal.created_at), 'HH:mm')}
              </div>
              
              <Badge variant={statusMap[withdrawal.status].variant}>
                {statusMap[withdrawal.status].label}
              </Badge>
              
              <span className="text-sm text-muted-foreground">
                Nom du compte: {withdrawal.account_name}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}