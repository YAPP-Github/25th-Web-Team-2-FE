import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const goToLogin = (request: NextRequest) => {
  return NextResponse.redirect(new URL('/login', request.url));
};

const goToHome = (request: NextRequest) => {
  return NextResponse.redirect(new URL('/', request.url));
};

export async function middleware(request: NextRequest) {
  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isJoinPage = request.nextUrl.pathname.startsWith('/join');
  const isUserPage = request.nextUrl.pathname.startsWith('/user');
  const isMyPostsPage = request.nextUrl.pathname.startsWith('/my-posts');

  if (isJoinPage) {
    // 비로그인 사용자는 로그인 페이지로 이동
    // TODO: 회원가입 유저와 직접 접근하는 유저 구분 필요.
    // if (!session) {
    //   return goToLogin(request);
    // }

    // 로그인 사용자는 홈으로 이동
    if (session) {
      return goToHome(request);
    }
  }

  if (isUserPage || isMyPostsPage) {
    if (!session) {
      return goToLogin(request);
    }
  }

  return NextResponse.next();
}

// 미들웨어가 실행될 경로 지정
export const config = {
  matcher: ['/join/:path*', '/my-posts/:path*', '/user/:path*'],
};
