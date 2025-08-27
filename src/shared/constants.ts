export enum Groups {
  DRIVER = 'Chauffeur',
  SUPER_ADMIN = 'Super admin',
  VEHICLE_RENTAL_MERCHANT = 'Loueur',
  STORE_MANAGER = 'Chef dépôt',
}

export enum Roles {
  ADMIN = 'admin',
  MANAGER = 'manager',
  DRIVER = 'driver',
}

export const driverDetailsTabs = [
  {
    key: '',
    label: 'Infos',
  },
  {
    key: 'services',
    label: 'Services',
  },
  {
    key: 'vehicles',
    label: 'Véhicules',
  },
  {
    key: 'refuelings',
    label: 'Ravitaillements',
  },
  {
    key: 'repairs',
    label: 'Entretiens',
  },
  {
    key: 'tourings',
    label: 'Tournées',
  },
];

export const vehicleDetailsTabs = [
  {
    key: '',
    label: 'Infos',
  },
  {
    key: 'drivers',
    label: 'Chauffeurs',
  },
  {
    key: 'refuelings',
    label: 'Ravitaillements',
  },
  {
    key: 'repairs',
    label: 'Entretiens',
  },
  {
    key: 'rental-history',
    label: 'Historique des locations',
  },
  {
    key: 'stores',
    label: 'Dépôts',
  },
];

export const serviceTabs = [
  {
    key: '',
    label: 'Début de service',
  },
  {
    key: 'service-end',
    label: 'Fin de service',
  },
];
export const touringDetailsTabs = [
  {
    key: '',
    label: 'Infos',
  },
  {
    key: 'addresses',
    label: 'Adresses',
  },
];

export const fuelOptions = [
  { value: 'Gasoil', label: 'Gasoil' },
  { value: 'Essence', label: 'Essence' },
  { value: 'Adblue', label: 'Adblue' },
  { value: 'Fioul', label: 'Fioul' },
  { value: 'Autres', label: 'Autres' },
];

export enum VehicleStatus {
  active = 'Actif',
  inactive = 'Inactif',
  returned = 'Restitué',
  in_repair = 'En entretien',
}

export const vehicleStatusOptions = [
  { value: 'active', label: 'Actif' },
  { value: 'inactive', label: 'Inactif' },
  { value: 'returned', label: 'Restitué' },
  { value: 'in_repair', label: 'En entretien' },
];

export enum DriverStatus {
  active = 'Actif',
  inactive = 'Inactif',
}

export const paymentLinkStatusOptions = [
  { value: 'active', label: 'Actif' },
  { value: 'inactive', label: 'Inactif' },
];

export const suspensionReasonOptions = [
  { value: 'unusual_activity', label: 'Activité inhabituelle' },
  { value: 'kyc_incomplete', label: 'KYC incomplet' },
  { value: 'compliance_check', label: 'Vérification de conformité' },
  { value: 'fraud_suspicion', label: 'Suspicion de fraude' },
  { value: 'manual_review', label: 'Révision manuelle' },
];

export const suspensionStatusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'resolved', label: 'Résolue' },
  { value: 'escalated', label: 'Escaladée' },
];

// Mise à jour des rôles pour inclure SAV, Assistant, CEO
export enum UserRolesKeys {
  admin = 'admin',
  merchant = 'merchant',
  customer = 'customer',
  sav = 'sav',
  assistant = 'assistant',
  ceo = 'ceo',
}

export enum UserRolesLabel {
  admin = 'Administrateur',
  merchant = 'Marchand',
  customer = 'Client',
  sav = 'SAV',
  assistant = 'Assistant',
  ceo = 'CEO',
}

export const userRolesOptions = [
  { value: UserRolesKeys.admin, label: UserRolesLabel.admin },
  { value: UserRolesKeys.merchant, label: UserRolesLabel.merchant },
  { value: UserRolesKeys.customer, label: UserRolesLabel.customer },
];

export enum MerchantTypesKeys {
  transport = 'transport',
  rental = 'rental',
}

export enum MerchantTypesLabel {
  transport = 'Transport',
  rental = 'Location de véhicules',
}

export const merchantTypesOptions = [
  { value: MerchantTypesKeys.transport, label: MerchantTypesLabel.transport },
  { value: MerchantTypesKeys.rental, label: MerchantTypesLabel.rental },
];

export const currencyOptions = [
  { label: 'Franc CFA (XOF)', value: 'XOF' },
  { label: 'Euro (EUR)', value: 'EUR' },
  { label: 'Dollar US (USD)', value: 'USD' },
  { label: 'Livre Sterling (GBP)', value: 'GBP' },
  { label: 'Dollar Canadien (CAD)', value: 'CAD' },
];

export const MERCHANT_STORAGE_KEY = 'currentMerchantId';
