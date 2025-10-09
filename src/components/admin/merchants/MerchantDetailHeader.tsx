'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Store, Mail, Phone, Globe } from 'lucide-react'
import Link from 'next/link'
import { SuspendMerchantModal } from './SuspendMerchantModal'
import { resolveSuspension, suspendMerchant } from '@/lib/api'
import { MerchantType } from '@/types/merchant'
import { useRouter } from 'next/navigation'

interface MerchantDetailHeaderProps {
  merchant: MerchantType
}

export default function MerchantDetailHeader({ merchant }: MerchantDetailHeaderProps) {
  const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const statusMap = {
    approved: { label: 'Vérifié', variant: 'success' as const },
    pending: { label: 'En attente', variant: 'secondary' as const },
    rejected: { label: 'Rejeté', variant: 'destructive' as const }
  }

  const handleSuspendMerchant = async (data: {
    reason: string
    description: string
    requiredDocuments?: object
  }) => {
    try {
      await suspendMerchant({
        merchant: merchant.id,
        reason: data.reason,
        description: data.description,
        ...(data.requiredDocuments && { 
          required_documents: data.requiredDocuments 
        })
      })
      // Rafraîchir les données ou afficher un message de succès
      
    } catch (error) {
      console.error('Failed to suspend merchant:', error)
      throw error
    }
  }

  const handleSuspend = async () => {
    const ok = window.confirm(`Voulez-vous vraiment approver ce document ?`)
    if (!ok) return

    try {
      setLoading(true)
      const res = await fetch(`/api/merchants/${merchant.id}/approve`, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        alert(`Impossible d'approuver le marchant: ${err?.detail || res.statusText}`)
        return
      }

      // Succès — refresh la page pour recharger les données
      router.refresh()
      alert('Le marchant apprové avec succès.')
    } catch (e) {
      console.error(e)
      alert("Erreur réseau lors de l'action.") 
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='mb-15'>
      <SuspendMerchantModal
        open={isSuspendModalOpen}
        onOpenChange={setIsSuspendModalOpen}
        merchantId={merchant.id}
        onSuspend={handleSuspendMerchant}
      />

      <div className="gap-4 grid">
        <div className="route flex text-(size:--route-police) font-sans">
          <div className='route-item'>Dashboard</div>
          <div className='flex space-x-1 items-center'>
            <Store className="w-4 h-4" />
            <span>Merchants</span>
          </div>
        </div>
        <div className="dash-header flex justify-between p-4 bg-white">
          <div className="flex items-center">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100">
                <Store className="h-5 w-5 text-gray-500" />
              </div>
              
              <div>
                <h1 className="text-xl font-bold">
                  {merchant.business_name}
                </h1>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2">
                  
                  <Badge variant={statusMap[merchant.verification_status].variant}>
                    {statusMap[merchant.verification_status].label}
                  </Badge>
                  
                  {merchant.phone && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Phone className="mr-2 h-3 w-3" />
                      {merchant.phone}
                    </div>
                  )}
                  
                  {/* {merchant.website && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Globe className="mr-2 h-4 w-4" />
                      <a 
                        href={merchant.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {merchant.website.replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                  )} */}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="btn">
              {merchant.verification_status === 'approved' && (
                <Button 
                  variant="destructive"  
                  className="bg-(image:--side-border) hover:bg-(image:--sebpay-gradient-hover) text-white p-2"
                  onClick={() => setIsSuspendModalOpen(true)}
                >
                  Suspendre le marchant
                </Button>
              )}
              {merchant.verification_status == 'pending' && (
                <Button
                  onClick={handleSuspend}
                  disabled={loading}
                  className="bg-(image:--side-border) hover:bg-(image:--sebpay-gradient-hover) text-white p-2"
                >
                  {loading ? 'Approbation...' : 'Approuver le marchant'}
                </Button>
              )}
              {merchant.verification_status == 'rejected' && (
                <Button className="bg-(image:--side-border) hover:bg-(image:--sebpay-gradient-hover) text-white p-2">Approuver le marchant</Button>
              )}
            </div>
            <div className="">
              <Link href="/merchants/approved" className="border border-(--link-simple-border) p-2 hover:bg-(--link-simple-bg-hover)">Marchants actifs</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  )

}