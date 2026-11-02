import { UseApplyMethodQueryResponse } from '../hooks/useApplyMethodQuery';

export interface CommonModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface PostDetailBottomSheetProps {
  onConfirm: () => void;
  postId: string;
  onEditClick: () => void;
  onDeleteClick: () => void;
}

export interface ParticipationGuideBottomSheetProps {
  onConfirm: () => void;
  applyMethodData: UseApplyMethodQueryResponse;
}
