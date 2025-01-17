export const API_URL = {
  postList: '/v1/experiment-posts/search',
  postArea: (area?: string) => `/v1/experiment-posts/counts${area ? `?area=${area}` : ''}`,
  google: (role: string) => `/v1/auth/login/google?role=${role}`,
  send: '/v1/emails/send',
  verify: '/v1/emails/verify',
  join: '/v1/members/signup/researcher',
};

export const MOCK_API_URL = {
  postList: '/v1/experiment-posts/search',
  postArea: '/v1/experiment-posts/counts',
  send: '/v1/emails/send',
  verify: '/v1/emails/verify',
  join: '/v1/members/signup/researcher',
};
