export const API_URL = {
  postList: (query: string) => `/v1/experiment-posts/search?${query}`,
  postArea: (region?: string) => `/v1/experiment-posts/counts${region ? `?region=${region}` : ''}`,
  google: (role: string) => `/v1/auth/login/google?role=${role}`,
  naver: (role: string) => `/v1/auth/login/naver?role=${role}`,
  send: '/v1/emails/send',
  verify: '/v1/emails/verify',
  join: '/v1/members/signup/researcher',
  me: (role: string) => `/v1/members/${role}/me`,
  refresh: '/v1/auth/refresh',
  viewExperimentDetails: (postId: number) => `/v1/experiment-posts/${postId}/details`,
};

export const MOCK_API_URL = {
  postList: '/v1/experiment-posts/search',
  postArea: '/v1/experiment-posts/counts',
  send: '/v1/emails/send',
  verify: '/v1/emails/verify',
  join: '/v1/members/signup/researcher',
  me: '/v1/members/participants/me',
  refresh: '/v1/auth/refresh',
};
