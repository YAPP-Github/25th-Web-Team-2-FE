import { DefaultSession } from 'next-auth';

import { Role, LoginProvider } from './user';

// Next-Auth 타입 확장
declare module 'next-auth' {
  interface Session extends DefaultSession {
    accessToken?: string;
    refreshToken?: string;
    role?: Role;
    isTempUser?: boolean;
    oauthEmail?: string;
    provider?: LoginProvider;
  }

  interface User {
    accessToken: string;
    refreshToken: string;
    role: Role;
    isTempUser?: boolean;
    oauthEmail?: string;
    provider?: LoginProvider;
  }
}

// JWT 타입 확장
declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string;
    refreshToken: string;
    role: Role;
    iat: number;
    exp: number;
    jti: string;
    isTempUser?: boolean;
    oauthEmail?: string;
    provider?: LoginProvider;
  }
}
