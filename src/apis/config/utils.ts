import axios, { InternalAxiosRequestConfig } from 'axios';
import { getSession } from 'next-auth/react';

import { AuthErrorCode } from './types';
import { updateAccessToken } from '../login';
import { ERROR_MESSAGES } from './constants';

import { API } from '.';

import { loginWithCredentials, logout } from '@/lib/auth-utils';

export const isAuthError = (code: string) => {
  return (
    code === 'AU0001' ||
    code === 'AU0002' ||
    code === 'AU0003' ||
    code === 'AU0004' ||
    code === 'AU0005'
  );
};

export const login = async ({
  request,
  code,
}: {
  request: InternalAxiosRequestConfig;
  code: AuthErrorCode;
}) => {
  try {
    // Next-Auth 세션에서 리프레시 토큰 가져오기
    const session = await getSession();
    const refreshToken = session?.refreshToken;

    if (!refreshToken) {
      return Promise.reject({ message: ERROR_MESSAGES[code] });
    }

    const userInfo = await updateAccessToken(refreshToken);

    // Next-Auth 재로그인
    await loginWithCredentials({
      accessToken: userInfo.accessToken,
      refreshToken: userInfo.refreshToken,
      role: userInfo.memberInfo.role,
    });

    request.headers.Authorization = `Bearer ${userInfo.accessToken}`;
    API.defaults.headers.Authorization = `Bearer ${userInfo.accessToken}`;
    return axios(request);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    await logout();
  }
};
