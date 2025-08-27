import WithdrawalsTable from '@/components/admin/withdrawals/WithdrawalsTable'
import { Banknote } from 'lucide-react'
import Link from 'next/link';

export default function WithdrawalsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="gap-4 grid">
        <div className="route flex text-(size:--route-police) font-sans">
          <div className='route-item'>Dashboard</div>
          <div className='flex space-x-1 items-center'>
            <Banknote className="w-4 h-4" />
            <span>Withdrawals</span>
          </div>
        </div>
        <div className="dash-header flex justify-between p-4 bg-white">
          <div className="flex items-center">
            <strong>Demandes</strong>
          </div>
          <div className="flex items-center space-x-4">
            <div className="btn">
              <Link href="/withdrawals/" className="bg-(image:--side-border) hover:bg-(image:--sebpay-gradient-hover) text-white p-2">Demandes de retraits</Link>
            </div>
            <div className="">
              <Link href="/withdrawals/approved" className="border border-(--link-simple-border) p-2 hover:bg-(--link-simple-bg-hover)">Retraits approuvés</Link>
            </div>
          </div>
        </div>
      </div>
      
      <WithdrawalsTable />
    </div>
  )
}