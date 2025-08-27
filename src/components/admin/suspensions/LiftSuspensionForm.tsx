'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { resolveSuspension } from '@/lib/api'

interface LiftSuspensionFormProps {
  suspensionId: string
}

export default function LiftSuspensionForm({ suspensionId }: LiftSuspensionFormProps) {
  const [notes, setNotes] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  //const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await resolveSuspension({
        id: suspensionId,
        resolution_notes: notes,
      })

      // toast({
      //   title: 'Suspension levée',
      //   description: 'Le compte a été réactivé avec succès.',
      //   variant: 'success'
      // })

      router.refresh()

    } catch (error) {
      // toast({
      //   title: 'erreur',
      //   description: 'Une erreur est survenue lors de la levée de la suspension',
      //   variant: 'destructive'
      // })
      
    } finally {
      
      setIsLoading(false)
    }
  }


  return (
    <Card className='border border-(--link-simple-border)'>
      <CardHeader>
        <CardTitle className='text-xl text-yellow-800'>Lever la suspension</CardTitle>        
      </CardHeader>
      <CardContent>
        <div className="p-4 bg-yellow-50  shadow-xl/10 shadow-yellow-800 mb-6">
          <p className="text-sm text-yellow-800">
            Attention : La levée de suspension redonnera à l&apos;utilisateur un accès complet à son compte.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-muted-foreground mb-2">
              Notes (de résolution)
            </label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Raison de la levée de suspension..."
              className="min-h-[100px] focus-visible:ring-0 resize-none"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button 
              type="submit"
              disabled={isLoading}
              className='bg-(image:--side-border) hover:bg-(image:--sebpay-gradient-hover) text-white p-2'
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Traitement...
                </>
              ) : (
                'Confirmer la levée'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}