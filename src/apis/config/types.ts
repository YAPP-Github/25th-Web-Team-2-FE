import { AxiosError } from 'axios';

import { ERROR_MESSAGES } from './constants';

export type ErrorCode = keyof typeof ERROR_MESSAGES;

export type AuthErrorCode = 'AU0001' | 'AU0002' | 'AU0003' | 'AU0004' | 'AU0005';

interface ApiErrorResponse {
  code: ErrorCode;
  message: string;
  data: unknown;
}

export type CustomAxiosError = AxiosError<ApiErrorResponse>;
