// components/admin/Dashboard/StatsCard.tsx
interface StatsCardProps {
  title: string
  value?: number
  change: string
}

export default function StatsCard({ title, value, change }: StatsCardProps) {
  const isPositive = change.startsWith('+')
  
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-gray-500 text-sm">00{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
      <p className={`text-sm mt-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        {change} vs mois dernier
      </p>
    </div>
  )
}