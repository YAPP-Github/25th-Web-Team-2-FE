'use client';

import * as Dialog from '@radix-ui/react-dialog';
import Image, { type StaticImageData } from 'next/image';
import { useState } from 'react';

import {
  closeButtonContainer,
  dialogOverlay,
  imageContainer,
  indicator,
  indicatorContainer,
  modalContainer,
  promotionModalContent,
} from './PromotionModal.css';

import Button from '@/components/Button/Button';
import Icon from '@/components/Icon';
import { a11yHidden } from '@/styles/a11y.css';
import { colors } from '@/styles/colors';
import { trackEvent } from '@/lib/mixpanelClient';

interface PromotionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  onClose: () => void;
  images: StaticImageData[];
  title?: string;
  buttonText?: string;
}

const PromotionModal = ({
  open,
  onOpenChange,
  onConfirm,
  onClose,
  images,
  title = '공고 등록 홍보 모달',
  buttonText = '빠르게 공고 등록하러 가기',
}: PromotionModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleConfirm = () => {
    onConfirm();
    trackEvent('AI Extract Keywords Modal', {
      action: 'Conversion Click',
    });
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={dialogOverlay} />
        <Dialog.Content asChild className={promotionModalContent} aria-describedby={undefined}>
          <div className={modalContainer}>
            <Dialog.Title className={a11yHidden}>{title}</Dialog.Title>

            <div className={closeButtonContainer}>
              <Dialog.Close asChild>
                <button aria-label="모달 닫기" onClick={onClose}>
                  <Icon icon="X" width={12} height={12} cursor="pointer" color={colors.icon03} />
                </button>
              </Dialog.Close>
            </div>

            <div className={imageContainer}>
              <Image
                src={images[currentImageIndex]}
                alt={`프로모션 이미지 ${currentImageIndex + 1}`}
                style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
              />
            </div>

            <div className={indicatorContainer}>
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={indicator}
                  style={{
                    backgroundColor: idx === currentImageIndex ? colors.primaryMint : colors.icon02,
                  }}
                  aria-label={`슬라이드 ${idx + 1}`}
                />
              ))}
            </div>

            <Button
              variant="primary"
              size="medium"
              onClick={handleConfirm}
              style={{ padding: '1.6rem 0' }}
            >
              {buttonText}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default PromotionModal;
