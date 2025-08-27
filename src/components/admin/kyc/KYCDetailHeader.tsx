// components/admin/KYC/KYCDetailHeader.tsx
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, FileText, User } from 'lucide-react'
import Link from 'next/link'
import { KycDocumentType } from '@/types/kyc'

export default function KYCDetailHeader({ document }: { document: KycDocumentType }) {
  const statusMap = {
    pending: { label: 'En attente', variant: 'secondary' as const },
    approved: { label: 'Approuvé', variant: 'success' as const },
    rejected: { label: 'Rejeté', variant: 'destructive' as const }
  }

  return (
    <div className="flex items-start justify-between">
      <div>
        <Link href="/admin/kyc" className="flex items-center text-sm text-muted-foreground mb-2">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Retour à la liste
        </Link>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gray-100">
            <FileText className="h-8 w-8 text-gray-500" />
          </div>
          
          <div>
            <h1 className="text-2xl font-bold">
              Document {document.document_type.label}
            </h1>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <User className="mr-2 h-4 w-4" />
                <Link href={`/admin/users/${document.merchant.id}`} className="hover:underline">
                  {document.merchant.business_name}
                </Link>
              </div>
              <Badge variant={statusMap[document.status].variant}>
                {statusMap[document.status].label}
              </Badge>
              <span className="text-sm text-muted-foreground">
                Soumis le {new Date(document.uploaded_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex gap-2">
        <Button variant="outline">Télécharger</Button>
      </div>
    </div>
  )
}