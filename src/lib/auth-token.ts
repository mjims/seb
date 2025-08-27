import Cookies from 'js-cookie';

import { AppCookies } from '@/shared/config';

export type DecodedToken = {
  readonly exp: number;
};

export const getAccessToken = () => {
  return Cookies.get(AppCookies.ACCESS_TOKEN);
};
export class AuthToken {
  readonly decoded;

  constructor(readonly token = getAccessToken()) {
    this.decoded = {
      exp: 0,
    };

    if (token) this.decoded = '';
  }

  get isAuthenticated(): boolean {
    return !!this.token;
  }

  get bearerString() {
    return `JWT ${this.token}`;
  }
}
