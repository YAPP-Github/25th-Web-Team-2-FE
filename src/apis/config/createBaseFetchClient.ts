/* eslint-disable @typescript-eslint/no-explicit-any */
import { CustomError, NetworkError, UnhandledError } from './error';
import { APIErrorResponse, AuthErrorCode } from './types';
import { isAuthError } from './utils';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export interface RequestProps {
  method?: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';
  body?: Record<string, any>;
  headers?: Record<string, unknown>;
  next?: { revalidate?: number; tags?: string[] };
  isRetry?: boolean;
}

type FetchProps = Omit<RequestProps, 'method'>;

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
    onRequestCallback: options.onRequest || ((config: RequestProps) => config),

    async request<T = any>(url: string, config: RequestProps): Promise<T> {
      try {
        const { method, body, headers, next } = this.onRequestCallback(config);

        const response = await fetch(`${BASE_URL}${url}`, {
          method,
          body: body && JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json',
            ...headers,
          },
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
      return this.request<T>(url, { method: 'GET', headers: options.headers });
    },
    post<T = any>(url: string, options: FetchProps = {}) {
      return this.request<T>(url, {
        method: 'POST',
        body: options.body,
        headers: options.headers,
      });
    },
    delete<T = any>(url: string, options: FetchProps = {}) {
      return this.request<T>(url, {
        method: 'DELETE',
        body: options.body,
        headers: options.headers,
      });
    },
    patch<T = any>(url: string, options: FetchProps = {}) {
      return this.request<T>(url, {
        method: 'PATCH',
        body: options.body,
        headers: options.headers,
      });
    },
    put<T = any>(url: string, options: FetchProps = {}) {
      return this.request<T>(url, { method: 'PUT', body: options.body, headers: options.headers });
    },

    onRequest(callback: (config: RequestProps) => RequestProps) {
      this.onRequestCallback = callback;
    },
  };
};
