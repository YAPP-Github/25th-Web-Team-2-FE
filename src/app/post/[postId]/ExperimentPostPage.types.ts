import { UseApplyMethodQueryResponse } from './hooks/useApplyMethodQuery';

export interface CommonModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface PostDetailBottomSheetProps {
  onConfirm: VoidFunction;
  postId: string;
  onEditClick: VoidFunction;
  onDeleteClick: VoidFunction;
}

export interface ParticipationGuideBottomSheetProps {
  onConfirm: VoidFunction;
  showToast: (message: string) => void;
  applyMethodData: UseApplyMethodQueryResponse;
}
