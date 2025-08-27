// components/admin/P2Ps/P2PStatusBadge.tsx
import { Badge } from '@/components/ui/badge'

interface P2PStatusBadgeProps {
  status: 'completed' | 'pending' | 'failed' | 'refunded'
}

export default function P2PStatusBadge({ status }: P2PStatusBadgeProps) {
  const statusMap = {
    completed: { label: 'Complétée', variant: 'success' as const },
    pending: { label: 'En attente', variant: 'secondary' as const },
    failed: { label: 'Échouée', variant: 'destructive' as const },
    refunded: { label: 'Remboursée', variant: 'default' as const }
  }

  return (
    <Badge variant={statusMap[status].variant}>
      {statusMap[status].label}
    </Badge>
  )
}