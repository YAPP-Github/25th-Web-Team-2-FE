import axios from 'axios';

import { ERROR_MESSAGES } from './constants';
import { CustomError, NetworkError } from './error';
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
    if (error.response && error.response.data.code in ERROR_MESSAGES) {
      const { data, config, status } = error.response;
      const originalRequest = config;

      try {
        if (isAuthError(data.code)) {
          await login({
            axiosInstance: API,
            request: originalRequest,
            code: data.code,
            status,
          });
        }

        // 예외 케이스
        if (data.code === 'ME0002') {
          const role = data.message.split(': ').pop()?.trim();

          throw new CustomError({
            status,
            errorCode: data.code,
            message: ERROR_MESSAGES[data.code](role),
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
    }

    // timeout 내에 서버 응답이 없는 경우
    throw new NetworkError();
  },
);
