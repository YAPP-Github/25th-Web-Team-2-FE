import { NextRequest, NextResponse } from 'next/server';
import type { JWT } from 'next-auth/jwt';
import { getDeviceType, goToHome } from '../utils';

export function joinHandler(request: NextRequest, token: JWT | null) {
  const url = request.nextUrl.clone();
  const { searchParams, pathname } = url;
  const userAgent = request.headers.get('user-agent') || '';
  const deviceType = getDeviceType(userAgent);

  const isJoinSuccessPage = searchParams.get('step') === 'success';

  // 회원가입 성공 페이지에서 홈으로 리다이렉트 되는 것 방지
  if (!isJoinSuccessPage && token && !token.isTempUser) {
    return goToHome(request);
  }

  // desktop, mobile 구분
  if (!pathname.match(/\/(join)\/(desktop|mobile)(\/.*)?$/)) {
    const segments = pathname.split('/').filter(Boolean);
    const basePath = segments[0];
    const restPath = segments.length > 1 ? `/${segments.slice(1).join('/')}` : '';

    const newPathname = `/${basePath}/${deviceType}${restPath}`;
    url.pathname = newPathname;

    return NextResponse.rewrite(url);
  }

  return null;
}
