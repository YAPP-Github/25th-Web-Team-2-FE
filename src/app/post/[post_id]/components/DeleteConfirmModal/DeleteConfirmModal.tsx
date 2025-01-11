import * as Dialog from '@radix-ui/react-dialog';

import {
  buttonGroup,
  cancelButton,
  confirmButton,
  dialogTitle,
  dialogContent,
  modalButtonStyle,
} from './DeleteConfirmModal.styles';
import { closeButton, dialogOverlay } from '../../PostPage.styles';
import { CommonModalProps } from '../../PostPage.types';

import Icon from '@/components/Icon';
import { colors } from '@/styles/colors';

const DeleteConfirmModal = ({ isOpen, onOpenChange }: CommonModalProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay css={dialogOverlay} />
        <Dialog.Content css={dialogContent} aria-describedby={undefined}>
          <Dialog.Close asChild>
            <button css={closeButton} aria-label="모달 닫기">
              <Icon icon="X" color={colors.icon03} width={10} height={10} cursor="pointer" />
            </button>
          </Dialog.Close>
          <Dialog.Title asChild>
            <h3 css={dialogTitle}>해당 공고를 삭제할까요?</h3>
          </Dialog.Title>
          <div css={buttonGroup}>
            <Dialog.Close asChild>
              <button css={[modalButtonStyle, cancelButton]}>닫기</button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <button css={[modalButtonStyle, confirmButton]}>삭제하기</button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DeleteConfirmModal;
