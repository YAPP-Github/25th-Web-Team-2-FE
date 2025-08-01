import { NextRequest, NextResponse } from 'next/server';
import type { JWT } from 'next-auth/jwt';

import { clearAuthCookies } from '../utils';
import { goToHome } from '../utils';

import { ROLE } from '@/constants/config';

export function myPostsHandler(request: NextRequest, token: JWT | null) {
  const isTempUser = token?.isTempUser === true && token?.accessToken === 'temp-token';

  if (isTempUser) {
    const response = NextResponse.next();
    clearAuthCookies(request, response);
    return response;
  }

  // 연구자가 아닌 유저가 내가 쓴 글 페이지에 접근 시 홈으로 리다이렉트
  if (token?.role !== ROLE.researcher) {
    return goToHome(request);
  }

  return null;
}
