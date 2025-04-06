import { signIn, signOut } from 'next-auth/react';

interface LoginWithCredentialsParams {
  accessToken: string;
  refreshToken: string;
  role: string;
}

interface JoinWithCredentialsParams {
  oauthEmail: string;
  role: string;
  provider: string;
}

// 로그인 처리 함수
export const loginWithCredentials = async ({
  accessToken,
  refreshToken,
  role,
}: LoginWithCredentialsParams) => {
  await signIn('credentials', {
    accessToken,
    refreshToken,
    role,
    redirect: false,
  });
};

// 회원가입 임시 로그인 처리 함수
export const joinWithCredentials = async ({
  oauthEmail,
  role,
  provider,
}: JoinWithCredentialsParams) => {
  await signIn('credentials', {
    accessToken: 'temp-token',
    refreshToken: 'temp-token',
    role,
    isTempUser: 'true',
    redirect: false,
    oauthEmail,
    provider,
  });
};

// 로그아웃 처리 함수
export const logout = async () => {
  await signOut({ callbackUrl: '/' });
};
