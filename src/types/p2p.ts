export interface P2PType {
  id: string;
  sender_email: string;
  recipient_email: string;
  sender_country: string;
  sender_operator: string;
  recipient_country: string;
  recipient_operator: string;
  recipient_phone: string;
  amount: string;
  fee: string;
  net_amount: boolean;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  reference: string;
  created_at: string;
  updated_at: string;
}

export interface TransactionListType {
  count: number;
  next: string;
  previous: string;
  results: P2PType[];
}


