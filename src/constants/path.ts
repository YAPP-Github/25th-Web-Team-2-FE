export const PATH = {
  login: '/login',
  profile: '/user/profile',
  edit: '/user/profile/mobile/edit',
  leave: '/user/leave',
  editProfile: (infoType: string) => `/user/profile/mobile/edit/${infoType}`,
} as const;
