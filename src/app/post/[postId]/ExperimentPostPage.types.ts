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
  postId: string;
  showToast: (message: string) => void;
}
