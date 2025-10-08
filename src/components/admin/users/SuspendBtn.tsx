'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Props {
  userId: string
}

export default function SuspendButton({ userId }: Props) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSuspend = async () => {
    const ok = window.confirm('Voulez-vous vraiment suspendre cet utilisateur ?')
    if (!ok) return

    try {
      setLoading(true)
      const res = await fetch(`/users/${userId}/suspend`, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        alert(`Impossible de suspendre l'utilisateur : ${err?.detail || res.statusText}`)
        return
      }

      // Succès — refresh la page pour recharger les données
      router.refresh()
      alert('Utilisateur suspendu avec succès.')
    } catch (e) {
      console.error(e)
      alert('Erreur réseau lors de la suspension.')
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
      {loading ? 'Suspension...' : 'Suspendre'}
    </button>
  )
}
