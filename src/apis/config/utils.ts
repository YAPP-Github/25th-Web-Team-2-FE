import { getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';

import { createBaseFetchClient, RequestProps } from './createBaseFetchClient';
import { CustomError } from './error';
import { AuthErrorCode } from './types';
import { updateAccessToken } from '../login';

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

export const retryLogin = async <T>({
  fetchClient,
  config,
  code,
  status,
  url,
}: {
  fetchClient: ReturnType<typeof createBaseFetchClient>;
  config: RequestProps;
  code: AuthErrorCode;
  status: number;
  url: string;
}): Promise<T> => {
  try {
    if (config.isRetry) {
      throw new CustomError({
        status,
        code,
      });
    }

    const refreshToken = await getSessionRefreshToken();

    if (!refreshToken) {
      throw new CustomError({
        status,
        code,
      });
    }

    const userInfo = await updateAccessToken(refreshToken);

    await loginWithCredentials({
      accessToken: userInfo.accessToken,
      refreshToken: userInfo.refreshToken,
      role: userInfo.memberInfo.role,
    });

    return fetchClient.request<T>(url, {
      ...config,
      isRetry: true,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    });
  } catch (err) {
    if (err instanceof CustomError) {
      throw err;
    }

    const { status, code } = err as CustomError;
    throw new CustomError({
      status,
      code,
    });
  }
};
