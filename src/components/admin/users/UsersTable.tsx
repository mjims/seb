'use client'
import { getUsers } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'
import UserStatusBadge from './UserStatusBadge'
import { SquarePen } from 'lucide-react'


export default function UsersTable() {

  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kyc</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-center" colSpan={2}>Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            { users?.count === 0 && (
              <tr>
                <td colSpan={8} className='px-6 py-5 text-center text-xs font-medium text-gray-500'>Aucune données disponible</td>
                </tr>
            )}
            
            {users?.results.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.first_name + ' ' + user.last_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.is_active === true 
                      ? "bg-green-100 text-green-800" 
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {user.is_active === true ? 'Actif' : 'Inactif'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                   {user.profile?.kyc_status ? <UserStatusBadge status={user.profile?.kyc_status } /> : "N/A"}
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <a href={`users/${ user.id}`}>Détails</a>
                </td>
                <td><SquarePen className='w-3 h-3'/></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}