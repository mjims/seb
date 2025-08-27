'use client'
import { useEffect, useRef, useState } from 'react'
import Sidebar from '@/components/admin/sidebar/Sidebar';
import Image from 'next/image';
import profile from '../../../public/logo.png';
import Cookies from "js-cookie"
import {
  List,
  Bell,
  LogOut,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getUserMe } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

interface User {
  first_name?: string;
  last_name?: string;
  email?: string;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [showModal, setShowModal] = useState(false)
  const modalRef = useRef<HTMLDivElement | null>(null)
  const router = useRouter()

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setShowModal(false)
    }
  }

  useEffect(() => {
    if (showModal) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showModal])

  const handleLogout = async () => {
    try {
      Cookies.remove("sebpay_access_token")
      Cookies.remove("sebpay_refresh_token")
      await fetch("/api/logout", { method: "POST" })
      router.push("/login")
    } catch (error) {
      console.error("Erreur déconnexion :", error)
    }
  }

  const { data: logedInUser, isLoading } = useQuery<User | null>({
    queryKey: ['userMe'],
    queryFn: getUserMe as unknown as () => Promise<User | null>,
  });

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-hidden">
        <div className='border-b border-gradiant h-(--top-bar-height) bg-(--side-bg) flex items-center'>
          <div className='flex flex-row justify-between px-5 items-center w-[100%]'>
            <div className='liste-icon'>
               <List className="h-6 w-6" />
            </div>
            <div className='bg-clip-text text-transparent bg-(image:--sebpay-gradiant-color) font-bold text-2xl'>
              Bienvenu { isLoading ? ( <span>...</span> ) : logedInUser?.first_name }
            </div>
            <div className='flex flex-row justify-around'>
              <div className='bell-icon mx-6 me-20 flex items-center justify-center'>
                 <Bell className="h-6 w-6" />
              </div>
              <div className='profile cursor-pointer' onClick={() => setShowModal(true)}>
                <div className='h-[40px] w-[40px] border-[#f276fa] rounded-full border overflow-hidden'>
                  <Image className='h-[40px] w-[40px] object-cover' src={profile} alt='sebpay logo' />
                </div>
              </div>
            </div>
          </div>
        </div>

      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/30 z-50 flex justify-end items-start">
          <div
            ref={modalRef}
            className="bg-white mt-20 mr-5 rounded-lg p-4 w-64 shadow-lg"
          >
            <h3 className="font-bold text-lg mb-2">Profil</h3>
            <p className="text-sm text-gray-600">{ logedInUser?.first_name + ' ' + logedInUser?.last_name }</p>
            <p className="text-xs text-gray-400 mb-4">Administrateur</p>
            <p className='mb-4'> { logedInUser?.email } </p>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded w-full mt-2"
            >
              <LogOut className="h-4 w-4" />
              Déconnexion
            </button>
          </div>
        </div>
      )}

        <div className='h-full pb-20 overflow-y-scroll'>
          {children}
        </div>
      </div>
    </div>
  )
}
