// TODO: 타입 좁히기
// birthDate: '2025-01-22';
// region 타입, area 타입
export type Gender = 'MALE' | 'FEMALE' | 'ALL';
export type MatchType = 'ONLINE' | 'OFFLINE' | 'ALL';

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
