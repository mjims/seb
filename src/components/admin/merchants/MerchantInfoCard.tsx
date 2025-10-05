// components/admin/Merchants/MerchantInfoCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Calendar, 
  FileText, 
  CreditCard, 
  User,
  Shield,
  MapPin,
  ShoppingBag,
  BriefcaseBusiness
} from 'lucide-react'
import { format } from 'date-fns'
import { MerchantType } from '@/types/merchant'

interface MerchantInfoCardProps {
  merchant: MerchantType
}

export default function MerchantInfoCard({ merchant }: MerchantInfoCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations du marchand</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="flex items-center gap-3">
            <BriefcaseBusiness className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Type de business</p>
              <p className="font-medium">{merchant.business_type}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Date d&aposinscription</p>
              <p>{format(new Date(merchant.created_at), 'PPP')}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Statut KYC</p>
              <Badge variant={
                merchant.verification_status === 'approved' ? 'success' :
                merchant.verification_status === 'pending' ? 'warning' : 'destructive'
              }>
                {merchant.verification_status === 'approved' ? 'Vérifié' :
                 merchant.verification_status === 'pending' ? 'En attente' : 'Rejeté'}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Propriétaire</p>
              <p className="font-medium">
                <a 
                  href={`/merchant/${merchant.id}`} 
                  className="hover:underline"
                >
                  {merchant.business_name}
                </a>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ShoppingBag className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Description</p>
              <p className="font-medium">{merchant.description}</p>
            </div>
          </div>

          {merchant.country_code && (
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Pays</p>
                <p className="font-medium">{merchant.country_code}</p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3">
            <CreditCard className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Balance total</p>
              <p className="font-medium">
                {new Intl.NumberFormat('fr-FR', {
                  style: 'currency',
                  currency: 'cfa'
                }).format(merchant.real_balance)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}