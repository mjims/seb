export interface MerchantType {
  id: string;
  business_name: string;
  business_type: string;
  real_balance: number;
  available_balance: string;
  balance: string;
  verification_status:  'approved' | 'pending' | 'rejected';
  description: string;
  country_code: string;
  dial_code: string;
  phone: string;
  created_at: string;
  updated_at?: string;
}

export interface MerchantListType {
  count: number;
  next: string;
  previous: string;
  results: MerchantType[];
}

export interface WithdrawalMethod {
  id: string;
  operator: string;
  account_name: string;
  phone_number?: string;
  account_number?: string;
  is_default: boolean;
  is_active: boolean;
}
