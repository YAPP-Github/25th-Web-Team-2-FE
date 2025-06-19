'use client';
import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';
import Link from 'next/link';

import { HIDE_MODAL_COOKIE_KEYS } from '../../ExperimentPostPage.constants';
import { NotReadyModalProps } from '../EditNotReadyModal/EditNotReadyModal';
import {
  editModalButtonContainer,
  editModalCloseButton,
  editModalContent,
  editModalImage,
  editModalOverlay,
  editModalSecondaryButton,
  editModalTitle,
  notReadyButton,
} from '../EditNotReadyModal/EditNotReadyModal.css';

import NotReadyMobile from '@/assets/images/notReadyMobile.svg';
import Icon from '@/components/Icon';
import { setHideModalCookie } from '@/lib/cookies';
import { useParams } from 'next/navigation';

//todo NotReadyModal(edit / upload / profile) 공통으로 쓸 수 있게 수정 예정
// 임시 컴포넌트 위치 변경 예정

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

const HeaderMenuNotReadyModal = ({ menu, isOpen, onOpenChange }: NotReadyModalProps) => {
  const { postId } = useParams();
  const normalizedPostId = Array.isArray(postId) ? postId[0] : postId;

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={editModalOverlay} />
        <Dialog.Content className={editModalContent} aria-describedby={undefined}>
          <Dialog.Close asChild>
            <button className={editModalCloseButton} aria-label="닫기">
              <Icon icon="X" width={12} height={12} />
            </button>
          </Dialog.Close>

          <Dialog.Title className={editModalTitle}>{titleMap[menu]}</Dialog.Title>
          <div className={editModalImage}>
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
            <div className={editModalButtonContainer}>
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
              <div className={editModalSecondaryButton}>하루 동안 그만 보기</div>
            </Link>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default HeaderMenuNotReadyModal;
