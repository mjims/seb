'use client'
import { use } from 'react'
import P2PTable from '@/components/admin/p2p/P2PTable'
import P2PFilters from '@/components/admin/p2p/Filters'
import { DollarSign } from 'lucide-react'
import Link from 'next/link';

type SearchParams = { status?: string; date?: string }

export default function P2pPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {

  const { status, date } = use(searchParams)
  return (
    <div className="p-6 space-y-6">
      <div className="gap-4 grid">
        <div className="route flex text-(size:--route-police) font-sans">
          <div className='route-item'>Dashboard</div>
          <div className='flex space-x-1 items-center'>
            <DollarSign className="w-4 h-4" />
            <span>P2P</span>
          </div>
        </div>
        <div className="dash-header flex justify-between p-4 bg-white">
          <div className="flex items-center">
            <strong>KYC</strong>
          </div>
          <div className="flex items-center space-x-4">
            <div className="btn">
              <Link href="/transactions/all" className="bg-(image:--side-border) hover:bg-(image:--sebpay-gradient-hover) text-white p-2">Hitorique</Link>
            </div>
            <div className="">
              <Link href="/transactions/approved" className="border border-(--link-simple-border) p-2 hover:bg-(--link-simple-bg-hover)">Transactions  approuvés</Link>
            </div>
          </div>
        </div>

        <P2PFilters />
      </div>

      <P2PTable status={status} date={date} />
    </div>
  )
}