import * as Dialog from '@radix-ui/react-dialog';

import { alertModalContent, alertModalDescription, alertModalTitle } from './AlertModal.css';
import { closeButton, dialogOverlay } from '../ConfirmModal/ConfirmModal.css';

import Icon from '@/components/Icon';
import { colors } from '@/styles/colors';

interface AlertModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  handleCloseModal: () => void;
  title: string;
  description: string;
}

const AlertModal = ({
  open,
  onOpenChange,
  handleCloseModal,
  title,
  description,
}: AlertModalProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Overlay className={dialogOverlay} />
      <Dialog.Content className={alertModalContent} onPointerDownOutside={handleCloseModal}>
        <Dialog.Close asChild>
          <button className={closeButton} aria-label="모달 닫기" onClick={handleCloseModal}>
            <Icon icon="X" color={colors.icon03} width={10} height={10} cursor="pointer" />
          </button>
        </Dialog.Close>
        <Dialog.Title asChild>
          <>
            <Icon
              icon="BangRound"
              width={48}
              height={48}
              color={'rgba(246, 101, 112, 0.25)'}
              subcolor={colors.textAlert}
              aria-label="안내 아이콘"
            />
            <p className={alertModalTitle}>{title}</p>
          </>
        </Dialog.Title>
        <Dialog.Description>
          <p className={alertModalDescription}>{description}</p>
        </Dialog.Description>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default AlertModal;
