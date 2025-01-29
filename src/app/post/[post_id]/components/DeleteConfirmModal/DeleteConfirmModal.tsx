import * as Dialog from '@radix-ui/react-dialog';

import {
  deleteConfirmButtonContainer,
  cancelButton,
  confirmButton,
  deleteConfirmTitle,
  deleteConfirmContent,
  deleteConfirmButtonWrapper,
} from './DeleteConfirmModal.css';
import { dialogOverlay, closeButton } from '../../PostPage.css';
import { CommonModalProps } from '../../PostPage.types';

import Icon from '@/components/Icon';
import { colors } from '@/styles/colors';

const DeleteConfirmModal = ({ isOpen, onOpenChange }: CommonModalProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={dialogOverlay} />
        <Dialog.Content className={deleteConfirmContent} aria-describedby={undefined}>
          <Dialog.Close asChild>
            <button className={closeButton} aria-label="모달 닫기">
              <Icon icon="X" color={colors.icon03} width={10} height={10} cursor="pointer" />
            </button>
          </Dialog.Close>
          <Dialog.Title asChild>
            <h3 className={deleteConfirmTitle}>해당 공고를 삭제할까요?</h3>
          </Dialog.Title>
          <div className={deleteConfirmButtonContainer}>
            <Dialog.Close asChild>
              <button className={`${deleteConfirmButtonWrapper} ${cancelButton}`}>닫기</button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <button className={`${deleteConfirmButtonWrapper} ${confirmButton}`}>삭제하기</button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DeleteConfirmModal;
