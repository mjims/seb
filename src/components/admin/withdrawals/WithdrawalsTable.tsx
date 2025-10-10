'use client'
import { getMerchantById, getWithdrawalRequests } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'
import { formatDate } from 'date-fns'
import { Eye } from 'lucide-react'
import Link from 'next/link'


export default function WithdrawalsTable() {
  const { data: withdrawals, isLoading } = useQuery({
    queryKey: ['withdrawals'],
    queryFn: getWithdrawalRequests
  })

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Marchant</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Montant</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom de compte</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">N° Compte</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fait le</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Validé le</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          { isLoading ? (
            <tr>
              <td colSpan={8} className="text-center py-4">Chargement...</td>
            </tr>
          ) : withdrawals?.count===0 && (
            <tr>
              <td colSpan={8} className='px-6 py-5 text-center text-xs font-medium text-gray-500'>Aucune données disponible</td>
              </tr>
          )}
          {withdrawals?.results.map((withdrawal) => (
            <tr key={withdrawal.id}>
              <td className="px-6 py-4">
                <MerchantNameCell merchantId={withdrawal.merchant} />
              </td>
              <td className="px-6 py-4">{
                new Intl.NumberFormat('fr-FR', {
                  style: 'currency',
                  currency: 'XOF',
                }).format(withdrawal.amount)}</td>
              <td className="px-6 py-4">{withdrawal.bank_name}</td>
              <td className="px-6 py-4">{withdrawal.account_number}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  withdrawal.status === 'approved' ? 'bg-green-100 text-green-800' :
                  withdrawal.status === 'rejected' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {withdrawal.status === 'approved' ? 'Traité' : 
                   withdrawal.status === 'rejected' ? 'Rejeté' : 'En attente'}
                </span>
              </td>
              <td className="px-6 py-4">
                { formatDate(new Date(withdrawal.created_at), 'dd MMM yyy à HH:mm')}
              </td>
              <td className="px-6 py-4">
                {withdrawal.processed_at ? formatDate(new Date(withdrawal.processed_at), 'dd MMM yyy à HH:mm') : '-'}
              </td>
              <td className="px-6 py-4">
                <Link 
                  href={`/withdrawals/${withdrawal.id}`}
                  className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                >
                  <Eye className='w-4 h-4'/>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


function MerchantNameCell({ merchantId }: { merchantId: string }) {
  const { data: merchant, isLoading } = useQuery({
    queryKey: ['merchant', merchantId],
    queryFn: () => getMerchantById(String(merchantId)),
    enabled: !!merchantId, // évite les appels inutiles
  })

  if (isLoading) return <span className="text-gray-400 text-xs">Chargement...</span>
  if (!merchant) return <span className="text-gray-400 text-xs">Inconnu</span>

  return (
    <span>
      {merchant.business_name
        ? `${merchant.business_name}`
        : 'N/A'}
    </span>
  )
}

export function WithdrawalsPendingTable() {
  const { data: withdrawals, isLoading } = useQuery({
    queryKey: ['withdrawals'],
    queryFn: getWithdrawalRequests,
  })

  const pendingWithdrawals =
    withdrawals?.results.filter((m) => m.status === 'pending') || []

  return (
    <div className="bg-white rounded-lg shadow max-w-[100%]">
      <table className="table-fixed w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Marchand
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Montant
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Nom de compte
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              N° Compte
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Statut
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Fait le
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {isLoading ? (
            <tr>
              <td colSpan={8} className="text-center py-4">
                Chargement...
              </td>
            </tr>
          ) : pendingWithdrawals?.length === 0 ? (
            <tr>
              <td
                colSpan={8}
                className="px-6 py-5 text-center text-xs font-medium text-gray-500"
              >
                Aucune demande de retrait en attente
              </td>
            </tr>
          ) : (
            pendingWithdrawals.map((withdrawal) => (
              <tr key={withdrawal.id}>
                <td className="px-6 py-4 ">
                  <MerchantNameCell merchantId={withdrawal.merchant} />
                </td>
                <td className="px-6 py-4 ">
                  {new Intl.NumberFormat('fr-FR', {
                    style: 'currency',
                    currency: 'XOF',
                  }).format(withdrawal.amount)}
                </td>
                <td className="px-6 py-4">
                  {withdrawal.bank_name}
                </td>
                <td className="px-6 py-4 ">
                  {withdrawal.account_number}
                </td>
                <td className="px-6 py-4 ">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      withdrawal.status === 'approved'
                        ? 'bg-green-100 text-green-800'
                        : withdrawal.status === 'rejected'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {withdrawal.status === 'approved'
                      ? 'Traité'
                      : withdrawal.status === 'rejected'
                      ? 'Rejeté'
                      : 'En attente'}
                  </span>
                </td>
                <td className="px-6 py-4 ">
                  { formatDate(new Date(withdrawal.created_at), 'dd MMM yyy à HH:mm').toLocaleString()}
                </td>
                <td className="px-6 py-4 ">
                  <Link
                    href={`/withdrawals/${withdrawal.id}`}
                    className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                  >
                    <Eye className="w-4 h-4" />
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

export function WithdrawalsApprovedTable() {
  const { data: withdrawals, isLoading } = useQuery({
    queryKey: ['withdrawals'],
    queryFn: getWithdrawalRequests
  })

  const approvedWithdrawals = withdrawals?.results.filter(m => m.status === "approved") || [];

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Marchant</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Montant</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom de compte</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">N° Compte</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fait le</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Validé le</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          { isLoading ? (
            <tr>
              <td colSpan={8} className="text-center py-4">Chargement...</td>
            </tr>
          ) : approvedWithdrawals?.length===0 && (
            <tr>
              <td colSpan={8} className='px-6 py-5 text-center text-xs font-medium text-gray-500'>Aucune données disponible</td>
              </tr>
          )}
          {approvedWithdrawals?.map((withdrawal) => (
            <tr key={withdrawal.id}>
              <td className="px-6 py-4">
                <MerchantNameCell merchantId={withdrawal.merchant} />
              </td>
              <td className="px-6 py-4">{
                new Intl.NumberFormat('fr-FR', {
                  style: 'currency',
                  currency: 'XOF',
                }).format(withdrawal.amount)}</td>
              <td className="px-6 py-4">{withdrawal.bank_name}</td>
              <td className="px-6 py-4">{withdrawal.account_number}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  withdrawal.status === 'approved' ? 'bg-green-100 text-green-800' :
                  withdrawal.status === 'rejected' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {withdrawal.status === 'approved' ? 'Traité' : 
                   withdrawal.status === 'rejected' ? 'Rejeté' : 'En attente'}
                </span>
              </td>
              <td className="px-6 py-4">
                { formatDate(new Date(withdrawal.created_at), 'dd MMM yyy à HH:mm')}
              </td>
              <td className="px-6 py-4">
                {withdrawal.processed_at ? formatDate(new Date(withdrawal.processed_at), 'dd MMM yyy à HH:mm') : '-'}
              </td>
              <td className="px-6 py-4">
                <Link 
                  href={`/withdrawals/${withdrawal.id}`}
                  className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                >
                  <Eye className="w-4 h-4" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function WithdrawalsRejectedTable() {
  const { data: withdrawals, isLoading } = useQuery({
    queryKey: ['transactions'],
    queryFn: getWithdrawalRequests
  })

  const rejectedWithdrawals = withdrawals?.results.filter(m => m.status === "rejected") || [];

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Marchant</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Montant</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom de compte</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">N° Compte</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fait le</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rejeté le</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          { isLoading ? (
            <tr>
              <td colSpan={8} className="text-center py-4">Chargement...</td>
            </tr>
          ) : rejectedWithdrawals?.length===0 && (
            <tr>
              <td colSpan={8} className='px-6 py-5 text-center text-xs font-medium text-gray-500'>Aucune données disponible</td>
              </tr>
          )}
          {rejectedWithdrawals?.map((withdrawal) => (
            <tr key={withdrawal.id}>
              <td className="px-6 py-4">
                <MerchantNameCell merchantId={withdrawal.merchant} />
              </td>
              <td className="px-6 py-4">{
                new Intl.NumberFormat('fr-FR', {
                  style: 'currency',
                  currency: 'XOF',
                }).format(withdrawal.amount)}</td>
              <td className="px-6 py-4">{withdrawal.bank_name}</td>
              <td className="px-6 py-4">{withdrawal.account_number}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  withdrawal.status === 'approved' ? 'bg-green-100 text-green-800' :
                  withdrawal.status === 'rejected' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {withdrawal.status === 'approved' ? 'Traité' : 
                   withdrawal.status === 'rejected' ? 'Rejeté' : 'En attente'}
                </span>
              </td>
              <td className="px-6 py-4">
                { formatDate(new Date(withdrawal.created_at), 'dd MMM yyy à HH:mm')}
              </td>
              <td className="px-6 py-4">
                {withdrawal.processed_at ? formatDate(new Date(withdrawal.processed_at), 'dd MMM yyy à HH:mm') : '-'}
              </td>
              <td className="px-6 py-4">
                <Link 
                  href={`/withdrawals/${withdrawal.id}`}
                  className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                >
                  <Eye className="w-4 h-4" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}