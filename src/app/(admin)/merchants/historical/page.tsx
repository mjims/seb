'use client'

import { useQuery } from '@tanstack/react-query';
import { getHistoricals } from '@/lib/api'
import { User, SquarePen } from 'lucide-react'
import Link from 'next/link';



export default function HistoricalPage() {
  
  const { data: historicals, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: getHistoricals
  })

  return (
    <div className="p-6 space-y-6">
      <div className="gap-4 grid">
        <div className="route flex text-(size:--route-police) font-sans">
          <div className='route-item'>Dashboard</div>
          <div className='flex space-x-1 items-center'>
            <User className="w-4 h-4" />
            <span>Users</span>
          </div> 
        </div>

        <div className="dash-header flex justify-between p-4 bg-white">
          <div className="flex items-center">
            <strong>Historiques</strong>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/users/pending" className="bg-(image:--side-border) hover:bg-(image:--sebpay-gradient-hover) text-white p-2">Validation en attente</Link>
            <Link href="/users/approved" className="border border-(--link-simple-border) p-2 hover:bg-(--link-simple-bg-hover)">Utilisateurs validés</Link>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Marchand</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Note</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-center">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading && (
              <tr className="p-6">
                <td colSpan={5} className="text-center">Chargement...</td>
              </tr>
            )}
            
            {historicals?.results.map((hist) => (
              <tr key={hist.id}>
                <td className="px-6 py-4 whitespace-nowrap">{hist.merchant}</td>
                <td className="px-6 py-4 whitespace-nowrap">{hist.status}</td>
                <td className="px-6 py-4 whitespace-nowrap">{hist.notes}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(hist.timestamp).toLocaleString('fr-FR')}</td>
                <td><SquarePen className='w-3 h-3'/></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
