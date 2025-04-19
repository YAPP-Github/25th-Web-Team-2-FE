import { AxiosError } from 'axios';
import { ERROR_MESSAGES } from './constants';

interface ApiErrorResponse {
  code: keyof typeof ERROR_MESSAGES;
  message: string;
  data: unknown;
}

export type CustomAxiosError = AxiosError<ApiErrorResponse>;
