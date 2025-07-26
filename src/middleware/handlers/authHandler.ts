import { NextRequest } from 'next/server';
import type { JWT } from 'next-auth/jwt';
import { clearAuthCookies, goToLogin, isExpiredToken } from '../utils';

export async function authHandler(request: NextRequest, token: JWT | null) {
  const { pathname } = request.nextUrl;

  const isHomePage = pathname === '/';
  const isLoginPage = pathname.startsWith('/login');
  const isPostDetailPage = pathname.startsWith('/post');

  // 토큰이 없는 경우
  if (!token && !isHomePage && !isLoginPage && !isPostDetailPage) {
    return goToLogin(request);
  }

  // 토큰이 만료된 경우
  if (token && isExpiredToken(token) && !isHomePage && !isLoginPage && !isPostDetailPage) {
    const response = goToLogin(request);
    clearAuthCookies(request, response);
    return response;
  }

  // 정상 접근일 경우 null 반환하여 추가 로직 수행
  return null;
}
