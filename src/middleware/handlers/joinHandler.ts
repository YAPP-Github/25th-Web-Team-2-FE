import { NextRequest } from 'next/server';
import type { JWT } from 'next-auth/jwt';

import { goToHome, hasDevicePath, rewriteToDevicePath } from '../utils';

const BASE_PATH = 'join';

export function joinHandler(request: NextRequest, token: JWT | null) {
  const url = request.nextUrl.clone();
  const { searchParams, pathname } = url;

  const isJoinSuccessPage = searchParams.get('step') === 'success';

  // 회원가입 성공 페이지에서 홈으로 리다이렉트 되는 것 방지
  if (!isJoinSuccessPage && token && !token.isTempUser) {
    return goToHome(request);
  }

  if (!hasDevicePath(pathname, BASE_PATH)) {
    return rewriteToDevicePath(request, BASE_PATH, pathname);
  }

  return null;
}
