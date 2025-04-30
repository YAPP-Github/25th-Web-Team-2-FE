import axios from 'axios';

import { ERROR_MESSAGES } from './constants';
import { CustomError, NetworkError, UnhandledError } from './error';
import { CustomAxiosError } from './types';
import { isAuthError, login } from './utils';

export const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

API.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: CustomAxiosError) => {
    // 에러 응답이 없는 경우
    if (!error.response) {
      throw new NetworkError();
    }

    // 에러 응답이 있음 & 정의되지 않은 에러 코드인 경우
    if (error.response && !(error.response.data.code in ERROR_MESSAGES)) {
      throw new UnhandledError();
    }

    try {
      const { data, config, status } = error.response;
      const originalRequest = config;

      if (isAuthError(data.code)) {
        return await login({
          axiosInstance: API,
          request: originalRequest,
          code: data.code,
          status,
        });
      }

      throw new CustomError({
        status,
        errorCode: data.code,
        message: ERROR_MESSAGES[data.code],
      });
    } catch (err) {
      if (err instanceof CustomError) {
        throw err;
      }

      const error = err as CustomError;
      throw new CustomError({
        status: error.status,
        errorCode: error.errorCode,
        message: error.message,
      });
    }
  },
);
