// Types pour les documents KYC
export interface KycDocumentTypeType {
  id: string;
  code: string;
  label: string;
  country_code: string;
}

export interface KycDocumentMerchant {
  id: string;
  business_name: string;
  business_type: string;
  country_code: string;
  dial_code: string;
  phone: string;
  real_balance: string;
  available_balance: string;
  verification_status: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface KycDocumentType {
  id: string;
  merchant: KycDocumentMerchant;
  document_number: string;
  document_type: KycDocumentTypeType;
  document_type_id: string;
  file: string;
  status: 'pending' | 'approved' | 'rejected';
  uploaded_at: string;
}

export interface KycDocumentTypeListType {
  count: number;
  next: string;
  previous: string;
  results: KycDocumentType[];
}

export interface KycDocumentListType {
  count: number;
  next: string;
  previous: string;
  results: KycDocumentType[];
}
