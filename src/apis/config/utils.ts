import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';

import { AuthErrorCode } from './types';
import { updateAccessToken } from '../login';
import { ERROR_MESSAGES } from './constants';
import { CustomError } from './error';

import { authOptions, loginWithCredentials } from '@/lib/auth-utils';

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
  axiosInstance,
  request,
  code,
  status,
}: {
  axiosInstance: AxiosInstance;
  request: InternalAxiosRequestConfig;
  code: AuthErrorCode;
  status: number;
}) => {
  // Next-Auth 세션에서 리프레시 토큰 가져오기
  const session = await getSession();
  const refreshToken = session?.refreshToken;

  if (!refreshToken) {
    throw new CustomError({
      status,
      code,
      message: ERROR_MESSAGES[code],
    });
  }

  const userInfo = await updateAccessToken(refreshToken);

  // Next-Auth 재로그인
  await loginWithCredentials({
    accessToken: userInfo.accessToken,
    refreshToken: userInfo.refreshToken,
    role: userInfo.memberInfo.role,
  });

  request.headers.Authorization = `Bearer ${userInfo.accessToken}`;
  axiosInstance.defaults.headers.Authorization = `Bearer ${userInfo.accessToken}`;
  return axios(request);
};

export const getSessionRefreshToken = async () => {
  const isServer = typeof window === 'undefined';

  try {
    if (isServer) {
      const session = await getServerSession(authOptions);
      return session?.refreshToken || null;
    } else {
      const session = await getSession();
      return session?.refreshToken || null;
    }
  } catch (_) {
    return null;
  }
};
