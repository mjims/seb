export interface WithdrawalRequestType {
  id: string;
  merchant: string;
  amount: number;
  bank_name: string;
  account_number: string;
  account_name: string;
  status: 'pending' | 'approved' | 'rejected';
  notes?: string;
  created_at: string;
  processed_at?: string;
}

export interface WithdrawalRequestListType {
  count: number;
  next: string;
  previous: string;
  results: WithdrawalRequestType[];
}

export interface PayoutRequest {
  withdrawal_id: string;
  operator: string;
  phone_number: string;
}
