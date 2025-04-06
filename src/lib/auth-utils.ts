import { signIn, signOut } from 'next-auth/react';

// 로그인 처리 함수
export const loginWithCredentials = async (
  accessToken: string,
  refreshToken: string,
  role: string,
) => {
  // Next-Auth 세션에 토큰 저장
  await signIn('credentials', {
    accessToken,
    refreshToken,
    role,
    redirect: false,
  });
};

// 로그아웃 처리 함수
export const logout = async () => {
  await signOut({ callbackUrl: '/' });
};
