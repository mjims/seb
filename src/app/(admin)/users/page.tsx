'use client'
import { User } from 'lucide-react'
import UsersTable from '@/components/admin/users/UsersTable';
import Link from 'next/link';



export default function UsersPage() {
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
            <strong>Les utilisateurs</strong>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/users/pending" className="bg-(image:--side-border) hover:bg-(image:--sebpay-gradient-hover) text-white p-2">Validation en attente</Link>
            <Link href="/users/approved" className="border border-(--link-simple-border) p-2 hover:bg-(--link-simple-bg-hover)">Utilisateurs validés</Link>
          </div>
        </div>
      </div>
      <UsersTable />
    </div>
  )
}
