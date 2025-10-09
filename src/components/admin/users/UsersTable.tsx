'use client'
import { getUsers } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'
import { Eye, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { deleteUser } from '@/lib/api'
import { useRouter } from 'next/navigation'


export default function UsersTable() {
  const [loadingUserId, setLoadingUserId] = useState<string | null>(null)
    const router = useRouter()

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

  const handleDelete = async (userId: string) => {
    setLoadingUserId(userId)
    try {
      const ok = window.confirm(`Voulez-vous vraiment supprimer cet utilisateur ?`)
    if (!ok) return
      const res = await deleteUser(userId)
      

      // Succès — refresh la page pour recharger les données
      router.refresh()
      alert('Utilisateur supprimé avec succès.')

    } catch (error) {
      alert("Un problème est survenu lors de la suppression ")
    } finally {
      setLoadingUserId(null)
    }
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
              <th colSpan={2} className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
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
                  {user.profile?.kyc_status==='approved' && (<Badge variant='success'>Approuvé</Badge>)}
                  {user.profile?.kyc_status==='pending' && (<Badge variant='pending'>En attente</Badge>)}
                  {user.profile?.kyc_status==='rejected' && (<Badge variant='destructive'>Rejeté</Badge>)}

                   {!user.profile?.kyc_status && "N/A"}
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <a href={`users/${ user.id}`}>
                    <Eye className='w-4 h-4'/>
                  </a>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(user.id)}
                    disabled={loadingUserId === user.id}
                    className="text-amber-700 hover:text-amber-900"
                  >
                    {loadingUserId === user.id ? (
                      <span className="text-[12px]">Deleting...</span>
                    ) : (
                      <div className='w-[60px] text-center'>
                        <Trash2 className="w-4 h-4" />
                      </div>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}