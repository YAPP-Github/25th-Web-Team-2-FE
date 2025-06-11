import { Dispatch, SetStateAction } from 'react';

export interface CommonModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface PostDetailBottomSheetProps {
  onConfirm: VoidFunction;
  postId: string;
  setIsToastOpen: Dispatch<SetStateAction<boolean>>;
  onEditClick?: VoidFunction;
  onDeleteClick?: VoidFunction;
}
