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

  const isHomePage = pathname === '/';
  const isLoginPage = pathname.startsWith('/login');
  const isJoinPage = pathname.startsWith('/join');
  const isJoinSuccessPage = isJoinPage && searchParams.get('step') === 'success';
  const isPostDetailPage = pathname.startsWith('/post');
  const isPostDetailWithDevice = /^\/post\/[^/]+\/(mobile|desktop)$/.test(pathname);

  // 토큰이 없는 경우
  if (!token && !isHomePage && !isLoginPage && !isPostDetailPage) {
    return goToLogin(request);
  }

  // 토큰이 만료된 경우
  if (token && isExpiredToken(token) && !isHomePage && !isLoginPage) {
    const response = goToLogin(request);
    clearAuthCookies(request, response);

    return response;
  }

  // 임시 사용자가 회원가입 이탈했을 경우
  const isTempUser = token?.isTempUser === true && token?.accessToken === 'temp-token';

  if (isHomePage) {
    url.pathname = `/home`;
    const response = NextResponse.rewrite(url);

    if (isTempUser) {
      clearAuthCookies(request, response);
    }

    return response;
  }

  if (isTempUser && !isJoinPage) {
    const response = NextResponse.next();
    clearAuthCookies(request, response);
    return response;
  }

  if (isJoinPage || isLoginPage) {
    if (!isJoinSuccessPage && token && !token.isTempUser) {
      return goToHome(request);
    }

    // desktop, mobile 구분
    if (!pathname.match(/\/(join|login)\/(desktop|mobile)(\/.*)?$/)) {
      const segments = pathname.split('/').filter(Boolean);
      const basePath = segments[0];
      const restPath = segments.length > 1 ? `/${segments.slice(1).join('/')}` : '';

      const newPathname = `/${basePath}/${deviceType}${restPath}`;
      url.pathname = newPathname;

      return NextResponse.rewrite(url);
    }
  }

  // 공고 상세 페이지
  if (isPostDetailPage && !isPostDetailWithDevice) {
    const segments = pathname.split('/').filter(Boolean);
    const postId = segments[1];
    const newPathname = `/post/${postId}/${deviceType}`;

    url.pathname = newPathname;
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}

// 미들웨어가 실행될 경로 지정
export const config = {
  matcher: [
    '/',
    '/join/:path*',
    '/login',
    '/my-posts/:path*',
    '/user/profile/:path*',
    '/user/leave/:path*',
    '/post/:path*',
  ],
};
