import { Badge } from '@/components/ui/badge'

interface UserStatusBadgeProps {
  status: 'pending' | 'rejected' | 'approved'
}

export default function UserStatusBadge({ status }: UserStatusBadgeProps) {
  const statusMap = {
    approved: { label: 'Approuvé', variant: 'success' as const },
    pending: { label: 'En attente', variant: 'secondary' as const },
    rejected: { label: 'Rejeté', variant: 'destructive' as const },
  }

  return (
    <Badge variant={statusMap[status].variant}>
      {statusMap[status].label}
    </Badge>
  )
}