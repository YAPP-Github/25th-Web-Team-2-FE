import { NextRequest, NextResponse } from 'next/server';
import type { JWT } from 'next-auth/jwt';

import { clearAuthCookies, hasDevicePath, rewriteToDevicePath } from '../utils';

const BASE_PATH = 'user/profile';

export function profileHandler(request: NextRequest, token: JWT | null) {
  const url = request.nextUrl.clone();
  const { pathname } = url;

  // 회원가입 중에 프로필 페이지로 접근한 경우
  const isTempUser = token?.isTempUser === true && token?.accessToken === 'temp-token';
  if (isTempUser) {
    const response = NextResponse.next();
    clearAuthCookies(request, response);
    return response;
  }

  if (!hasDevicePath(pathname, BASE_PATH)) {
    return rewriteToDevicePath(request, BASE_PATH, pathname);
  }

  return null;
}
