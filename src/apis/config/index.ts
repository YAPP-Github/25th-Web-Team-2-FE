import axios from 'axios';

import { ERROR_MESSAGES } from './constants';
import { CustomAxiosError } from './type';
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
      const { data, config } = error.response;
      const originalRequest = config;

      if (isAuthError(data.code)) {
        return login({ request: originalRequest, code: data.code });
      }

      if (data.code === 'ME0002') {
        const role = data.message.split(': ').pop()?.trim();

        return Promise.reject({
          message: ERROR_MESSAGES[data.code](role),
        });
      }

      return Promise.reject({ message: ERROR_MESSAGES[data.code] });
    }

    // timeout 내에 서버 응답이 없는 경우
    return Promise.reject({
      status: 0,
      code: 'NETWORK_ERROR',
      message: '네트워크 오류가 발생했습니다. 다시 시도해주세요.',
    });
  },
);
