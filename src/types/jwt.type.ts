export type JwtCredentials = Record<'email' | 'password', string>;

export type JwtRefresh = {
  refresh: string;
};

export type JwtAccess = {
  access: string;
};

export type JwtTokens = JwtAccess & JwtRefresh;
