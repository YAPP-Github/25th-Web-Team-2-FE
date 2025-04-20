import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken, JWT } from 'next-auth/jwt';

const goToLogin = (request: NextRequest) => {
  return NextResponse.redirect(new URL('/login', request.url));
};

const goToHome = (request: NextRequest) => {
  return NextResponse.redirect(new URL('/', request.url));
};

const isExpiredToken = (token: JWT) => {
  const currentTimeSec = Math.floor(Date.now() / 1000);
  const isExpired = token.exp < currentTimeSec;
  return isExpired;
};

export async function middleware(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isJoinPage = request.nextUrl.pathname.startsWith('/join');
  const isJoinSuccessPage = isJoinPage && searchParams.get('step') === 'success';

  // 토큰이 없는 경우
  if (!token) {
    return goToLogin(request);
  }

  // 토큰이 만료된 경우
  if (token && isExpiredToken(token)) {
    const response = goToLogin(request);

    // Next-Auth 관련 모든 쿠키 삭제
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
  matcher: ['/join/:path*', '/my-posts/:path*', '/user/profile/:path*', '/user/leave/:path*'],
};
