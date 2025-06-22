import { NotReadyMenu } from '@/components/MobileNotReadyModal/MobileNotReadyModal';

export const HIDE_MODAL_COOKIE_KEYS: Record<NotReadyMenu, string> = {
  upload: 'hide_upload_modal',
  profile: 'hide_profile_modal',
  edit: 'hide_edit_modal',
  myPosts: 'hide_my_posts_modal',
};

export const modalTitleMap = {
  upload: '모바일 버전 글쓰기 화면은 준비 중이에요\nPC에서 더 편리하게 이용하실 수 있어요',
  profile: '모바일 버전 내 정보 화면은 준비 중이에요\nPC에서 더 편리하게 이용하실 수 있어요',
  myPosts: '모바일 버전 내가 쓴 글 화면은 준비 중이에요\nPC에서 더 편리하게 이용하실 수 있어요',
  edit: '모바일 버전 공고 수정 화면은 준비 중이에요\nPC에서 더 편리하게 이용하실 수 있어요',
};

export const modalMenuRouteMap = (id?: string) => ({
  profile: '/user/profile',
  upload: '/upload',
  myPosts: '/my-posts',
  edit: `/edit/${id}`,
});
