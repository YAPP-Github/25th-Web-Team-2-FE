import { NextRequest, NextResponse } from 'next/server';
import type { JWT } from 'next-auth/jwt';
import { clearAuthCookies, getDeviceType } from '../utils';

export function profileHandler(request: NextRequest, token: JWT | null) {
  const url = request.nextUrl.clone();
  const { pathname } = url;
  const userAgent = request.headers.get('user-agent') || '';
  const deviceType = getDeviceType(userAgent);

  // 회원가입 중에 프로필 페이지로 접근한 경우
  const isTempUser = token?.isTempUser === true && token?.accessToken === 'temp-token';
  if (isTempUser) {
    const response = NextResponse.next();
    clearAuthCookies(request, response);
    return response;
  }

  const isProfileWithDevice = /^\/user\/profile\/(mobile|desktop)(\/.*)?$/.test(pathname);
  if (!isProfileWithDevice) {
    const segments = pathname.split('/').filter(Boolean);
    const basePath = segments.slice(0, 2).join('/'); // 'user/profile'
    const restPath = segments.length > 2 ? `/${segments.slice(2).join('/')}` : '';
    const newPathname = `/${basePath}/${deviceType}${restPath}`;

    url.pathname = newPathname;
    return NextResponse.rewrite(url);
  }

  return null;
}
