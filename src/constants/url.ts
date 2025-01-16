export const API_URL = {
  postList: '/v1/post',
  postArea: (area?: string) => `/v1/experiment-posts/counts${area ? `?area=${area}` : ''}`,
  google: (role: string) => `/v1/auth/login/google?role=${role}`,
  send: 'v1/emails/send',
  verify: 'v1/emails/verify',
};

export const MOCK_API_URL = {
  postList: '/v1/post',
  postArea: '/v1/experiment-posts/counts',
};
