import axios from 'axios';

import { CustomAxiosError } from './type';
import { updateAccessToken } from './login';

export const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// TODO: 에러 핸들링 개선 필요
API.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: CustomAxiosError) => {
    if (error.response) {
      const { data, config } = error.response;
      const originalRequest = config;

      if (data.code === 'VE007') {
        return Promise.reject({ data: { isAuth: true }, message: '이미 인증된 메일입니다.' });
      } else if (data.code === 'AU0001') {
        const refreshToken = sessionStorage.getItem('refreshToken');

        if (refreshToken === null) {
          return Promise.reject({ data: { isAuth: false }, message: '유효한 입력값이 아닙니다.' });
        }

        const userInfo = await updateAccessToken(refreshToken);

        originalRequest.headers.Authorization = `Bearer ${userInfo.accessToken}`;
        sessionStorage.setItem('refreshToken', userInfo.refreshToken);
        sessionStorage.setItem('role', userInfo.memberInfo.role);
        return axios(originalRequest);
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
