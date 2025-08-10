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
  applyMethodData: UseApplyMethodQueryResponse;
}

export const MATCH_TYPE = {
  ONLINE: 'ONLINE',
  OFFLINE: 'OFFLINE',
  ALL: 'ALL',
} as const;

export type MatchType = (typeof MATCH_TYPE)[keyof typeof MATCH_TYPE];

export const GENDER_TYPE = {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  ALL: 'ALL',
} as const;

export type GenderType = (typeof GENDER_TYPE)[keyof typeof GENDER_TYPE];
