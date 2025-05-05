import { getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';

import { authOptions } from '@/lib/auth-utils';

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
