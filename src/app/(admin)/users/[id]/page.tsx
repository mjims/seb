import UserDetailHeader from '@/components/admin/users/UserDetailHeader'
import UserInfoCard from '@/components/admin/users/UserInfoCard'
import UserActivity from '@/components/admin/users/UserActivity'
import { getUserById } from '@/lib/api-client'
import { User } from 'lucide-react'
import Link from 'next/link';
import { notFound } from 'next/navigation'
import SuspendButton from '@/components/admin/users/SuspendBtn'
import ValidateButton from '@/components/admin/users/ValidateBtn'


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
          <div className='route-item'>Dashboard</div>
          <div className='flex space-x-1 items-center'>
            <span>{ user.first_name+' '+user.last_name }</span>
          </div>
        </div>

        <div className="dash-header flex justify-between p-4 bg-white">
          <div className="flex items-center">
            <strong>User Infos</strong>
          </div>
          
          <div className="flex items-center space-x-4">
              {user?.profile.kyc_status !=="approved" && (
                <div>
                <Link href={`/kyc/${user.id}`} className="border border-(--link-simple-border) p-2 hover:bg-(--link-simple-bg-hover)">
                  Document(s) KYC
                </Link>
              </div>
              )}
            {user?.is_active === true ? (
              <div className="btn">
                <SuspendButton userId={user.id} />
              </div>
            ) : (
              <div className="btn">
                <ValidateButton userId={user.id} />
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
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="md:col-span-3">
          <UserInfoCard user={user} />
        </div>
        <div className="md:col-span-2">
          <UserActivity user={user} />
        </div>
      </div>
    </div>
  )
}