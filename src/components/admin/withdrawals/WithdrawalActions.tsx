'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Props {
  withdrawalID: string,
  action: string,
}

export default function WithdrawalButton({ withdrawalID, action }: Props) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSuspend = async () => {
    const ok = window.confirm(`Voulez-vous vraiment ${action} la transaction ?`)
    if (!ok) return

    const page = action === "approuver" ? "approve" : "rejecte"

    try {
      setLoading(true)
      const res = await fetch(`/api/withdrawals/${withdrawalID}/${page}`, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        alert(`Erreur lors de l'exécution : ${err?.detail || res.statusText}`)
        return
      }

      // Succès — refresh la page pour recharger les données
      router.refresh()
      alert('Requête exécuté avec succès.')
    } catch (e) {
      console.error(e)
      alert("Erreur réseau lors de l'exécution.") 
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleSuspend}
      disabled={loading}
      className={action === "approuver" ? 'bg-[#0d3a0d] p-2 px-6  text-white font-bold cursor-pointer' : 'bg-[#8c2929] text-white mx-8 p-2 px-6 cursor-pointer'}
    >
        {action === "approuver" ? (
             loading ? 'Validation...' : 'Valider'
        ) : (
            loading ? ('Rejection...') : ('Rejeter')
        )}
        
    </button>
  )
}
