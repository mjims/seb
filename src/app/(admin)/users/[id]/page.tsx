import UserDetailHeader from '@/components/admin/users/UserDetailHeader'
import UserInfoCard from '@/components/admin/users/UserInfoCard'
import UserActivity from '@/components/admin/users/UserActivity'
import { getUserById } from '@/lib/api-client'
import { User } from 'lucide-react'
import Link from 'next/link';
import { notFound } from 'next/navigation'


export default async function UserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const user = await getUserById(id)

  if (!user) return notFound()

  return (
    <div className="p-6 space-y-6">      
      <div className="gap-4 grid">
        <div className="route flex text-(size:--route-police) font-sans">
          <div className='route-item'>Dashboard</div>
          <div className='flex space-x-1 items-center route-item'>
            <User className="w-4 h-4" />
            <span>User</span>
          </div>
          <div className='flex space-x-1 items-center'>
            <span>{ user.first_name+' '+user.last_name }</span>
          </div>
        </div>

        <div className="dash-header flex justify-between p-4 bg-white">
          <div className="flex items-center">
            <strong>User Infos</strong>
          </div>

          <div className="flex items-center space-x-4">
            {user?.is_active === true && (
              <div className="btn">
                <button
                  className="bg-(image:--side-border) hover:bg-(image:--sebpay-gradient-hover) text-white p-2"
                >
                  Suspendre
                </button>
              </div>
            )}
            <div>
              <Link href="/users" className="border border-(--link-simple-border) p-2 hover:bg-(--link-simple-bg-hover)">
                Retour
              </Link>
            </div>
          </div>
        </div>
      </div>
      <UserDetailHeader user={user} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <UserInfoCard user={user} />
        </div>
        <div className="md:col-span-1">
          <UserActivity userId={user.id} />
        </div>
      </div>
    </div>
  )
}