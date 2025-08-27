// lib/api.ts
import { axiosInstance } from './axios'
import type { UserType } from '@/types/user'
import type { MerchantType } from '@/types/merchant'
import type { TransactionType } from '@/types/transaction'
import { WithdrawalRequestType } from '@/types/withdrawal'
import { AccountSuspensionType } from '@/types/account-suspension'
import { P2PType } from '@/types/p2p'
import { cookies } from 'next/headers'
import { KycDocumentType } from '@/types/kyc'

export const getMerchantById = async (id: string): Promise<MerchantType> => {
  
  const cookieStore = await cookies()
  const token = cookieStore.get('sebpay_access_token')?.value

  const response = await axiosInstance.get(`/merchants/${id}/`, {
    headers: {
      Authorization: `JWT ${token}`,
    },
  })

  return response.data
}

export const getUserById = async (id: string): Promise<UserType> => {
  
  const cookieStore = await cookies()
  const token = cookieStore.get('sebpay_access_token')?.value

  const response = await axiosInstance.get(`/users/${id}/`, {
    headers: {
      Authorization: `JWT ${token}`,
    },
  })

  return response.data
}

export const getTransactionById = async (id: string): Promise<TransactionType> => {
  
  const cookieStore = await cookies()
  const token = cookieStore.get('sebpay_access_token')?.value

  const response = await axiosInstance.get(`/transactions/${id}/`, {
    headers: {
      Authorization: `JWT ${token}`,
    },
  })

  return response.data
}

export const getSuspensionById = async (id: string): Promise<AccountSuspensionType> => {
  
  const cookieStore = await cookies()
  const token = cookieStore.get('sebpay_access_token')?.value

  const response = await axiosInstance.get(`/account-suspensions/${id}/`, {
    headers: {
      Authorization: `JWT ${token}`,
    },
  })

  return response.data
}

export const getKycById = async (id: string): Promise<KycDocumentType> => {
  
  const cookieStore = await cookies()
  const token = cookieStore.get('sebpay_access_token')?.value

  const response = await axiosInstance.get(`/kyc-documents/${id}/`, {
    headers: {
      Authorization: `JWT ${token}`,
    },
  })

  return response.data
}

export const getWithdrawalById = async (id: string): Promise<WithdrawalRequestType> => {
  
  const cookieStore = await cookies()
  const token = cookieStore.get('sebpay_access_token')?.value

  const response = await axiosInstance.get(`/withdrawal-requests/${id}/`, {
    headers: {
      Authorization: `JWT ${token}`,
    },
  })

  return response.data
}



