import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

import {
  clearAuthCookies,
  getDeviceType,
  goToHome,
  goToLogin,
  isExpiredToken,
} from './middleware/utils';

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { searchParams, pathname } = url;
  const userAgent = request.headers.get('user-agent') || '';
  const deviceType = getDeviceType(userAgent);

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isJoinPage = url.pathname.startsWith('/join');
  const isJoinSuccessPage = isJoinPage && searchParams.get('step') === 'success';

  // joinPage만 먼저 desktop, mobile 구분
  if (isJoinPage && !isJoinSuccessPage) {
    if (!pathname.match(/\/join\/(desktop|mobile)(\/.*)?$/)) {
      const segments = pathname.split('/').filter(Boolean);
      const restPath = segments.length > 1 ? `/${segments.slice(1).join('/')}` : '';

      const newPathname = `/join/${deviceType}${restPath}`;
      url.pathname = newPathname;

      return NextResponse.rewrite(url);
    }
  }

  // 토큰이 없는 경우
  if (!token && pathname !== '/') {
    return goToLogin(request);
  }

  // 토큰이 만료된 경우
  if (token && isExpiredToken(token) && pathname !== '/') {
    const response = goToLogin(request);
    clearAuthCookies(request, response);

    return response;
  }

  // 임시 사용자가 회원가입 이탈했을 경우
  const isTempUser = token?.isTempUser === true && token?.accessToken === 'temp-token';

  if (isTempUser && !isJoinPage) {
    const response = NextResponse.next();
    clearAuthCookies(request, response);
    return response;
  }

  if (isJoinPage && !isJoinSuccessPage) {
    if (token && !token.isTempUser) {
      return goToHome(request);
    }
  }

  return NextResponse.next();
}

// 미들웨어가 실행될 경로 지정
export const config = {
  matcher: ['/', '/join/:path*', '/my-posts/:path*', '/user/profile/:path*', '/user/leave/:path*'],
};
