// components/admin/Merchants/MerchantStats.tsx
'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  DollarSign, 
  CreditCard, 
  TrendingUp, 
  AlertCircle 
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface MerchantStatsProps {
  merchantId: string
}

export default function MerchantStats({ merchantId }: MerchantStatsProps) {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d')

  // Données mockées - à remplacer par API
  const stats = {
    totalRevenue: 12500,
    transactionCount: 342,
    growthRate: 12.5,
    chargebackRate: 0.8
  }

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex justify-between items-center">
          <span>Statistiques</span>
          <div className="flex gap-1">
            <Button 
              variant={timeRange === '7d' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setTimeRange('7d')}
            >
              7j
            </Button>
            <Button 
              variant={timeRange === '30d' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setTimeRange('30d')}
            >
              30j
            </Button>
            <Button 
              variant={timeRange === '90d' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setTimeRange('90d')}
            >
              90j
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <DollarSign className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Revenu total</p>
              <p className="font-medium">
                {new Intl.NumberFormat('fr-FR', {
                  style: 'currency',
                  currency: 'EUR'
                }).format(stats.totalRevenue)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CreditCard className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Transactions</p>
              <p className="font-medium">{stats.transactionCount}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Taux de croissance</p>
              <p className={`font-medium ${
                stats.growthRate >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {stats.growthRate >= 0 ? '+' : ''}{stats.growthRate}%
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Taux de contestation</p>
              <p className="font-medium">{stats.chargebackRate}%</p>
            </div>
          </div>
        </div>

        <Button variant="outline" className="w-full mt-4">
          Voir le rapport complet
        </Button>
      </CardContent>
    </Card>
  )
}