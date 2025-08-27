export interface APIKeyType {
  id: string;
  name: string;
  key: string;
  is_active: boolean;
  created_at: string;
  last_used_at?: string;
  expires_at?: string;
}

export interface APIKeyCreateType {
  name: string;
  expires_at?: string;
}

export interface WebhookEndpointType {
  id: string;
  url: string;
  events: string[];
  secret: string;
  is_active: boolean;
  created_at: string;
}

export interface WebhookEndpointCreateType {
  url: string;
  events: string[];
  is_active?: boolean;
}

export const WEBHOOK_EVENTS = [
  { value: 'payment.completed', label: 'Paiement complété' },
  { value: 'payment.failed', label: 'Paiement échoué' },
  { value: 'payment.refunded', label: 'Paiement remboursé' },
  { value: 'withdrawal.processed', label: 'Retrait traité' },
] as const;
