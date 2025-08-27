'use client'

import { useState } from 'react'
import SuspensionInfoCard from './SuspensionInfoCard'
import LiftSuspensionForm from './LiftSuspensionForm'
import SuspensionDetailHeader from './SuspensionDetailHeader'
import { User } from 'lucide-react'
import Link from 'next/link'
import { AccountSuspensionType } from '@/types/account-suspension'

export default function SuspensionDetailClient({
  suspension,
}: {
  suspension: AccountSuspensionType
}) {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="p-6 space-y-6">      
      <div className="gap-4 grid">
        <div className="route flex text-(size:--route-police) font-sans">
          <div className='route-item'>Dashboard</div>
          <div className='flex space-x-1 items-center route-item'>
            <User className="w-4 h-4" />
            <span>Suspension</span>
          </div>
          <div className='flex space-x-1 items-center'>
            <span>User</span>
          </div>
        </div>

        <div className="dash-header flex justify-between p-4 bg-white">
          <div className="flex items-center">
            <strong>Suspension</strong>
          </div>

          <div className="flex items-center space-x-4">
            {suspension.status === 'active' && (
              <div className="btn">
                <button
                  onClick={() => setShowForm(prev => !prev)}
                  className="bg-(image:--side-border) hover:bg-(image:--sebpay-gradient-hover) text-white p-2"
                >
                  {showForm ? 'Annuler' : 'Lever la suspension'}
                </button>
              </div>
            )}
            <div>
              <Link
                href="/suspensions"
                title="Retour à suspensions"
                className="border border-(--link-simple-border) p-2 hover:bg-(--link-simple-bg-hover)"
                
              />
            </div>
          </div>
        </div>
      </div>

      <SuspensionDetailHeader suspension={suspension} />

      <div className="">
        <div className="lg:col-span-2">
          {showForm ? (
            <div className='flex justify-center'>
              <LiftSuspensionForm suspensionId={suspension.id} />
            </div>            
          ) : (
            <div className='w-[90%] m-auto'>
              <SuspensionInfoCard suspension={suspension} />
            </div>            
          )}
        </div>
      </div>
    </div>
  )
}
