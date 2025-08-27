// components/admin/KYC/KYCStatusBadge.tsx
interface KYCStatusBadgeProps {
  status: 'pending' | 'approved' | 'rejected';
}

export default function KYCStatusBadge({ status }: KYCStatusBadgeProps) {
  const statusConfig = {
    pending: {
      text: 'En attente',
      className: 'bg-yellow-100 text-yellow-800' 
    },
    approved: {
      text: 'Approuvé',
      className: 'bg-green-100 text-green-800'
    },
    rejected: {
      text: 'Rejeté',
      className: 'bg-red-100 text-red-800'
    }
  }

  return (
    <span className={`px-2 py-1 rounded-full text-xs ${statusConfig[status].className}`}>
      {statusConfig[status].text}
    </span>
  )
}