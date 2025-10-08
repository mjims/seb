// app/admin/kyc/page.tsx
'use client';
import KYCTable from '@/components/admin/kyc/KYCMerchantTable'
import { FileText } from 'lucide-react'
import Link from 'next/link';

export default function KYCPending() {
  return (
    <div className="p-6 space-y-6">
      <div className="gap-4 grid">
        <div className="route flex text-(size:--route-police) font-sans">
          <div className='route-item'>Dashboard</div>
          <div className='flex space-x-1 items-center route-item'>
            <FileText className="w-4 h-4" />
            <span>KYC</span>
          </div>
          <div>Pendding</div>
        </div>
        <div className="dash-header flex justify-between p-4 bg-white">
          <div className="flex items-center">
            <strong>KYC</strong>
          </div>
          <div className="flex items-center space-x-4">
            <div className="btn">
              <Link href="/kyc/approved" className="bg-(image:--side-border) hover:bg-(image:--sebpay-gradient-hover) text-white p-2">KYC validé</Link>
            </div>
            <div className="">
              <Link href="/kyc/" className="border border-(--link-simple-border) p-2 hover:bg-(--link-simple-bg-hover)">Retour</Link>
            </div>
          </div>
        </div>
      </div>
      
      <KYCTable />

      <style jsx>{`

      `}</style>
    </div>
  )
}
