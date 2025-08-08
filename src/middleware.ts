import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { authHandler } from './middleware/handlers/authHandler';
import { handlerMap } from './middleware/handlers/handlerMap';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // 인증 체크 먼저 수행
  const authResult = authHandler(request, token);
  if (authResult) {
    return authResult;
  }

  // 핸들러 배열을 순회하면서 매칭되는 핸들러 실행하고 매칭되면 반복문 종료
  for (const { test, handler } of handlerMap) {
    if (test(pathname)) {
      const result = handler(request, token);

      if (result) {
        return result;
      }

      break;
    }
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
