'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Props {
  userId: string
}

export default function ValidateButton({ userId }: Props) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSuspend = async () => {
    const ok = window.confirm('Voulez-vous vraiment activer le compte de cet utilisateur ?')
    if (!ok) return

    try {
      setLoading(true)
      const res = await fetch(`/users/${userId}/activate`, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        alert(`Impossible d'activer le compte de l'utilisateur : ${err?.detail || res.statusText}`)
        return
      }

      // Succès — refresh la page pour recharger les données
      router.refresh()
      alert('Utilisateur activé avec succès.')
    } catch (e) {
      console.error(e)
      alert("Erreur réseau lors de l'activation.") 
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleSuspend}
      disabled={loading}
      className="bg-(image:--side-border) hover:bg-(image:--sebpay-gradient-hover) text-white p-2"
    >
      {loading ? 'Activation...' : 'Activer le compte'}
    </button>
  )
}
