import { NextRequest } from 'next/server';
import type { JWT } from 'next-auth/jwt';

import { goToHome, hasDevicePath, rewriteToDevicePath } from '../utils';

const BASE_PATH = 'login';

export function loginHandler(request: NextRequest, token: JWT | null) {
  const url = request.nextUrl.clone();
  const { pathname } = url;

  // 정상 사용자가 로그인 페이지 접근 시 홈으로 리다이렉트
  if (token && !token.isTempUser) {
    return goToHome(request);
  }

  if (!hasDevicePath(pathname, BASE_PATH)) {
    return rewriteToDevicePath(request, BASE_PATH, pathname);
  }

  return null;
}
