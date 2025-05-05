/* eslint-disable @typescript-eslint/no-explicit-any */
import { ERROR_MESSAGES } from './constants';
import { CustomError, NetworkError, UnhandledError } from './error';
import { APIErrorResponse, AuthErrorCode } from './types';
import { getSessionRefreshToken, isAuthError } from './utils';
import { updateAccessToken } from '../login';

import { loginWithCredentials } from '@/lib/auth-utils';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface RequestProps {
  method?: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';
  body?: Record<string, any>;
  headers?: Record<string, string>;
}

type FetchProps = Omit<RequestProps, 'method'>;

const fetchClient = {
  onRequestCallback: (config: RequestProps) => config,

  async request<T = any>(url: string, config: RequestProps): Promise<T> {
    try {
      const { method, body, headers } = this.onRequestCallback(config);

      const response = await fetch(`${BASE_URL}${url}`, {
        method,
        body: body && JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      });

      if (response.status === 204) {
        return undefined as T;
      }

      if (!response.ok) {
        const apiError = (await response.json()) as APIErrorResponse;

        if (isAuthError(apiError.code)) {
          return await this.retryLogin<T>({
            config,
            code: apiError.code,
            status: response.status,
            url,
          });
        }

        throw new CustomError({ ...apiError, status: response.status });
      }

      return await response.json();
    } catch (error) {
      if (typeof window !== 'undefined' && !navigator.onLine) {
        throw new NetworkError();
      }

      if (error instanceof CustomError) {
        throw error;
      }

      throw new UnhandledError();
    }
  },

  get<T = any>(url: string, options: FetchProps = {}): Promise<T> {
    return this.request<T>(url, { method: 'GET', headers: options.headers });
  },
  post<T = any>(url: string, options: FetchProps = {}): Promise<T> {
    return this.request<T>(url, {
      method: 'POST',
      body: options.body,
      headers: options.headers,
    });
  },
  delete<T = any>(url: string, options: FetchProps = {}): Promise<T> {
    return this.request<T>(url, { method: 'DELETE', body: options.body, headers: options.headers });
  },
  patch<T = any>(url: string, options: FetchProps = {}): Promise<T> {
    return this.request<T>(url, {
      method: 'PATCH',
      body: options.body,
      headers: options.headers,
    });
  },
  put<T = any>(url: string, options: FetchProps = {}): Promise<T> {
    return this.request<T>(url, { method: 'PUT', body: options.body, headers: options.headers });
  },

  onRequest(callback: (config: RequestProps) => RequestProps) {
    this.onRequestCallback = callback;
  },

  async retryLogin<T>({
    config,
    code,
    status,
    url,
  }: {
    config: RequestProps;
    code: AuthErrorCode;
    status: number;
    url: string;
  }): Promise<T> {
    try {
      const refreshToken = await getSessionRefreshToken();

      if (!refreshToken) {
        throw new CustomError({
          status,
          code,
          message: ERROR_MESSAGES[code],
        });
      }

      const userInfo = await updateAccessToken(refreshToken);

      await loginWithCredentials({
        accessToken: userInfo.accessToken,
        refreshToken: userInfo.refreshToken,
        role: userInfo.memberInfo.role,
      });

      return this.request<T>(url, {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${userInfo.accessToken}`,
        },
      });
    } catch (err) {
      if (err instanceof CustomError) {
        throw err;
      }

      const { status, code, message } = err as CustomError;
      throw new CustomError({
        status,
        code,
        message,
      });
    }
  },
};

export default fetchClient;
