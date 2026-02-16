import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';

import {
  dialogOverlay,
  modalContent,
  modalDescription,
  modalTitle,
  closeButton,
  modalTitleContainer,
  modalButtonContainer,
} from './MatchConsentConfirmModal.css';

import Button from '@/components/Button/Button';
import Icon from '@/components/Icon';
import {
  CLICK_MODAL_MATCHING_OPT_IN_AGREE,
  CLICK_MODAL_MATCHING_OPT_IN_SKIP,
  VIEW_MODAL_MATCHING_OPT_IN,
} from '@/lib/mixpanel/signupEvents';
import { trackEvent } from '@/lib/mixpanelClient';

interface MatchConsentConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
  title: string;
  description: string;
  onSubmit: () => void;
  onConsent: () => void;
}

const MatchConsentConfirmModal = ({
  open,
  onOpenChange,
  onClose,
  title,
  description,
  onSubmit,
  onConsent,
}: MatchConsentConfirmModalProps) => {
  const [hasTracked, setHasTracked] = useState(false);

  const handleSkipClick = () => {
    trackEvent(CLICK_MODAL_MATCHING_OPT_IN_SKIP);
    onSubmit();
  };

  const handleAgreeClick = () => {
    trackEvent(CLICK_MODAL_MATCHING_OPT_IN_AGREE);
    onConsent();
  };

  useEffect(() => {
    if (open && !hasTracked) {
      trackEvent(VIEW_MODAL_MATCHING_OPT_IN);
      setHasTracked(true);
    }
  }, [open, hasTracked]);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={dialogOverlay} />
        <Dialog.Content className={modalContent}>
          <Dialog.Close asChild>
            <button className={closeButton} aria-label="모달 닫기" onClick={onClose}>
              <Icon icon="X" width={12} height={12} cursor="pointer" />
            </button>
          </Dialog.Close>
          <div className={modalTitleContainer}>
            <Dialog.Title>
              <span className={modalTitle}>{title}</span>
            </Dialog.Title>
            <Dialog.Description>
              <span className={modalDescription}>{description}</span>
            </Dialog.Description>
          </div>
          <div className={modalButtonContainer}>
            <Button variant="secondary" size="small" onClick={handleSkipClick}>
              그냥 가입하기
            </Button>
            <Button variant="primary" size="small" onClick={handleAgreeClick}>
              동의하기
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default MatchConsentConfirmModal;
