/* eslint-disable @typescript-eslint/no-explicit-any */
import { CustomError, NetworkError, UnhandledError } from './error';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface RequestProps {
  method?: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';
  body?: Record<string, unknown>;
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
        const apiError = await response.json();
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
};

export default fetchClient;
