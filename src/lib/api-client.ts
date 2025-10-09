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

export const updateUserById = async (id: string, payload: Partial<UserType>): Promise<UserType> => {
  const cookieStore = await cookies()
  const token = cookieStore.get('sebpay_access_token')?.value

  console.log(payload)
  // Utilise PUT si ton backend attend tout l'objet. Si PATCH supporté, change en 'patch'.
  const response = await axiosInstance.put(`/users/${id}/`, payload, {
    headers: {
      Authorization: `JWT ${token}`,
      'Content-Type': 'application/json',
    },
  })

  return response.data
}

// dans lib/api.ts
export const patchUserById = async (id: string, payload: Partial<UserType>) => {
  const cookieStore = await cookies()
  const token = cookieStore.get('sebpay_access_token')?.value

  const response = await axiosInstance.patch(`/users/${id}/`, payload, {
    headers: {
      Authorization: `JWT ${token}`,
      'Content-Type': 'application/json',
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

export const getMerchantsKycById = async (id: string): Promise<KycDocumentType> => {
  
  const cookieStore = await cookies()
  const token = cookieStore.get('sebpay_access_token')?.value

  const response = await axiosInstance.get(`/kyc-documents/${id}/`, {
    headers: {
      Authorization: `JWT ${token}`,
    },
  })

  return response.data
}

export const approvedMerchantKycById = async (id: string, payload: Partial<UserType>): Promise<UserType> => {
  const cookieStore = await cookies()
  const token = cookieStore.get('sebpay_access_token')?.value

  console.log(payload)
  
  const response = await axiosInstance.post(`/kyc-documents/${id}/approve/`, payload, {
    headers: {
      Authorization: `JWT ${token}`,
      'Content-Type': 'application/json',
    },
  })

  return response.data
}

export const rejectedMerchantKycById = async (id: string, payload: Partial<UserType>): Promise<UserType> => {
  const cookieStore = await cookies()
  const token = cookieStore.get('sebpay_access_token')?.value

  console.log(payload)
  const response = await axiosInstance.post(`/kyc-documents/${id}/reject/`, payload, {
    headers: {
      Authorization: `JWT ${token}`,
      'Content-Type': 'application/json',
    },
  })

  return response.data
}

export const patchMerchantById = async (id: string, payload: Partial<MerchantType>) => {
  const cookieStore = await cookies()
  const token = cookieStore.get('sebpay_access_token')?.value

  const response = await axiosInstance.patch(`/merchants/${id}/`, payload, {
    headers: {
      Authorization: `JWT ${token}`,
      'Content-Type': 'application/json',
    },
  })

  return response.data
}

export const getIndividualsKycById = async (id: string): Promise<KycDocumentType> => {
  
  const cookieStore = await cookies()
  const token = cookieStore.get('sebpay_access_token')?.value

  const response = await axiosInstance.get(`/individual-kyc-documents/${id}/`, {
    headers: {
      Authorization: `JWT ${token}`,
    },
  })

  return response.data
}

export const approvedIndividualKycById = async (id: string, payload: Partial<UserType>): Promise<UserType> => {
  const cookieStore = await cookies()
  const token = cookieStore.get('sebpay_access_token')?.value

  console.log(payload)
  // Utilise PUT si ton backend attend tout l'objet. Si PATCH supporté, change en 'patch'.
  const response = await axiosInstance.post(`/individual-kyc-documents/${id}/approve/`, payload, {
    headers: {
      Authorization: `JWT ${token}`,
      'Content-Type': 'application/json',
    },
  })

  return response.data
}

export const rejectedIndividualKycById = async (id: string, payload: Partial<UserType>): Promise<UserType> => {
  const cookieStore = await cookies()
  const token = cookieStore.get('sebpay_access_token')?.value

  console.log(payload)
  // Utilise PUT si ton backend attend tout l'objet. Si PATCH supporté, change en 'patch'.
  const response = await axiosInstance.post(`/individual-kyc-documents/${id}/reject/`, payload, {
    headers: {
      Authorization: `JWT ${token}`,
      'Content-Type': 'application/json',
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



