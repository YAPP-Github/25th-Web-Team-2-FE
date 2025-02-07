export const API_URL = {
  postList: (query: string) => `/v1/experiment-posts/search?${query}`,
  postArea: (region?: string | null) =>
    `/v1/experiment-posts/counts${region ? `?region=${region}` : ''}`,
  google: (role: string) => `/v1/auth/login/google?role=${role}`,
  naver: (role: string) => `/v1/auth/login/naver?role=${role}`,
  send: '/v1/emails/send',
  verify: '/v1/emails/verify',
  joinResearcher: '/v1/members/signup/researcher',
  joinParticipant: '/v1/members/signup/participant',
  me: (role: string) => `/v1/members/me/${role}`,
  refresh: '/v1/auth/refresh',
  uploadPost: '/v1/experiment-posts',
  viewExperimentDetails: (postId: string) => `/v1/experiment-posts/${postId}/details`,
  applyMethod: (postId: string) => `/v1/experiment-posts/${postId}/apply-method`,
  uploadImage: '/v1/experiment-posts/image-upload-request',
  myPosts: (page?: number, count?: number, order?: string) =>
    `/v1/experiment-posts/my-posts?page=${page}&count=${count}&order=${order}`,
  updateRecruitStatus: (postId: string) => `/v1/experiment-posts/${postId}/recruit-status`,
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
