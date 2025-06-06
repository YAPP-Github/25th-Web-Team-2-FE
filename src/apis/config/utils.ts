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
      return {
        refreshToken: session?.refreshToken || null,
        isTempUser: session?.isTempUser || null,
      };
    } else {
      const session = await getSession();
      return {
        refreshToken: session?.refreshToken || null,
        isTempUser: session?.isTempUser || null,
      };
    }
  } catch (_) {
    return {
      refreshToken: null,
      isTempUser: null,
    };
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

    const { refreshToken, isTempUser } = await getSessionRefreshToken();

    if (!refreshToken || isTempUser) {
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
