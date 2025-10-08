'use client'
import Link from 'next/link'
import KYCStatusBadge from './KYCStatusBadge'
import { useQuery } from '@tanstack/react-query'
import { getKycs } from '@/lib/api'
import ActionButton from './ActionBtn'

export default function MerchantsKYCTable() {
  const { data: documents, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: getKycs
  })

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Utilisateur</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
            <th colSpan={3} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {documents?.count === 0 ? (
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-center" colSpan={5}>Rien à afficher</td>
            </tr>            
          ) :
            documents?.results.map((doc) => (
              <tr key={doc.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link href={`/merchants/${doc.merchant.id}`}> {doc.merchant.business_name}</Link></td>
                <td className="px-6 py-4 whitespace-nowrap">{doc.document_type.label}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <KYCStatusBadge status={doc?.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(doc.uploaded_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link 
                    href={doc.file}
                    target='_blank'
                    className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                  >
                    Voir
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {doc.status === 'approved' ? (
                    '-'
                  ): (
                      <ActionButton docId={doc.id} userType="merchant" action="valider" />
                  )}                    
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {doc.status === 'rejected' ? (
                    '-'
                  ) : (
                    <ActionButton
                      docId={doc.id}
                      userType='merchant'
                      action='rejeter'
                    />
                  )}
                  
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  )
}