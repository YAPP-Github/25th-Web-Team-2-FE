import { NextRequest } from 'next/server';
import * as nextAuthJwt from 'next-auth/jwt';
import type { JWT } from 'next-auth/jwt';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { middleware } from '../../middleware';
import * as utils from '../utils';

const BASE_URL = 'http://localhost:3000';

// NextRequest 모킹 함수
const createMockRequest = (url: string, userAgent?: string): NextRequest => {
  const headers = new Headers();
  if (userAgent) headers.set('user-agent', userAgent);
  return new NextRequest(new URL(url, BASE_URL), { headers });
};

describe('middleware', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });
  it('토큰이 없을 때 보호된 페이지 접근 시 로그인 페이지로 redirect된다.', async () => {
    // given
    vi.spyOn(nextAuthJwt, 'getToken').mockResolvedValue(null);
    const targetUrl = `${BASE_URL}/my-posts`;
    const loginUrl = `${BASE_URL}/login`;
    const request = createMockRequest(targetUrl);

    // when
    const response = await middleware(request);

    // then
    expect(response.status).toBe(307);
    expect(response?.headers.get('location')).toBe(loginUrl);
  });
  it('토큰이 만료되었을 때 보호된 페이지 접근 시 로그인 페이지로 redirect된다.', async () => {
    // given
    const expiredToken = { exp: 0 } as JWT;
    const targetUrl = `${BASE_URL}/my-posts`;
    const loginUrl = `${BASE_URL}/login`;
    const request = createMockRequest(targetUrl);
    vi.spyOn(nextAuthJwt, 'getToken').mockResolvedValue(expiredToken);

    // when
    const response = await middleware(request);

    // then
    expect(response.status).toBe(307);
    expect(response?.headers.get('location')).toBe(loginUrl);
  });
  it('루트 경로로 접근 시 홈 디렉토리 리소스로 rewrite된다.', async () => {
    // given
    const homeUrl = `${BASE_URL}/home`;
    const request = createMockRequest(BASE_URL);

    // when
    const response = await middleware(request);

    // then
    expect(response?.headers.get('x-middleware-rewrite')).toBe(homeUrl);
  });

  it('홈 페이지 접근 시 회원가입 중이던 유저면 캐시 삭제 후 홈 페이지로 rewrite된다.', async () => {
    // given
    const tempUserToken = { isTempUser: true, accessToken: 'temp-token' } as JWT;
    vi.spyOn(nextAuthJwt, 'getToken').mockResolvedValue(tempUserToken);
    const homeUrl = `${BASE_URL}/home`;
    const request = createMockRequest(BASE_URL);
    const clearAuthCookiesMock = vi.spyOn(utils, 'clearAuthCookies').mockImplementation(() => {});

    // when
    const response = await middleware(request);

    // then
    expect(clearAuthCookiesMock).toHaveBeenCalled();
    expect(response?.headers.get('x-middleware-rewrite')).toBe(homeUrl);
  });

  it('회원 가입 중인 유저가 회원가입 외 페이지 접근 시 쿠키 삭제 후 페이지 전환이 이뤄진다.', async () => {
    // given
    const tempUserToken = { isTempUser: true, accessToken: 'temp-token' } as JWT;
    vi.spyOn(nextAuthJwt, 'getToken').mockResolvedValue(tempUserToken);
    const targetUrl = `${BASE_URL}/my-posts`;
    const request = createMockRequest(targetUrl);
    const clearAuthCookiesMock = vi.spyOn(utils, 'clearAuthCookies').mockImplementation(() => {});

    // when
    const response = await middleware(request);

    // then
    expect(clearAuthCookiesMock).toHaveBeenCalled();
    expect(response?.status).toBe(200);
  });

  //   회원가입 성공 페이지에서 홈으로 리다이렉트 되는 것 방지 (성공 후 isTempUser가 삭제되기 때문)
  it('정상적인 유저가 회원가입 페이지 접근 시 홈으로 redirect된다.', async () => {
    // given
    const normalUserToken = { role: 'PARTICIPANT', isTempUser: false } as JWT;
    vi.spyOn(nextAuthJwt, 'getToken').mockResolvedValue(normalUserToken);
    const targetUrl = `${BASE_URL}/join`;
    const homeUrl = `${BASE_URL}/home`;
    const request = createMockRequest(targetUrl);

    // when
    const response = await middleware(request);

    // then
    expect(response.status).toBe(307);
    expect(response?.headers.get('location')).toBe(homeUrl);
  });

  it('정상적인 유저가 회원가입 성공 페이지에 접근 시 홈으로 redirect되지 않는다.', async () => {
    // given
    const normalUserToken = { isTempUser: false } as JWT;
    vi.spyOn(nextAuthJwt, 'getToken').mockResolvedValue(normalUserToken);
    const targetUrl = `${BASE_URL}/join?step=success`;
    const homeUrl = `${BASE_URL}/home`;
    const request = createMockRequest(targetUrl);

    // when
    const response = await middleware(request);

    // then
    expect(response?.headers.get('location')).not.toBe(homeUrl);
  });

  it('회원가입 중인 유저가 모바일로 회원가입 페이지 접근 시 모바일 디렉토리 리소스로 rewrite된다.', async () => {
    // given
    const tempUserToken = { isTempUser: true, accessToken: 'temp-token' } as JWT;
    vi.spyOn(nextAuthJwt, 'getToken').mockResolvedValue(tempUserToken);
    const mobileUserAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)';
    const requestUrl = `${BASE_URL}/join`;
    const rewriteUrl = `${BASE_URL}/join/mobile`;
    const request = createMockRequest(requestUrl, mobileUserAgent);

    // when
    const response = await middleware(request);

    // then
    expect(response?.headers.get('x-middleware-rewrite')).toBe(rewriteUrl);
  });

  it('모바일로 공고 상세 페이지 접근 시 모바일 디렉토리 리소스로 rewrite된다.', async () => {
    // given
    const mobileUserAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)';
    const request = createMockRequest(`${BASE_URL}/post/123`, mobileUserAgent);
    const normalUserToken = { isTempUser: false } as JWT;
    vi.spyOn(nextAuthJwt, 'getToken').mockResolvedValue(normalUserToken);

    // when
    const response = await middleware(request);

    // then
    expect(response?.headers.get('x-middleware-rewrite')).toBe(`${BASE_URL}/post/123/mobile`);
  });

  it('데스크탑에서 프로필 페이지 접근 시 데스크탑 디렉토리 리소스로 rewrite된다.', async () => {
    // given
    const normalUserToken = { isTempUser: false } as JWT;
    vi.spyOn(nextAuthJwt, 'getToken').mockResolvedValue(normalUserToken);
    const rewriteUrl = `${BASE_URL}/user/profile/desktop`;
    const requestUrl = `${BASE_URL}/user/profile`;
    const request = createMockRequest(requestUrl);

    // when
    const response = await middleware(request);

    // then
    expect(response?.headers.get('x-middleware-rewrite')).toBe(rewriteUrl);
  });

  it('모바일로 로그인 페이지 접근 시 모바일 디렉토리 리소스로 rewrite된다.', async () => {
    // given
    vi.spyOn(nextAuthJwt, 'getToken').mockResolvedValue(null);
    const mobileUserAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)';
    const requestUrl = `${BASE_URL}/login`;
    const rewriteUrl = `${BASE_URL}/login/mobile`;
    const request = createMockRequest(requestUrl, mobileUserAgent);

    // when
    const response = await middleware(request);

    // then
    expect(response?.headers.get('x-middleware-rewrite')).toBe(rewriteUrl);
  });

  it('이미 device 경로가 있는 로그인 페이지는 rewrite되지 않는다.', async () => {
    // given
    vi.spyOn(nextAuthJwt, 'getToken').mockResolvedValue(null);
    const requestUrl = `${BASE_URL}/login/desktop`;
    const request = createMockRequest(requestUrl);

    // when
    const response = await middleware(request);

    // then
    expect(response?.status).toBe(200);
    expect(response?.headers.get('x-middleware-rewrite')).toBeNull();
  });

  it('이미 device 경로가 있는 공고 상세 페이지는 rewrite되지 않는다.', async () => {
    // given
    vi.spyOn(nextAuthJwt, 'getToken').mockResolvedValue(null);
    const requestUrl = `${BASE_URL}/post/123/desktop`;
    const request = createMockRequest(requestUrl);

    // when
    const response = await middleware(request);

    // then
    expect(response?.status).toBe(200);
    expect(response?.headers.get('x-middleware-rewrite')).toBeNull();
  });

  it('이미 device 경로가 있는 프로필 페이지는 rewrite되지 않는다.', async () => {
    // given
    const normalUserToken = { isTempUser: false } as JWT;
    vi.spyOn(nextAuthJwt, 'getToken').mockResolvedValue(normalUserToken);
    const requestUrl = `${BASE_URL}/user/profile/mobile`;
    const request = createMockRequest(requestUrl);

    // when
    const response = await middleware(request);

    // then
    expect(response?.status).toBe(200);
    expect(response?.headers.get('x-middleware-rewrite')).toBeNull();
  });

  it('연구자가 아닌 사용자가 내가 쓴 글 페이지에 접근 시 홈으로 redirect된다.', async () => {
    // given
    const normalUserToken = { isTempUser: false } as JWT;
    vi.spyOn(nextAuthJwt, 'getToken').mockResolvedValue(normalUserToken);
    const requestUrl = `${BASE_URL}/my-posts`;
    const homeUrl = `${BASE_URL}/home`;
    const request = createMockRequest(requestUrl);

    // when
    const response = await middleware(request);

    // then
    expect(response?.status).toBe(307);
    expect(response?.headers.get('location')).toBe(homeUrl);
  });
});
