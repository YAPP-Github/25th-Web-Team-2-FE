export const API_URL = {
  postList: '/v1/experiment-posts/search',
  postArea: (area?: string) => `/v1/experiment-posts/counts${area ? `?area=${area}` : ''}`,
  google: (role: string) => `/v1/auth/login/google?role=${role}`,
  send: '/v1/emails/send',
  verify: '/v1/emails/verify',
  join: '/v1/members/signup/researcher',
  me: (role: string) => `/v1/members/${role}/me`,
  refresh: '/v1/auth/refresh',
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
