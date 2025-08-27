// components/admin/Dashboard/RecentActivity.tsx
import { Clock, User, FileText, CheckCircle2, XCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface ActivityItem {
  id: string
  type: 'user' | 'kyc' | 'transaction'
  action: 'created' | 'approved' | 'rejected' | 'completed'
  user: string
  timestamp: string
}

export default function RecentActivity() {
  
  
  const activities: ActivityItem[] = [
    {
      id: '1',
      type: 'user',
      action: 'created',
      user: 'Jean Dupont',
      timestamp: '2023-11-15T14:32:00Z'
    },
    {
      id: '2',
      type: 'kyc',
      action: 'approved',
      user: 'Marie Martin',
      timestamp: '2023-11-15T12:15:00Z'
    },
    {
      id: '3',
      type: 'transaction',
      action: 'completed',
      user: 'Sophie Lambert',
      timestamp: '2023-11-15T10:45:00Z'
    },
    {
      id: '4',
      type: 'kyc',
      action: 'rejected',
      user: 'Pierre Durand',
      timestamp: '2023-11-15T09:30:00Z'
    }
  ]

  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'user':
        return <User className="h-4 w-4" />
      case 'kyc':
        return <FileText className="h-4 w-4" />
      case 'transaction':
        return <CheckCircle2 className="h-4 w-4" />
      default:
        return null
    }
  }

  const getActionBadge = (action: ActivityItem['action']) => {
    switch (action) {
      case 'created':
        return <Badge variant="secondary">Créé</Badge>
      case 'approved':
        return <Badge variant="success">Approuvé</Badge>
      case 'rejected':
        return <Badge variant="destructive">Rejeté</Badge>
      case 'completed':
        return <Badge variant="default">Complété</Badge>
      default:
        return null
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Clock className="h-5 w-5 text-gray-500" />
        <h2 className="font-semibold">Activité récente</h2>
      </div>

      <div className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3">
            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 mt-1">
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-medium">{activity.user}</p>
                {getActionBadge(activity.action)}
              </div>
              <p className="text-sm text-gray-500">
                {activity.type === 'user' && 'Nouvel utilisateur enregistré'}
                {activity.type === 'kyc' && 'Document KYC traité'}
                {activity.type === 'transaction' && 'Transaction effectuée'}
              </p>
            </div>
            <div className="text-xs text-gray-400">
              {formatDate(activity.timestamp)}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2">
        <button className="text-sm text-primary hover:underline">
          Voir toute l&apos;activité
        </button>
      </div>
    </div>
  )
}