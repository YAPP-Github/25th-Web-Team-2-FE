import ConfirmModal from '@/components/Modal/ConfirmModal/ConfirmModal';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
}

const DeleteConfirmModal = ({ isOpen, onOpenChange, onDelete }: DeleteConfirmModalProps) => {
  return (
    <ConfirmModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      confirmTitle="해당 공고를 삭제할까요?"
      cancelText="닫기"
      confirmText="삭제하기"
      onConfirm={onDelete}
    />
  );
};

export default DeleteConfirmModal;
