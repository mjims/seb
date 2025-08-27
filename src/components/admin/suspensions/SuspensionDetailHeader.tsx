// components/admin/Suspensions/SuspensionDetailHeader.tsx
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, User, UserX, Calendar, AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'

interface SuspensionDetailHeaderProps {
  suspension: {
  merchant: string;
  merchant_name: string;
  reason:
    | 'unusual_activity'
    | 'kyc_incomplete'
    | 'compliance_check'
    | 'fraud_suspicion'
    | 'manual_review';
  description: string;
  required_documents: string[];
  status: 'active' | 'resolved' | 'escalated'; 
  suspended_by: string;
  suspended_by_name: string;
  resolved_by?: string;
  resolved_by_name?: string;
  resolution_notes?: string;
  created_at: string;
  resolved_at?: string;
  }
}

export default function SuspensionDetailHeader({ suspension }: SuspensionDetailHeaderProps) {
  return (
    <div className="flex items-start justify-between">
      <div>        
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100">
            <UserX className="h-8 w-8 text-gray-500" />
          </div>
          
          <div>
            <h1 className="text-2xl font-bold">
              Suspension de compte
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <User className="mr-2 h-4 w-4" />
                <Link href={`/users/${suspension.merchant}`} className="hover:underline">
                  {suspension.merchant_name}
                </Link>
              </div>
              
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-2 h-4 w-4" />
                {format(new Date(suspension.created_at), 'PPP')}
              </div>
              
              <Badge variant={suspension.status === 'active' ? 'destructive' : 'success'}>
                {suspension.status === 'active' ? 'Active' : 'Levée'}
              </Badge>
              
              <div className="flex items-center text-sm text-muted-foreground">
                <AlertTriangle className="mr-2 h-4 w-4" />
                {suspension.reason}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}