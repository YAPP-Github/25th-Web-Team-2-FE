import { STEP } from './JoinPage.constants';

export type StepType = (typeof STEP)[keyof typeof STEP];

export interface ServiceAgreeCheck {
  isTermOfService: boolean;
  isPrivacy: boolean;
  isAdvertise: boolean;
  isRecommend?: boolean;
}

export interface FilterOption {
  label: string;
  value: string;
}
