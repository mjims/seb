export interface TransactionType {
    id: string;
    merchant: string;
    payment_link: string;
    transaction_type: 'payment' | 'refund' | 'withdrawal';
    amount: number;
    fees: string;
    net_amount: string;
    status: 'pending' | 'completed' | 'failed' | 'refunded';
    customer_email: string;
    customer_name: string;
    reference: string;
    high_risk: string;
    created_at: string;
    updated_at: string;
    afribapay_transaction_id: string;
    afribapay_order_id: string;
    operator: string;
    customer_phone: string;
    country: string;
    currency: string;
    afribapay_fees: string;
    afribapay_taxes: string;
    total_amount_with_fees: string;
    webhook_received_at: string;
    afribapay_status: string;
}

export interface TransactionListType {
  count: number;
  next: string;
  previous: string;
  results: TransactionType[];
}

export interface AfribaPayPaymentRequest {
  operator: string;
  phone_number: string;
  country: string;
}

export interface AfribaPayPaymentResponse {
  request_id: string;
  request_time: number;
  request_ip: string;
  payment_url?: string;
  data: {
    transaction_id: string;
    order_id: string;
    operator: string;
    phone_number: string;
    amount: number;
    taxes: number;
    fees: number;
    fees_taxes_ttc: number;
    amount_total: number;
    currency: string;
    status: string;
    country: string;
    lang: string;
    reference_id: string;
    provider_id: string;
    date_created: string;
    payment_url?: string;
  };
}
