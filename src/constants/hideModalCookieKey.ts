import { NotReadyMenu } from '@/components/MobileNotReadyModal/MobileNotReadyModal';

export const HIDE_MODAL_COOKIE_KEYS: Record<NotReadyMenu, string> = {
  upload: 'hide_upload_modal',
  profile: 'hide_profile_modal',
  edit: 'hide_edit_modal',
  myPosts: 'hide_my_posts_modal',
};
