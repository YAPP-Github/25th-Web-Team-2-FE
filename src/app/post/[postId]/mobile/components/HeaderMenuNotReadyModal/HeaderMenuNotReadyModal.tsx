'use client';
import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';
import Link from 'next/link';

import { NotReadyModalProps } from '../EditNotReadyModal/EditNotReadyModal';
import {
  editModalButtonContainer,
  editModalCloseButton,
  editModalContent,
  editModalImage,
  editModalOverlay,
  editModalTitle,
} from '../EditNotReadyModal/EditNotReadyModal.css';

import NotReadyMobile from '@/assets/images/notReadyMobile.svg';
import Button from '@/components/Button/Button';
import Icon from '@/components/Icon';

//todo NotReadyModal(edit / upload / profile) 공통으로 쓸 수 있게 수정 예정
// 임시 컴포넌트 위치 변경 예정

const HeaderMenuNotReadyModal = ({ menu, isOpen, onOpenChange }: NotReadyModalProps) => {
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
            {menu === 'upload' && <div>모바일 버전 글쓰기 화면은 준비 중이에요</div>}
            {menu === 'profile' && <div>모바일 버전 내 정보 화면은 준비 중이에요</div>}
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
            <Link href={menu === 'profile' ? '/user/profile' : '/upload'} passHref>
              <Dialog.Close asChild>
                <Button variant="primary" size="medium" height="5.6rem">
                  그래도 둘러보기
                </Button>
              </Dialog.Close>
            </Link>
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

export default HeaderMenuNotReadyModal;
