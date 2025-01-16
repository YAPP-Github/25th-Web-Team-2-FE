import axios from 'axios';

import { CustomAxiosError } from './type';

export const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 3000,
  headers: { 'Content-Type': 'application/json' },
});

// TODO: 에러 핸들링 개선 필요
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: CustomAxiosError) => {
    if (error.response) {
      const { data } = error.response;

      if (data.code === 'VE007') {
        return Promise.reject({ data: { isAuth: true }, message: '이미 인증된 메일입니다.' });
      }

      return Promise.reject(error);
    }

    // timeout 내에 서버 응답이 없는 경우
    return Promise.reject({
      status: 0,
      code: 'NETWORK_ERROR',
      message: '네트워크 오류가 발생했습니다. 다시 시도해주세요.',
    });
  },
);
