// components/admin/Users/UserActivity.tsx
'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity, CreditCard, FileText, User } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface UserActivityProps {
  userId: string
}

export default function UserActivity({ userId }: UserActivityProps) {
  const [activeTab, setActiveTab] = useState<'activity' | 'documents' | 'transactions'>('activity')

  // Données mockées - à remplacer par API
  const activities = [
    { id: '1', type: 'login', date: '2023-11-20T14:45:00Z', description: 'Connexion' },
    { id: '2', type: 'transaction', date: '2023-11-18T10:30:00Z', description: 'Paiement envoyé - 150,00 €' }
  ]

  return (
    <Card>
      <CardHeader className="p-0">
        <div className="flex border-b">
          <Button
            variant="ghost"
            className={`rounded-none ${activeTab === 'activity' ? 'border-b-2 border-primary' : ''}`}
            onClick={() => setActiveTab('activity')}
          >
            <Activity className="mr-2 h-4 w-4" />
            Activité
          </Button>
          <Button
            variant="ghost"
            className={`rounded-none ${activeTab === 'transactions' ? 'border-b-2 border-primary' : ''}`}
            onClick={() => setActiveTab('transactions')}
          >
            <CreditCard className="mr-2 h-4 w-4" />
            Transactions
          </Button>
          <Button
            variant="ghost"
            className={`rounded-none ${activeTab === 'documents' ? 'border-b-2 border-primary' : ''}`}
            onClick={() => setActiveTab('documents')}
          >
            <FileText className="mr-2 h-4 w-4" />
            Documents
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {activeTab === 'activity' && (
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 mt-1">
                  <Activity className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium">{activity.description}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(activity.date).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'transactions' && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Aucune transaction récente</p>
            <Button variant="link" className="mt-2">
              Voir toutes les transactions
            </Button>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Aucun document uploadé</p>
            <Button variant="link" className="mt-2">
              Voir les documents KYC
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}