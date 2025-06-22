'use client';
import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import {
  mobileNotReadyModalButtonContainer,
  mobileNotReadyModalCloseButton,
  mobileNotReadyModalContent,
  mobileNotReadyModalImage,
  mobileNotReadyModalOverlay,
  mobileNotReadyModalSecondaryButton,
  mobileNotReadyModalTitle,
  notReadyButton,
} from './MobileNotReadyModal.css';

import NotReadyMobile from '@/assets/images/notReadyMobile.svg';
import Icon from '@/components/Icon';
import { HIDE_MODAL_COOKIE_KEYS } from '@/constants/hideModalCookieKey';
import { setHideModalCookie } from '@/lib/cookies';

export type NotReadyMenu = 'profile' | 'upload' | 'edit' | 'myPosts';
export interface NotReadyModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  menu: NotReadyMenu;
}

const titleMap = {
  upload: '모바일 버전 글쓰기 화면은 준비 중이에요\nPC에서 더 편리하게 이용하실 수 있어요',
  profile: '모바일 버전 내 정보 화면은 준비 중이에요\nPC에서 더 편리하게 이용하실 수 있어요',
  myPosts: '모바일 버전 내가 쓴 글 화면은 준비 중이에요\nPC에서 더 편리하게 이용하실 수 있어요',
  edit: '모바일 버전 공고 수정 화면은 준비 중이에요\nPC에서 더 편리하게 이용하실 수 있어요',
};

const menuRouteMap = (id?: string) => ({
  profile: '/user/profile',
  upload: '/upload',
  myPosts: '/my-posts',
  edit: `/edit/${id}`,
});

const MobileNotReadyModal = ({ menu, isOpen, onOpenChange }: NotReadyModalProps) => {
  const { postId } = useParams();
  const normalizedPostId = Array.isArray(postId) ? postId[0] : postId;

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={mobileNotReadyModalOverlay} />
        <Dialog.Content className={mobileNotReadyModalContent} aria-describedby={undefined}>
          <Dialog.Close asChild>
            <button className={mobileNotReadyModalCloseButton} aria-label="닫기">
              <Icon icon="X" width={12} height={12} />
            </button>
          </Dialog.Close>

          <Dialog.Title className={mobileNotReadyModalTitle}>{titleMap[menu]}</Dialog.Title>
          <div className={mobileNotReadyModalImage}>
            <Image
              src={NotReadyMobile}
              alt="모바일 버전 화면 준비중"
              width={144}
              height={144}
              style={{
                objectFit: 'contain',
                height: 'auto',
              }}
              quality={100}
            />
          </div>

          <Dialog.Close asChild>
            <div className={mobileNotReadyModalButtonContainer}>
              <Link href={menuRouteMap(normalizedPostId)[menu]}>
                <div className={notReadyButton}>그래도 둘러보기</div>
              </Link>
            </div>
          </Dialog.Close>
          <Dialog.Close asChild>
            <Link
              href={menuRouteMap(normalizedPostId)[menu]}
              onClick={() => {
                const cookieKey = HIDE_MODAL_COOKIE_KEYS[menu];
                setHideModalCookie(cookieKey);
              }}
            >
              <div className={mobileNotReadyModalSecondaryButton}>하루 동안 그만 보기</div>
            </Link>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default MobileNotReadyModal;
