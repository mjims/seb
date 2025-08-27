import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { format } from 'date-fns'
import Link from 'next/link'

interface P2PDetailCardProps {
  P2P: {
    id: string
    reference: string
    amount: number
    currency: string
    status: "completed" | "pending" | "failed" 
    date: string
    paymentMethod: string
    sender: {
      id: string
      name: string
      account: string
    }
    recipient: {
      id: string
      name: string
      account: string
    }
    fees: number
  }
}

export default function P2PDetailCard({ P2P }: P2PDetailCardProps) {
  const statusMap = {
    completed: { label: 'Complétée', variant: 'success' as const },
    pending: { label: 'En attente', variant: 'secondary' as const },
    failed: { label: 'Échouée', variant: 'destructive' as const },
    refunded: { label: 'Remboursée', variant: 'default' as const }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Référence: {P2P.reference}</span>
          <Badge variant={statusMap[P2P.status].variant}>
            {statusMap[P2P.status].label}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Montant</h3>
            <p className="text-xl font-semibold">
              {new Intl.NumberFormat('fr-FR', {
                style: 'currency',
                currency: P2P.currency
              }).format(P2P.amount)}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Frais: {P2P.fees} {P2P.currency}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Date</h3>
            <p>{format(new Date(P2P.date), 'PPPp')}</p>
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Expéditeur</h3>
          <div className="space-y-2">
            <p className="font-medium">
              <Link href={`/admin/users/${P2P.sender.id}`} className="hover:underline">
                {P2P.sender.name}
              </Link>
            </p>
            <p className="text-sm text-muted-foreground">
              {P2P.sender.account}
            </p>
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Destinataire</h3>
          <div className="space-y-2">
            <p className="font-medium">
              <Link href={`/admin/users/${P2P.recipient.id}`} className="hover:underline">
                {P2P.recipient.name}
              </Link>
            </p>
            <p className="text-sm text-muted-foreground">
              {P2P.recipient.account}
            </p>
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Méthode de paiement</h3>
          <p>{P2P.paymentMethod}</p>
        </div>
      </CardContent>
    </Card>
  )
}