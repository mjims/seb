'use client'
import { getPaymentsLink, getWithdrawalRequests } from '@/lib/api'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { CopyButton } from '@/components/ui/copy-button'
import { useQuery } from '@tanstack/react-query'
import { DateFormat } from '@/shared/config'

export default function PaymentLinksTable() {
  const { data: paymentLinks, isLoading } = useQuery({
    queryKey: ['paymentLinks'],
    queryFn: getPaymentsLink
  })

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Illimité'
    return new Date(dateString).toLocaleDateString('fr-FR')
  }
  var i = 1;
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Montant</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Créé le</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Début</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expire le</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lien</th>
              {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th> */}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paymentLinks?.results.map((link) => (
              <tr key={link.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {i++}
                  {/* <Link href={`/payments/${link.id}`} className="font-medium text-primary hover:underline">
                    {link.id}
                  </Link> */}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {link.amount ? `${link.amount} ${link.currency}` : 'Montant libre'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {formatDate(link.created_at)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  { link.start_date ? formatDate(link.start_date) : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {
                    link.end_date ? 
                      formatDate(link.end_date)
                    :"-"
                  }
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className="truncate max-w-xs">{link.image}</span>
                    <CopyButton value={link.image} />
                  </div>
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <Link
                    href={`/admin/payments/${link.id}`}
                    className={buttonVariants({ variant: 'outline', size: 'sm' })}
                  >
                    Gérer
                  </Link>
                </td> */}
              </tr>
              
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}