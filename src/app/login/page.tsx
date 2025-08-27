'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Eye, EyeOff } from 'lucide-react'

import Cookies from 'js-cookie'
import { axiosInstance } from '@/lib/axios'
import { AppCookies } from '@/shared/config'
import { Endpoints } from '@/shared/endpoints'
import { useAuthStore } from '@/stores/user'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  // Vérification si l'utilisateur est déjà connecté
  useEffect(() => {
    const accessToken = Cookies.get(AppCookies.ACCESS_TOKEN)
    if (accessToken) {
      router.push('/dashboard')
    }
  }, [])

  const setUser = useAuthStore((state) => state.setUser)

  const handleSubmit = async (e: React.FormEvent) => { 
    e.preventDefault()
    setError('')

    try {
      const response = await axiosInstance.post('http://localhost:8000/'+Endpoints.JWT_CREATE, {
        email,
        password,
      })

      const { access, refresh } = response.data

      // Stockage des tokens dans les cookies
      Cookies.set(AppCookies.ACCESS_TOKEN, access, { secure: true })
      Cookies.set(AppCookies.REFRESH_TOKEN, refresh, { secure: true })

      // Décodage du token
      // const payload = JSON.parse(atob(access.split('.')[1]))
      // setUser({ email: payload.email, id: payload.user_id })

      // Redirection
      router.push('/dashboard')

    } catch (err: unknown) {
      console.error(err)
      setError('Identifiants incorrects ou problème serveur.')
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 min:h-[600px]">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <div className="relative flex flex-col items-center justify-center mb-3">
          <h1 className="my-2 text-xl font-bold text-primary lg:text-3xl text-[#9b2c6b]">Sebpay</h1>
          <p className="">Se connecter au dashboard admin</p>
        </div>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full border px-3 py-2 rounded-lg"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1">Mot de passe</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600 hover:text-black eyes"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>


        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Se connecter
        </button>
      </form>
      <style jsx>{`
        .bg-primary {
          background-color: #f276fa; /* Couleur primaire */
        }
        button[type="submit"] {
          background-color: rgb(137, 37, 93);
          transition: background-color 0.3s ease;
        }
        button[type="submit"]:hover {
          background-color: rgba(155, 44, 107, 0.9);
        }
        input{
        outline: none;
        border: 1px solid #ccc;
        transition: border-color 0.3s ease;
        }
        input:focus {
          border-color: rgb(232, 82, 77);
        }       

      `}</style>
    </div>
  )
}
