export interface AccountSuspensionType {
  id: string;
  merchant: string;
  merchant_name: string;
  reason:
    | 'unusual_activity'
    | 'kyc_incomplete'
    | 'compliance_check'
    | 'fraud_suspicion'
    | 'manual_review';
  description: string;
  required_documents: string[];
  status: 'active' | 'resolved' | 'escalated'; 
  suspended_by: string;
  suspended_by_name: string;
  resolved_by?: string;
  resolved_by_name?: string;
  resolution_notes?: string;
  created_at: string;
  resolved_at?: string;
}

export interface AccountSuspensionListType {
  count: number;
  next: string;
  previous: string;
  results: AccountSuspensionType[];
}

export interface ResolveSuspensionRequest {
  resolution_notes: string;
}
