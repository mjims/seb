// components/admin/Withdrawals/ApprovalActions.tsx
'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, X, AlertTriangle, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { WithdrawalRequestType } from '@/types/withdrawal'

interface ApprovalActionsProps {
  withdrawal: WithdrawalRequestType
}

export default function ApprovalActions({ withdrawal }: ApprovalActionsProps) {
  const router = useRouter()
  //const { toast } = useToast()
  const [isLoading, setIsLoading] = useState<'approve' | 'reject' | null>(null)

  const handleAction = async (action: 'approve' | 'reject') => {
    setIsLoading(action)
    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // toast({
      //   title: action === 'approve' ? 'Retrait approuvé' : 'Retrait rejeté',
      //   description: action === 'approve' 
      //     ? `Le retrait de ${withdrawal.amount} fcfa a été approuvé.` 
      //     : 'Le retrait a été rejeté avec succès.',
      //   variant: action === 'approve' ? 'success' : 'destructive'
      // })

      router.refresh()
    } catch (error) {
      // toast({
      //   title: 'Erreur',
      //   description: 'Une erreur est survenue lors du traitement',
      //   variant: 'destructive'
      // })
    } finally {
      setIsLoading(null)
    }
  }

  if (withdrawal.status !== 'pending') {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Statut</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-center text-muted-foreground">
              Cette demande a déjà été {
                withdrawal.status === 'approved' ? 'traitée' :
                withdrawal.status === 'rejected' ? 'rejetée' : 'complétée'
              }
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          variant="success"
          className="w-full"
          onClick={() => handleAction('approve')}
          disabled={isLoading !== null}
        >
          {isLoading === 'approve' ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Check className="mr-2 h-4 w-4" />
          )}
          Approuver le retrait
        </Button>

        <Button
          variant="destructive"
          className="w-full"
          onClick={() => handleAction('reject')}
          disabled={isLoading !== null}
        >
          {isLoading === 'reject' ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <X className="mr-2 h-4 w-4" />
          )}
          Rejeter la demande
        </Button>

        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <p className="text-sm text-yellow-800">
              Vérifiez attentivement les détails du compte bénéficiaire avant validation.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}