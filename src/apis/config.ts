import axios from 'axios';

import { updateAccessToken } from './login';
import { CustomAxiosError } from './type';

const ERROR_MESSAGES = {
  VE0004: '인증번호가 일치하지 않아요',
  VE0005: '인증시간이 만료되었어요',
  VE0007: '이미 인증된 메일입니다.',
  AU0001: '유효한 입력값이 아닙니다.',
  AU0002: '유효한 입력값이 아닙니다.',
  AU0003: '유효한 입력값이 아닙니다.',
};

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

      if (data.code === 'VE0004') {
        return Promise.reject({
          data: { isAuth: false },
          message: ERROR_MESSAGES[data.code],
        });
      } else if (data.code === 'VE0005') {
        return Promise.reject({
          data: { isAuth: false },
          message: ERROR_MESSAGES[data.code],
        });
      } else if (data.code === 'VE0007') {
        return Promise.reject({ data: { isAuth: true }, message: ERROR_MESSAGES[data.code] });
      } else if (data.code === 'AU0001' || data.code === 'AU0002' || data.code === 'AU0003') {
        const refreshToken = sessionStorage.getItem('refreshToken');

        if (refreshToken === null) {
          return Promise.reject({ data: { isAuth: false }, message: ERROR_MESSAGES[data.code] });
        }

        const userInfo = await updateAccessToken(refreshToken);

        originalRequest.headers.Authorization = `Bearer ${userInfo.accessToken}`;
        API.defaults.headers.Authorization = `Bearer ${userInfo.accessToken}`;
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
