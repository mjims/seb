import type { QueryKey } from '@tanstack/react-query';
import type {
  InternalAxiosRequestConfig,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';
import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import Cookies from 'js-cookie';

import { AuthToken, getAccessToken } from '@/lib/auth-token';
import { AppCookies } from '@/shared/config';
import { Endpoints } from '@/shared/endpoints';
import { LocalStorageKeys } from '@/shared/local-storage-keys';
import { Pages } from '@/shared/pages';
import { useAuthStore } from '@/stores/user';

const baseURL = process.env.NEXT_PUBLIC_API_URL ?? '';

export const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const noAuthAxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Typage propre : InternalAxiosRequestConfig<unknown> -> pas de any
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig<unknown>) => {
    const token = getAccessToken();
    const newConfig: InternalAxiosRequestConfig<unknown> = { ...config };

    // Axios v1: headers est toujours de type AxiosHeaders | undefined
    if (!newConfig.headers) {
      newConfig.headers = new axios.AxiosHeaders();
    }

    if (token) {
      newConfig.headers.set('Authorization', `JWT ${token}`);
    }

    if (baseURL && newConfig.url && !String(newConfig.url).startsWith('http')) {
      newConfig.baseURL = baseURL;
    }

    return newConfig;
  },
  (error) => Promise.reject(error)
);

// Typage du failedRequest : on ne touche pas any
type FailedRequest = {
  response: {
    config: AxiosRequestConfig;
  };
};

const refreshAuthLogic = async (failedRequest: FailedRequest): Promise<AxiosResponse | void> => {
  if (typeof window === 'undefined') return;

  if (!window.location.pathname.startsWith(Pages.BOARD)) return;

  const refreshToken = Cookies.get(AppCookies.REFRESH_TOKEN) || '';
  const defaultRedirect = Pages.BOARD;

  const lastKnownLocation =
    window.location.pathname === Pages.LOGIN ? defaultRedirect : window.location.pathname;

  if (refreshToken) {
    try {
      const resp = await axios.post(
        Endpoints.JWT_REFRESH,
        { refresh: refreshToken, skipAuthRefresh: true },
        { baseURL }
      );

      const { access: newToken } = resp.data as { access: string };
      const decoded = new AuthToken(newToken);

      // s'assurer que headers existe avant d'assigner
      failedRequest.response.config.headers = {
        ...(failedRequest.response.config.headers ?? {}),
        Authorization: decoded.bearerString,
      };

      Cookies.set(AppCookies.ACCESS_TOKEN, newToken, { secure: true });

      return resp;
    } catch (err: unknown) {
      // Narrowing propre
      if (axios.isAxiosError(err)) {
        const axiosErr = err as AxiosError;
        const status = axiosErr.response?.status;
        const respData = axiosErr.response?.data as Record<string, unknown> | undefined;
        const code =
          typeof respData?.['code'] === 'string' ? (respData['code'] as string) : undefined;
        if (status === 401 || code === 'token_not_valid') {
          useAuthStore.getState?.().setUser(undefined);
          localStorage.setItem(LocalStorageKeys.LAST_KNOWN_LOCATION, lastKnownLocation);
        }
      } else {
        // Erreur inconnue côté client
        localStorage.setItem(LocalStorageKeys.LAST_KNOWN_LOCATION, lastKnownLocation);
      }

      return Promise.reject(err);
    }
  }

  // si pas de refreshToken et qu'on n'est pas sur la route login -> déconnecte
  if (
    failedRequest?.response?.config?.url !== Endpoints.JWT_CREATE &&
    window.location.pathname !== Pages.LOGIN
  ) {
    localStorage.setItem(LocalStorageKeys.LAST_KNOWN_LOCATION, lastKnownLocation);
    useAuthStore.getState?.().setUser(undefined);
  }
};

createAuthRefreshInterceptor(axiosInstance, refreshAuthLogic);

// defaultQueryFn générique et typé — fini le `any`
export const defaultQueryFn = async <T>({ queryKey }: { queryKey: QueryKey }): Promise<T> => {
  const url = String(queryKey[0]);
  const { data } = await axiosInstance.get<T>(url);
  return data;
};
