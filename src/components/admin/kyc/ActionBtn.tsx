'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Props {
  docId: string,
  userType: string,
  action: string,
}

export default function ActionButton({ docId, userType, action }: Props) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSuspend = async () => {
    const ok = window.confirm(`Voulez-vous vraiment ${action} ce document ?`)
    if (!ok) return

    const url = userType === "merchant" ? "/kyc/merchants/" : "/kyc/individuals/"
    const page = action === "valider" ? "validate" : "rejecte"

    try {
      setLoading(true)
      const res = await fetch(`/api${url+docId}/${page}`, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        alert(`Impossible de mettre à jour le status du document : ${err?.detail || res.statusText}`)
        return
      }

      // Succès — refresh la page pour recharger les données
      router.refresh()
      alert('Document mis à jour evec succès.')
    } catch (e) {
      console.error(e)
      alert("Erreur réseau lors de l'action.") 
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleSuspend}
      disabled={loading}
      className=""
    >
        {action === "valider" ? (
             loading ? 'Activation...' : 'Valider'
        ) : (
            loading ? ('Rejection...') : ('Rejeter')
        )}
        
    </button>
  )
}
