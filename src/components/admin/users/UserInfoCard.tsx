// components/admin/Users/UserInfoCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { Mail, Smartphone, Calendar, CreditCard, FileText, Shield } from 'lucide-react'
import { UserType } from '@/types/user'

interface UserInfoCardProps {
  user: UserType
}

export default function UserInfoCard({ user }: UserInfoCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations utilisateur</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p>{user.email}</p>
            </div>
          </div>

          {user.phone && (
            <div className="flex items-center gap-3">
              <Smartphone className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Téléphone</p>
                <p>{user.phone}</p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Inscrit le</p>
              <p>{format(new Date(user.date_joined), 'PPP')}</p>
            </div>
          </div>

          {user.last_login && (
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Dernière connexion</p>
                <p>{format(new Date(user.last_login), 'PPPp')}</p>
              </div>
            </div>
          )}
        </div>

        <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Statut KYC</p>
              <Badge variant={
                user.profile?.kyc_status === 'approved' ? 'success' :
                user.profile?.kyc_status === 'pending' ? 'warning' : 'destructive'
              }>
                {user.profile?.kyc_status === 'approved' ? 'Vérifié' :
                 user.profile?.kyc_status === 'pending' ? 'En attente' : 
                 user.profile?.kyc_status === 'rejected' ? 'Rejeté' : 'Not apply'}
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <CreditCard className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Solde</p>
              <p className="font-medium">
                {new Intl.NumberFormat('fr-FR', {
                  style: 'currency',
                  currency: 'EUR'
                }).format(101000)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}