'use client';
import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import {
  HIDE_MODAL_COOKIE_KEYS,
  modalMenuRouteMap,
  modalTitleMap,
} from './mobileNotReadyModal.constants';
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
import { setHideModalCookie } from '@/lib/cookies';

export type NotReadyMenu = 'profile' | 'upload' | 'edit' | 'myPosts';
export interface NotReadyModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  menu: NotReadyMenu;
  editPostId?: string;
}

const MobileNotReadyModal = ({ menu, isOpen, onOpenChange, editPostId }: NotReadyModalProps) => {
  const { postId } = useParams();
  const normalizedPostId = Array.isArray(postId) ? postId[0] : postId ?? editPostId;

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

          <Dialog.Title className={mobileNotReadyModalTitle}>{modalTitleMap[menu]}</Dialog.Title>
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
              <Link className={notReadyButton} href={modalMenuRouteMap(normalizedPostId)[menu]}>
                그래도 둘러보기
              </Link>
            </div>
          </Dialog.Close>
          <Dialog.Close asChild>
            <Link
              href={modalMenuRouteMap(normalizedPostId)[menu]}
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
