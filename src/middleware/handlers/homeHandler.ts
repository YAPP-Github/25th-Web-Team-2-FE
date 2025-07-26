import { NextRequest, NextResponse } from 'next/server';
import type { JWT } from 'next-auth/jwt';
import { clearAuthCookies } from '../utils';

export async function homeHandler(request: NextRequest, token: JWT | null) {
  const url = request.nextUrl.clone();

  // 임시 사용자가 회원가입 이탈했을 경우
  const isTempUser = token?.isTempUser === true && token?.accessToken === 'temp-token';

  url.pathname = `/home`;
  const response = NextResponse.rewrite(url);

  if (isTempUser) {
    clearAuthCookies(request, response);
  }

  return response;
}
