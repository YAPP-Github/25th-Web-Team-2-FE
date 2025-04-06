import { DefaultSession } from 'next-auth';

// Next-Auth 타입 확장
declare module 'next-auth' {
  interface Session extends DefaultSession {
    accessToken?: string;
    refreshToken?: string;
    role?: string;
    error?: string;
  }

  interface User {
    accessToken: string;
    refreshToken: string;
    role: string;
  }
}

// JWT 타입 확장
declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string;
    refreshToken: string;
    role: string;
  }
}
