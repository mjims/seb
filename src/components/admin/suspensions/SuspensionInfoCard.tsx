// components/admin/Suspensions/SuspensionInfoCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { User, UserX, Calendar, Shield, FileText } from 'lucide-react'
import { format } from 'date-fns'

interface SuspensionInfoCardProps {
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

export default function SuspensionInfoCard({ suspension }: SuspensionInfoCardProps) {
  return (
    <Card className='border border-(--link-simple-border)'>
      <CardHeader>
        <CardTitle>Détails de la suspension</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Utilisateur</p>
              <p className="font-medium">{suspension.merchant_name}</p>
              <p className="text-sm text-muted-foreground">{suspension.merchant_name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Suspendu par</p>
              <p className="font-medium">{suspension.suspended_by_name}</p>
            </div>
          </div>
        </div>

        <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Date de suspension</p>
              <p>{format(new Date(suspension.created_at), 'PPPp')}</p>
            </div>
          </div>

          {suspension.status === 'resolved' && suspension.resolved_at && (
            <div className="flex items-center gap-3">
              <UserX className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Levée le</p>
                <p>{format(new Date(suspension.resolved_at), 'PPPp')}</p>
                {suspension.resolved_by_name && (
                  <p className="text-sm text-muted-foreground">Par {suspension.resolved_by_name}</p>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="border-t pt-4">
          <div className="flex items-start gap-3">
            <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">Raison</p>
              <p className="font-medium">{suspension.reason}</p>
            </div>
          </div>
        </div>

        {suspension.description && (
          <div className="border-t pt-4">
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Notes supplémentaires</p>
                <p className="font-medium">{suspension.description}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}