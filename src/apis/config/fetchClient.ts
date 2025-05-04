import { CustomError, NetworkError, UnhandledError } from './error';

interface RequestProps {
  method: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';
  body?: Record<
    string,
    string | string[] | number | null | object | boolean | Array<string | number | null>
  >;
  headers?: Record<string, string>;
}

type FetchProps = Omit<RequestProps, 'method'>;
const fetchClient = {
  async request<T = void>(url: string, { method, body, headers }: RequestProps): Promise<T> {
    try {
      const accessToken = localStorage.getItem('accessToken');

      const response = await fetch(url, {
        method,
        body: body && JSON.stringify(body),
        headers: {
          ...headers,
          'Content-Type': 'application/json',
          ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
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
      if (!navigator.onLine) {
        throw new NetworkError();
      }

      if (error instanceof CustomError) {
        throw error;
      }

      throw new UnhandledError();
    }
  },

  get<T = void>(url: string, options: FetchProps = {}): Promise<T> {
    return this.request<T>(url, { method: 'GET', headers: options.headers });
  },
  post<T = void>(url: string, options: FetchProps = {}): Promise<T> {
    return this.request(url, {
      method: 'POST',
      body: options.body,
      headers: options.headers,
    });
  },
  delete<T = void>(url: string, options: FetchProps = {}): Promise<T> {
    return this.request(url, { method: 'DELETE', body: options.body, headers: options.headers });
  },
  patch<T = void>(url: string, options: FetchProps = {}): Promise<T> {
    return this.request(url, {
      method: 'PATCH',
      body: options.body,
      headers: options.headers,
    });
  },
  put<T = void>(url: string, options: FetchProps = {}): Promise<T> {
    return this.request(url, { method: 'PUT', body: options.body, headers: options.headers });
  },
};

export default fetchClient;
