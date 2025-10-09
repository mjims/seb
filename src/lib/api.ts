// lib/api.ts
import { axiosInstance } from './axios'
import type { UserListType, UserType } from '@/types/user'
import type { MerchantListType } from '@/types/merchant'
import type { TransactionListType } from '@/types/transaction'
import { WithdrawalRequestListType } from '@/types/withdrawal'
import { AccountSuspensionListType } from '@/types/account-suspension'
import { P2PType } from '@/types/p2p'
import { KycDocumentTypeListType, KycIndividualListType } from '@/types/kyc'
import { PaymentLinkListType } from '@/types/payment-link'
import { HistoricalListType } from '@/types/historical'

// Récupérer la liste des utilisateurs
export const getUsers = async (): Promise<UserListType> => {
  const response = await axiosInstance.get('/users/')
  return response.data
}

// Récupérer la liste des utilisateurs
export const deleteUser = async (id: string): Promise<UserType> => {
  const response = await axiosInstance.delete(`/users/${id}/`)
  return response.data
}

// Récupérer la liste des utilisateurs
export const getUserMe = async (): Promise<UserType> => {
  const response = await axiosInstance.get('/users/me/')
  return response.data
}

// Récupérer la liste des marchants
export const getMerchants = async (): Promise<MerchantListType> => {
  const response = await axiosInstance.get('/merchants/')
  return response.data
}

// Récupérer la liste des transactions
export const getTransactions = async (): Promise<TransactionListType> => {
  const response = await axiosInstance.get('/transactions/')
  return response.data
}

// Récupérer la liste des requêtes de retrait
export const getWithdrawalRequests = async (): Promise<WithdrawalRequestListType> => {
  const response = await axiosInstance.get('/withdrawal-requests/')
  return response.data
}

// Récupérer la liste des utilisateurs suspendus
export const getAccountSuspensions = async (): Promise<AccountSuspensionListType> => {
  const response = await axiosInstance.get('/account-suspensions/')
  return response.data
}

// Récupérer la liste des transferts p2p
export const getP2Ps = async (): Promise<P2PType[]> => {
  const response = await axiosInstance.get('/p2p-transfers/')
  return response.data.results
}

// Recupérer les kycs
export const getKycs = async (): Promise<KycDocumentTypeListType> => {
  const response = await axiosInstance.get('/kyc-documents/')
  return response.data
}

export const getIndividualKycs = async (): Promise<KycIndividualListType> => {
  const response = await axiosInstance.get('/individual-kyc-documents/')
  return response.data
}

// Recupérer les historic
export const getHistoricals = async (): Promise<HistoricalListType> => {
  const response = await axiosInstance.get('/merchant-histories/')
  return response.data
}

// Recupérer les paymetns links
export const getPaymentsLink = async (): Promise<PaymentLinkListType> => {
  const response = await axiosInstance.get('/payment-links/')
  return response.data
}

export const resolveSuspension = async ({
  id,
  resolution_notes,
}: {
  id: string
  resolution_notes: string
}) => {

  console.log("L'id console :"+ id)
  const response = await axiosInstance.post(
    `/account-suspensions/${id}/resolve/`,
    { resolution_notes },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  return response.data
}

export const suspendMerchant = async (data: {
  merchant: string
  reason: string
  description: string
  required_documents?: object
  status?: string
}) => {
  const response = await axiosInstance.post(
    `/account-suspensions/`,
    {
      merchant: data.merchant,
      reason: data.reason,
      description: data.description,
      ...(data.required_documents && { 
        required_documents: data.required_documents 
      }),
      status: data.status || 'active'
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  return response.data
}

