import { NextRequest, NextResponse } from 'next/server';
import type { JWT } from 'next-auth/jwt';
import { getDeviceType, goToHome } from '../utils';

export function loginHandler(request: NextRequest, token: JWT | null) {
  const url = request.nextUrl.clone();
  const { pathname } = url;
  const userAgent = request.headers.get('user-agent') || '';
  const deviceType = getDeviceType(userAgent);

  // 정상 사용자가 로그인 페이지 접근 시 홈으로 리다이렉트
  if (token && !token.isTempUser) {
    return goToHome(request);
  }

  // desktop, mobile 구분
  if (!pathname.match(/\/(login)\/(desktop|mobile)(\/.*)?$/)) {
    const segments = pathname.split('/').filter(Boolean);
    const basePath = segments[0];
    const restPath = segments.length > 1 ? `/${segments.slice(1).join('/')}` : '';

    const newPathname = `/${basePath}/${deviceType}${restPath}`;
    url.pathname = newPathname;

    return NextResponse.rewrite(url);
  }

  return null;
}
