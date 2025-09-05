import { STEP } from './JoinPage.constants';

// region 타입, area 타입
export type Gender = 'MALE' | 'FEMALE' | 'ALL';
export type MatchType = 'ONLINE' | 'OFFLINE' | 'ALL';
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
