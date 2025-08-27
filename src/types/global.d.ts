type PaginateParams = {
  page?: number;
  size?: number;
};

type SortParams = {
  sortBy: string;
  sortOrder: 'asc' | 'desc';
};

type PaginationMeta = {
  page: number;
  pageSize: number;
  totalPage: number;
  totalItem: number;
};

type PaginationLinks = {
  self: string;
  first?: string;
  last?: string;
  prev?: string;
  next?: string;
};

type FieldValidationError = Record<string, string[]>;

type ApiError = {
  detail: string;
};

type ApiTokens = {
  access: string;
  refresh: string;
};

type ApiResponse<T> = {
  code: string;
  status: string;
  message: string;
  data?: Paginate<T> | T;
  errors?: ApiError[];
};

type Paginate<T> = {
  count: number;
  current_page?: number;
  next?: string | null;
  previous?: string | null;
  results: T[];
};

type FieldValidationErrorResponse<T extends string | number | symbol> = Record<
  T,
  string[]
>;

type PageableParams = {
  page?: Nullable<string | number>;
};

type SearchableParams = {
  search?: Nullable<string>;
};

type SortableParams<T> = {
  ordering?: Nullable<keyof T>;
};

type Nullable<T> = T | null;
type Optional<T> = T | undefined;

type InitialPhoneValueProps = {
  dial_code: string;
  country_code: string;
  phone: string;
};

export type PaymentPlanProps = {
  label: string;
  value: number;
  price: number;
  payments: number[];
};

export type PaymentPlansRecordProps = {
  tg: PaymentPlanProps[];
  ci: PaymentPlanProps[];
  bj: PaymentPlanProps[];
  other: PaymentPlanProps[];
};

export interface SelectOptionItem {
  label: string;
  value: string;
  key: string;
}
