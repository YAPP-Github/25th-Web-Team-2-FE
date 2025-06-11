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
} from './EditNotReadyModal.css';

import NotReadyMobile from '@/assets/images/notReadyMobile.svg';
import Button from '@/components/Button/Button';
import Icon from '@/components/Icon';

interface EditNotReadyModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const EditNotReadyModal = ({ isOpen, onOpenChange }: EditNotReadyModalProps) => {
  const { post_id } = useParams();
  const postId = Array.isArray(post_id) ? post_id[0] : post_id;

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
              quality={100}
            />
          </div>

          <div className={editModalButtonContainer}>
            <Dialog.Close asChild>
              <Link href={`/edit/${postId}`} passHref>
                <Button variant="primary" size="medium" height="5.6rem">
                  그래도 둘러보기
                </Button>
              </Link>
            </Dialog.Close>
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
