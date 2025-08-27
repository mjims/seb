// app/(admin)/suspensions/page.tsx
import SuspensionsTable from '@/components/admin/suspensions/SuspensionsTable'
import { UserX } from 'lucide-react'

// Composant client pour gérer les interactions
import { SuspensionsPageClient } from './SuspensionsPageClient'

export default function SuspensionsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2">
        <UserX className="w-6 h-6" />
        <h1 className="text-2xl font-bold">Suspensions de compte</h1>
      </div>
      
      {/* On passe le composant table au client */}
      <SuspensionsPageClient>
        <SuspensionsTable />
      </SuspensionsPageClient>
    </div>
  )
}