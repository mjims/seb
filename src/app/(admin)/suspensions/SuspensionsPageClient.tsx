// app/(admin)/suspensions/SuspensionsPageClient.tsx
'use client'

import { useState, Children, isValidElement, cloneElement } from 'react'

interface SuspendableComponentProps {
  onLiftSuspension?: (id: string) => Promise<void>
  isLifting?: boolean
}

interface SuspensionsPageClientProps {
  children: React.ReactElement<SuspendableComponentProps> | React.ReactElement<SuspendableComponentProps>[]
}

export function SuspensionsPageClient({ children }: SuspensionsPageClientProps) {
  const [isLifting, setIsLifting] = useState(false)

  const handleLiftSuspension = async (id: string) => {
    setIsLifting(true)
    try {
      // Appel API pour lever la suspension
      const response = await fetch(`/api/suspensions/${id}/lift`, {
        method: 'POST'
      })
      if (!response.ok) throw new Error('Échec de la levée')
      // Recharger les données ou autre logique
    } finally {
      setIsLifting(false)
    }
  }

  return (
    <>
      {Children.map(children, child => {
        if (isValidElement(child)) {
          return cloneElement(child, { 
            onLiftSuspension: handleLiftSuspension,
            isLifting
          })
        }
        return child
      })}
    </>
  )
}