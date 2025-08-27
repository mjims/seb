// components/admin/KYC/ApprovalActions.tsx
'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, X, AlertTriangle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface ApprovalActionsProps {
  documentId: string
}

export default function ApprovalActions({ documentId }: ApprovalActionsProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<'approve' | 'reject' | null>(null)

  const handleAction = async (action: 'approve' | 'reject') => {
    setIsLoading(action)
    try {
      // Remplacer par appel API réel
      await new Promise(resolve => setTimeout(resolve, 1000))

      router.refresh()
    } catch (error) {
      
    } finally {
      setIsLoading(null)
    }
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
            <span className="animate-spin mr-2">...</span>
          ) : (
            <Check className="mr-2 h-4 w-4" />
          )}
          Approuver
        </Button>

        <Button
          variant="destructive"
          className="w-full"
          onClick={() => handleAction('reject')}
          disabled={isLoading !== null}
        >
          {isLoading === 'reject' ? (
            <span className="animate-spin mr-2">...</span>
          ) : (
            <X className="mr-2 h-4 w-4" />
          )}
          Rejeter
        </Button>

        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <p className="text-sm text-yellow-800">
              Veuillez vérifier attentivement le document avant de prendre une décision.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}