import type { MerchantType } from '@/types/merchant';
import { UserType } from './user';

export interface PaymentLinkType {
  id: string;
  title: string;
  description: string;
  amount: string;
  observation: string;
  high_risk: boolean;
  currency: string;
  image: string;
  merchant: MerchantType;
  merchant_id: string;
  user: UserType;
  start_date?: string;
  end_date?: string;
  buyer_pays_fees?: boolean;
  created_at: string;
  updated_at: string,
}

export interface PaymentLinkListType {
  count: number;
  next: string;
  previous: string;
  results: PaymentLinkType[];
}
