'use client'
import Link from 'next/link'
import TransactionStatusBadge from './TransactionStatusBadge'
import { getTransactions } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'


export default function TransactionsTable({
  status,
  date,
}: {
  status?: string
  date?: string
}) {

  const { data: transactions, isLoading } = useQuery({
    queryKey: ['transactions'],
    queryFn: getTransactions
  })

  const filteredTransactions = transactions?.results.filter(tx => {
    if (status && tx.status !== status) return false
    if (date) {
      const txDate = new Date(tx.created_at).toISOString().split('T')[0]
      if (txDate !== date) return false
    }
    return true
  })

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
            { transactions?.results.length === 0 && (
              <tr>
                <td colSpan={8} className='px-6 py-5 text-center text-xs font-medium text-gray-500'>Aucune données disponible</td>
              </tr>
            )}
            
            {filteredTransactions?.map((tx) => (
              <tr key={tx.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link href={`/transactions/${tx.id}`} className="font-medium text-primary hover:underline">
                    {tx.reference}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {formatAmount(tx.amount, tx.currency)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {tx.customer_name}
                  {/* <Link href={`/admin/users/${tx.sender.id}`} className="hover:underline">
                    
                  </Link> */}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link href={`/transactions/${tx.merchant}`} className="hover:underline">
                    {tx.merchant}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{tx.operator}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <TransactionStatusBadge status={tx.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(tx.created_at).toLocaleString('fr-FR')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link 
                    href={`/transactions/${tx.id}`}
                    className="text-primary hover:text-primary/80 text-sm font-medium"
                  >
                    Détails
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}