// src/app/(admin)/kyc/[id]/page.tsx
import { notFound } from 'next/navigation'
import KYCDetailHeader from '@/components/admin/kyc/KYCDetailHeader'
import DocumentViewer from '@/components/admin/kyc/DocumentViewer'
import ApprovalActions from '@/components/admin/kyc/ApprovalActions'
import { getKycById } from '@/lib/api-client'


export default async function KYCDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const document = await getKycById(id)

  if (!document) return notFound()

  return (
    <div className="space-y-6">
      <KYCDetailHeader document={document} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DocumentViewer document={document} />
        </div>
        <div className="lg:col-span-1">
          <ApprovalActions documentId={document.id} />
        </div>
      </div>
    </div>
  )
}
