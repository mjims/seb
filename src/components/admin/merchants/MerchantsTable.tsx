'use client'

import { useQuery } from '@tanstack/react-query';
import { getMerchants } from '@/lib/api'
import Link from 'next/link'
import { Eye } from 'lucide-react';



export default function MerchantsTable() {
  const { data: merchants, isLoading } = useQuery({
    queryKey: ['merchants'],
    queryFn: getMerchants
  })
  
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Solde</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Solde actif</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {isLoading ? (
            <tr>
              <td>Chargement en cours... </td>
            </tr>
          ) : (
            merchants?.results.map((merchant) => (
              <tr key={merchant.id}>
                <td className="px-6 py-4 whitespace-nowrap">{merchant.business_name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    merchant.verification_status === 'approved' ? 'bg-green-100 text-green-800' :
                    merchant.verification_status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {merchant.verification_status === 'approved' ? 'Vérifié' : 
                    merchant.verification_status === 'rejected' ? 'Rejeté' : 'En attente'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(merchant.created_at ? merchant.created_at : "N/A").toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{merchant.real_balance}</td>
                <td className="px-6 py-4 whitespace-nowrap">{merchant.available_balance}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link 
                    href={`/merchants/${merchant.id}`}
                    className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                  >
                    <Eye className='w-4 h-4'/>
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

//

export function MerchantsPendingTable() {
  const { data: merchants, isLoading } = useQuery({
    queryKey: ['merchants'],
    queryFn: getMerchants,
  });

  const approvedMerchants = merchants?.results?.filter(m => m.verification_status === "pending") || [];

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Solde</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Solde actif</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {isLoading ? (
            <tr>
              <td colSpan={6} className="text-center py-4">Chargement...</td>
            </tr>
          ) : approvedMerchants.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-4">Aucune donnée disponible</td>
            </tr>
          ) : (
            approvedMerchants.map((merchant) => (
              <tr key={merchant.id}>
                <td className="px-6 py-4 whitespace-nowrap">{merchant.business_name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    merchant.verification_status === 'approved' ? 'bg-green-100 text-green-800' :
                    merchant.verification_status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {merchant.verification_status === 'approved' ? 'Vérifié' :
                     merchant.verification_status === 'rejected' ? 'Rejeté' : 'En attente'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(merchant.created_at ? merchant.created_at : "N/A").toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{merchant.real_balance}</td>
                <td className="px-6 py-4 whitespace-nowrap">{merchant.available_balance}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link 
                    href={`/merchants/${merchant.id}`}
                    className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                  >
                    Gérer
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}