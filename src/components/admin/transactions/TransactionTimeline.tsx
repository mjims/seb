// components/admin/Transactions/TransactionTimeline.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Clock, AlertCircle, CreditCard } from 'lucide-react'

interface TransactionTimelineProps {
  transactionId: string
}

export default function TransactionTimeline({ transactionId }: TransactionTimelineProps) {
  // Données mockées - à remplacer par API
  const timeline = [
    {
      id: '1',
      status: 'created',
      date: '2023-11-15T14:30:00Z',
      description: 'Transaction créée'
    },
    {
      id: '2',
      status: 'processed',
      date: '2023-11-15T14:31:00Z',
      description: 'Paiement traité'
    },
    {
      id: '3',
      status: 'completed',
      date: '2023-11-15T14:32:00Z',
      description: 'Transaction complétée'
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'processed':
        return <CreditCard className="h-4 w-4 text-blue-500" />
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Historique</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {timeline.map((item, index) => (
            <div key={item.id} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="p-1 rounded-full bg-background border-2 border-primary">
                  {getStatusIcon(item.status)}
                </div>
                {index !== timeline.length - 1 && (
                  <div className="w-px h-full bg-gray-200" />
                )}
              </div>
              <div className="pb-4">
                <p className="font-medium">{item.description}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(item.date).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}