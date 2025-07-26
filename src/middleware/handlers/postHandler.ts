import { NextRequest, NextResponse } from 'next/server';
import type { JWT } from 'next-auth/jwt';
import { getDeviceType } from '../utils';

export function postHandler(request: NextRequest, token: JWT | null) {
  const url = request.nextUrl.clone();
  const { pathname } = url;
  const userAgent = request.headers.get('user-agent') || '';
  const deviceType = getDeviceType(userAgent);

  const isPostDetailWithDevice = /^\/post\/[^/]+\/(mobile|desktop)$/.test(pathname);

  // desktop, mobile 구분이 없는 경우
  if (!isPostDetailWithDevice) {
    const segments = pathname.split('/').filter(Boolean);
    const postId = segments[1];
    const newPathname = `/post/${postId}/${deviceType}`;

    url.pathname = newPathname;
    return NextResponse.rewrite(url);
  }

  return null;
}
