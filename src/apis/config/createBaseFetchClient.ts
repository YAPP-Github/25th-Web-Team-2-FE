/* eslint-disable @typescript-eslint/no-explicit-any */
import { CustomError, NetworkError, UnhandledError } from './error';
import { APIErrorResponse, AuthErrorCode } from './types';
import { getDefaultHeader, isAuthError } from './utils';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

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
        const parsedHeaders = {
          ...(onRequestConfig?.headers ?? {}),
          ...(config?.headers ?? {}),
        };

        const { method, body, next } = parsedConfig;

        const response = await fetch(`${BASE_URL}${url}`, {
          method,
          body: body && JSON.stringify(body),
          headers: parsedHeaders,
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

          throw new CustomError({ code: apiError.code, status: response.status });
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

    get<T = any>(url: string, options: FetchProps = {}) {
      return this.request<T>(url, {
        method: 'GET',
        ...options,
      });
    },
    post<T = any>(url: string, options: FetchProps = {}) {
      return this.request<T>(url, {
        method: 'POST',
        ...options,
        headers: getDefaultHeader(options),
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
