/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthError, CustomError, NetworkError, UnhandledError } from './error';
import { APIErrorResponse, AuthErrorCode } from './types';
import { getDefaultHeader, isAuthError } from './utils';

import { logAPIError, logNetworkError, logUnhandledError } from '@/lib/log';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const SERVER_STATUS_CODE = 500;

export interface RequestProps {
  method?: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';
  body?: Record<string, any>;
  headers?: HeadersInit;
  next?: { revalidate?: number; tags?: string[] };
  isRetry?: boolean;
  requireAuth?: boolean;
}

export type FetchProps = Omit<RequestProps, 'method'>;

interface RetryLoginParams {
  config: RequestProps;
  code: AuthErrorCode;
  status: number;
  url: string;
}

interface BaseFetchClientOptions {
  onRequest?: (config: RequestProps) => RequestProps;
  retryLogin?: <T>({ config, code, status, url }: RetryLoginParams) => Promise<T>;
}

export const createBaseFetchClient = (options: BaseFetchClientOptions = {}) => {
  return {
    onRequestCallback: options.onRequest,

    async request<T = any>(url: string, config: RequestProps): Promise<T> {
      try {
        const onRequestConfig = this.onRequestCallback?.(config);

        // NOTE: config 커스텀 설정 적용 (onRequest 기반으로 config 설정 덮어쓰기)
        const parsedConfig = { ...(onRequestConfig && { ...onRequestConfig }), ...config };
        const { method, body, next, headers = {}, requireAuth = true } = parsedConfig;

        // NOTE: 불필요한 preflight 요청 방지를 위한 Authorization 헤더 제거
        if (!requireAuth && 'Authorization' in headers) {
          delete headers.Authorization;
        }

        const response = await fetch(`${BASE_URL}${url}`, {
          method,
          body: body && JSON.stringify(body),
          headers,
          ...(next && { next }),
        });

        if (response.status === 204) {
          return undefined as T;
        }

        if (!response.ok) {
          const apiError = (await response.json()) as APIErrorResponse;

          if (isAuthError(apiError.code) && options.retryLogin) {
            return await options.retryLogin<T>({
              config,
              code: apiError.code,
              status: response.status,
              url,
            });
          }

          logAPIError({
            level: response.status >= SERVER_STATUS_CODE ? 'error' : 'warning',
            errorCode: apiError.code,
            httpStatus: response.status,
            errorMessage: apiError.message,
            url,
          });

          switch (apiError.code) {
            case 'AU0001':
            case 'AU0002':
            case 'AU0003':
            case 'AU0004':
            case 'AU0005':
              throw new AuthError({ code: apiError.code, status: response.status });
            default:
              throw new CustomError({ code: apiError.code, status: response.status });
          }
        }

        return await response.json();
      } catch (error) {
        if (typeof window !== 'undefined' && !navigator.onLine) {
          logNetworkError({ url });
          throw new NetworkError();
        }

        if (error instanceof CustomError || error instanceof AuthError) {
          throw error;
        }

        logUnhandledError({ url });
        throw new UnhandledError();
      }
    },

    get<T = any>(url: string, options: FetchProps = {}) {
      return this.request<T>(url, {
        method: 'GET',
        ...options,
      });
    },
    post<T = any>(url: string, options: FetchProps = {}) {
      const defaultHeaders = getDefaultHeader(options);
      return this.request<T>(url, {
        method: 'POST',
        ...options,
        ...(defaultHeaders && { headers: defaultHeaders }),
      });
    },
    delete<T = any>(url: string, options: FetchProps = {}) {
      return this.request<T>(url, {
        method: 'DELETE',
        ...options,
        headers: getDefaultHeader(options),
      });
    },
    patch<T = any>(url: string, options: FetchProps = {}) {
      return this.request<T>(url, {
        method: 'PATCH',
        ...options,
        headers: getDefaultHeader(options),
      });
    },
    put<T = any>(url: string, options: FetchProps = {}) {
      return this.request<T>(url, {
        method: 'PUT',
        ...options,
        headers: getDefaultHeader(options),
      });
    },

    onRequest(callback: (config: RequestProps) => RequestProps) {
      this.onRequestCallback = callback;
    },
  };
};
