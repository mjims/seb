// components/admin/Merchants/SuspendMerchantModal.tsx
"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export type SuspensionReason = 
  | 'unusual_activity' 
  | 'kyc_incomplete' 
  | 'compliance_check' 
  | 'fraud_suspicion' 
  | 'manual_review'

interface SuspendMerchantModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  merchantId: string
  onSuspend: (data: {
    merchant: string
    reason: SuspensionReason
    description: string
    required_documents?: object
    status?: 'active' | 'resolved' | 'escalated'
  }) => Promise<void>
}

export function SuspendMerchantModal({
  open,
  onOpenChange,
  merchantId,
  onSuspend,
}: SuspendMerchantModalProps) {
  const [reason, setReason] = useState<SuspensionReason>('manual_review')
  const [description, setDescription] = useState('')
  const [documentsInput, setDocumentsInput] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [documentsError, setDocumentsError] = useState<string | null>(null)

  const formatDocuments = (input: string): object => {
    if (!input.trim()) return {}
    
    const documentsArray = input.split(',')
      .map(doc => doc.trim())
      .filter(doc => doc.length > 0)
    
    return { documents: documentsArray }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setDocumentsError(null)
    
    try {
      const requestData = {
        merchant: merchantId,
        reason,
        description,
        status: 'active' as const,
        ...(documentsInput.trim() && { 
          required_documents: formatDocuments(documentsInput) 
        })
      }

      await onSuspend(requestData)
      onOpenChange(false)
    } catch (error) {
      setDocumentsError("Une erreur s'est produite lors de la suspension")
      console.error('Error suspending merchant:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle className="text-yellow-800 text-center text-lg font-semibold">Suspendre le marchand</DialogTitle>
        </DialogHeader>

        <div>
            <Label htmlFor="reason" className="text-left">
              Raison<span className='text-red-600'>*</span>
            </Label>
        </div>

        <div className="grid gap-4 py-4">
          <div className="">            
            <Select 
              value={reason} 
              onValueChange={(value) => setReason(value as SuspensionReason)}
              required
            >
              <SelectTrigger className="col-span-3 w-full py-4 mb-4">
                <SelectValue placeholder="Sélectionnez une raison" />
              </SelectTrigger>
              <SelectContent className='bg-white py-4'>
                <SelectItem value="unusual_activity">Activité inhabituelle</SelectItem>
                <SelectItem value="kyc_incomplete">KYC incomplet</SelectItem>
                <SelectItem value="compliance_check">Vérification de conformité</SelectItem>
                <SelectItem value="fraud_suspicion">Suspicion de fraude</SelectItem>
                <SelectItem value="manual_review">Revue manuelle</SelectItem>
              </SelectContent>
            </Select>
          </div>
        
        <div>
            <Label htmlFor="reason" className="text-left">
              Description<span className='text-red-600'>*</span>
            </Label>
        </div>
          <div className="">
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Détails de la suspension..."
              required
              className="w-full col-span-3 resize-none mb-4 border-1 focus:ring-0 focus-visible:outline-none"
            />
          </div>
        
        <div>
            <Label htmlFor="documents" className="text-left">
              Documents requis<span className='text-red-600'>*</span>
            </Label>
        </div>

        <div className="">            
            <div className="col-span-3 space-y-2">
              <Input
                id="documents"
                value={documentsInput}
                onChange={(e) => setDocumentsInput(e.target.value)}
                placeholder="Liste séparée par des virgules (ex: id_proof, address_proof)"
                className='w-full'
              />
              <p className="text-sm text-muted-foreground text-yellow-800">
                Saisissez les types de documents requis, séparés par des virgules
              </p>
            </div>
        </div>

        {documentsError && (
        <p className="text-sm text-red-500">{documentsError}</p>
        )}
        </div>

        <DialogFooter className="flex flex-row justify-between">
            <div>
                <Button 
                    variant="outline" 
                    onClick={() => onOpenChange(false)}
                    disabled={isSubmitting}
                >
                    Annuler
                </Button>
            </div>
            <div>
               <Button 
                    onClick={handleSubmit}
                    disabled={isSubmitting || !description}
                    className="bg-(image:--sebpay-gradiant-color) hover:bg-(image:--sebpay-gradient-hover) hover:bg-(--sebpay-red-hover) text-white"
                >
                    {isSubmitting ? 'Envoi en cours...' : 'Confirmer la suspension'}
                </Button>
            </div>         
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}