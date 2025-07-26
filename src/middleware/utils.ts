import { NextRequest, NextResponse } from 'next/server';
import { JWT } from 'next-auth/jwt';

/**
 * 디바이스 타입 감지 함수
 */
export function getDeviceType(userAgent: string): 'desktop' | 'mobile' {
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return mobileRegex.test(userAgent) ? 'mobile' : 'desktop';
}

/**
 * 로그인 페이지로 리다이렉트
 */
export const goToLogin = (request: NextRequest) => {
  return NextResponse.redirect(new URL('/login', request.url));
};

/**
 * 홈 페이지로 리다이렉트
 */
export const goToHome = (request: NextRequest) => {
  return NextResponse.redirect(new URL('/home', request.url));
};

/**
 * 토큰 만료 체크
 */
export const isExpiredToken = (token: JWT) => {
  const currentTimeSec = Math.floor(Date.now() / 1000);
  const isExpired = token.exp < currentTimeSec;
  return isExpired;
};

/**
 * Next-Auth 관련 모든 쿠키 삭제
 */
export const clearAuthCookies = (request: NextRequest, response: NextResponse) => {
  const cookiesToClear = [
    'next-auth.session-token',
    'next-auth.csrf-token',
    'next-auth.callback-url',
  ];

  cookiesToClear.forEach((cookieName) => {
    if (request.cookies.has(cookieName)) {
      response.cookies.delete(cookieName);
    }
  });
};
