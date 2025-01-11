export const API_URL = {
  postList: '/v1/post',
  postArea: (area?: string) => `/v1/experiment-posts/counts${area ? `?area=${area}` : ''}`,
};

export const MOCK_API_URL = {
  postList: '/v1/post',
  postArea: '/v1/experiment-posts/counts',
};
