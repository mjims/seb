'use client'
import Link from 'next/link'
import P2PStatusBadge from './P2PStatusBadge'
import { getP2Ps } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'


export default function P2PsTable({
  status,
  date,
}: {
  status?: string
  date?: string
}) {

  const { data: P2Ps, isLoading } = useQuery({
    queryKey: ['p2p'],
    queryFn: getP2Ps
  })

  // const filteredP2Ps = transactions.filter(tx => {
  //   if (status && tx.status !== status) return false
  //   if (date) {
  //     const txDate = new Date(tx.date).toISOString().split('T')[0]
  //     if (txDate !== date) return false
  //   }
  //   return true
  // })

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency
    }).format(amount)
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Référence</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Montant</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expéditeur</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Destinataire</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Méthode</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            { P2Ps?.length===0 && (
              <tr>
                <td colSpan={8} className='px-6 py-5 text-center text-xs font-medium text-gray-500'>Aucune données disponible</td>
                </tr>
            )}
            
            {/* {filteredTransactions.map((tx) => (
              <tr key={tx.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link href={`/admin/transactions/${tx.id}`} className="font-medium text-primary hover:underline">
                    {tx.reference}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {formatAmount(tx.amount, tx.currency)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link href={`/admin/users/${tx.sender.id}`} className="hover:underline">
                    {tx.sender.name}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link href={`/admin/users/${tx.recipient.id}`} className="hover:underline">
                    {tx.recipient.name}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{tx.paymentMethod}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <TransactionStatusBadge status={tx.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(tx.date).toLocaleString('fr-FR')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link 
                    href={`/admin/transactions/${tx.id}`}
                    className="text-primary hover:text-primary/80 text-sm font-medium"
                  >
                    Détails
                  </Link>
                </td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </div>
  )
}