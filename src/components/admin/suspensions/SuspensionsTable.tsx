'use client'
import { getAccountSuspensions } from '@/lib/api'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'

interface SuspensionsTableProps {
  liftSuspension?: (id: string) => void
  isLifting?: boolean
}

export default function SuspensionsTable({ 
  liftSuspension,
  isLifting
}: SuspensionsTableProps) {

  const { data: suspensions, isLoading } = useQuery({
    queryKey: ['suspensions'],
    queryFn: getAccountSuspensions
  })
  
  let numero = 1;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200 px-2">
        <thead className="bg-gray-50">
          <tr className='bg-gray-50 px-2'>
            <th className='text-center py-3 whitespace-nowrap'>N°</th>
            <th className='text-left py-3 whitespace-nowrap'>Marchant</th>
            <th className='text-left py-3 whitespace-nowrap'>Raison</th>
            <th className='text-left py-3 whitespace-nowrap'>Supendu le</th>
            <th className='text-left py-3 whitespace-nowrap'>Suspendu par</th>
            <th className='text-left py-3 whitespace-nowrap'>Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          
          {isLoading ? (
            <tr>
              <td colSpan={6} className="text-center py-4">Chargement...</td>
            </tr>
          ) : suspensions?.count === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-4">Aucune donnée disponible</td>
            </tr>
          ) : (suspensions?.results.map((suspension) => (
              <tr key={suspension.id}>
                <td className="py-2 whitespace-nowrap space-x-2 px-2 text-center">{numero++}</td>
                <td className="py-2 whitespace-nowrap space-x-2">{suspension.merchant_name}</td>
                <td className="py-2 whitespace-nowrap space-x-2">{suspension.reason}</td>
                <td className="py-2 whitespace-nowrap space-x-2">{suspension.created_at}</td>
                <td className="py-2 whitespace-nowrap space-x-2">{suspension.suspended_by_name}</td>
                <td className="py-2 whitespace-nowrap space-x-2">
                  {suspension.status === 'active' && liftSuspension && (
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => liftSuspension(suspension.id)}
                      disabled={isLifting}
                    >
                      {isLifting ? 'Traitement...' : 'Lever la suspension'}
                    </Button>
                  )}
                  <Link 
                    href={`/suspensions/${suspension.id}`}
                    className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                  >
                    Détails
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