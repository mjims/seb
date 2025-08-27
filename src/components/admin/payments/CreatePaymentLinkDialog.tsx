// components/admin/Payments/CreatePaymentLinkDialog.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
export default function CreatePaymentLinkDialog({
  children,
}: {
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Créer un nouveau lien de paiement</DialogTitle>
        </DialogHeader>
        {/* <PaymentLinkForm onSuccess={() => setOpen(false)} /> */}
      </DialogContent>
    </Dialog>
  )
}