'use client';
import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import {
  editModalContent,
  editModalOverlay,
  editModalTitle,
  editModalCloseButton,
  editModalButtonContainer,
  editModalImage,
  notReadyButton,
} from './EditNotReadyModal.css';

import NotReadyMobile from '@/assets/images/notReadyMobile.svg';
import Icon from '@/components/Icon';

export type NotReadyMenu = 'profile' | 'upload' | 'edit';
export interface NotReadyModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  menu: NotReadyMenu;
}

const EditNotReadyModal = ({ isOpen, onOpenChange }: NotReadyModalProps) => {
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

          <Dialog.Title className={editModalTitle}>
            <div>모바일 버전 공고 수정 화면은 준비 중이에요</div>
            <div>PC에서 더 편리하게 이용하실 수 있어요</div>
          </Dialog.Title>

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

          <div className={editModalButtonContainer}>
            {normalizedPostId && (
              <Link href={`/edit/${normalizedPostId}`} passHref>
                <Dialog.Close asChild>
                  <div className={notReadyButton}>그래도 둘러보기</div>
                </Dialog.Close>
              </Link>
            )}
            {/* todo 하루 동안 안보기 추가 예정 */}
            {/* <Dialog.Close asChild>
              <button className={editModalSecondaryButton}>하루 동안 그만 보기</button>
            </Dialog.Close> */}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default EditNotReadyModal;
