import { NextRequest, NextResponse } from 'next/server';
import type { JWT } from 'next-auth/jwt';
import { clearAuthCookies } from '../utils';

export async function myPostsHandler(request: NextRequest, token: JWT | null) {
  const isTempUser = token?.isTempUser === true && token?.accessToken === 'temp-token';

  if (isTempUser) {
    const response = NextResponse.next();
    clearAuthCookies(request, response);
    return response;
  }

  return null;
}
