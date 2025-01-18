import { AxiosError } from 'axios';

interface ApiErrorResponse {
  code: string;
  message: string;
  data: unknown;
}

export type CustomAxiosError = AxiosError<ApiErrorResponse>;
