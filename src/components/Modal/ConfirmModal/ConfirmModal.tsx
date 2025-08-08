import * as Dialog from '@radix-ui/react-dialog';

import {
  confirmButtonContainer,
  cancelButton,
  confirmTitleStyle,
  confirmContent,
  confirmButtonWrapper,
  confirmDescriptionStyle,
  dialogOverlay,
  closeButton,
} from './ConfirmModal.css';

import Icon from '@/components/Icon';
import { colors } from '@/styles/colors';

interface ConfirmModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  confirmTitle: string;
  cancelText: string;
  confirmText: string;
  onConfirm: VoidFunction;
  descriptionText?: string;
  descriptionTextColor?: string;
  confirmButtonColor?: string;
  closeIcon?: boolean;
  isMobile?: boolean;
}

const ConfirmModal = ({
  isOpen,
  onOpenChange,
  confirmTitle,
  descriptionText,
  descriptionTextColor = colors.text03,
  cancelText,
  confirmText,
  onConfirm,
  confirmButtonColor = colors.primaryMint,
  closeIcon = true,
  isMobile = false,
}: ConfirmModalProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={dialogOverlay} />
        <Dialog.Content className={confirmContent({ isMobile })} aria-describedby={undefined}>
          {closeIcon && (
            <Dialog.Close asChild>
              <button className={closeButton} aria-label="모달 닫기">
                <Icon icon="X" color={colors.icon03} width={10} height={10} cursor="pointer" />
              </button>
            </Dialog.Close>
          )}
          <Dialog.Title asChild>
            <div className={confirmTitleStyle({ isMobile })}>
              <h3>{confirmTitle}</h3>
              {descriptionText && (
                <p className={confirmDescriptionStyle} style={{ color: descriptionTextColor }}>
                  {descriptionText}
                </p>
              )}
            </div>
          </Dialog.Title>
          <div className={confirmButtonContainer({ isMobile })}>
            <Dialog.Close asChild>
              <button className={`${confirmButtonWrapper} ${cancelButton}`}>{cancelText}</button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <button
                className={confirmButtonWrapper}
                style={{ backgroundColor: confirmButtonColor, color: colors.text01 }}
                onClick={onConfirm}
              >
                {confirmText}
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ConfirmModal;
