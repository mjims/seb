import type { UserRolesKeys } from '@/shared/constants';
import type { MerchantType } from '@/types/merchant';

export enum UserTypeEnum {
  INDIVIDUAL = 'individual',
  MERCHANT = 'merchant',
}

export interface UserProfile {
  id: string;
  user_type: UserTypeEnum;
  monthly_limit: number;
  current_month_usage: number;
  kyc_status: 'pending' | 'rejected' | 'approved';
}

export interface GroupAndPermissionType {
  id: string;
  name: string;
}

export interface UserRoleType {
  id?: string;
  user?: UserType;
  user_id?: string;
  merchant?: MerchantType;
  merchant_id: string;
  role: UserRolesKeys;
}

export interface UserType {
  id: string;
  value: string;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  country_code: string;
  dial_code: string;
  phone: string;
  profile: UserProfile;
  driver_id: string | null;
  rental_merchant_id: string | null;
  group_names: GroupAndPermissionType[];
  permission_names: GroupAndPermissionType[];
  roles: UserRoleType[];
  stripe_customer_id?: string;
  is_subscription_active: boolean;
  free_plan_checkout_session_url?: string;
  starter_plan_checkout_session_url?: string;
  customer_portal_url?: string;
  is_active: boolean;
  is_staff: boolean;
  is_admin: boolean;
  is_superuser: boolean;
  password: string;
  re_password: string;
  date_joined: string;
  last_login: string;
}

export interface UserGroupAssignmentType {
  groups_to_add?: string[];
  groups_to_remove?: string[];
}

export interface UserListType {
  count: number;
  next: string;
  previous: string;
  results: UserType[];
}
