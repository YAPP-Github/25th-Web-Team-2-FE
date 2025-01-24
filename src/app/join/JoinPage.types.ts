export interface ResearcherJoinParams {
  provider: 'NAVER' | 'GOOGLE';
  oauthEmail: string;
  contactEmail: string;
  univEmail: string;
  name: string;
  univName: string;
  major: string;
  labInfo: string;
}

// TODO: 타입 좁히기
// birthDate: '2025-01-22';
// region 타입, area 타입
export type Gender = 'MALE' | 'FEMALE' | 'ALL';
export type MatchType = 'ONLINE' | 'OFFLINE' | 'ALL';

export interface ParticipantJoinParams {
  provider: 'NAVER' | 'GOOGLE';
  oauthEmail: string;
  contactEmail: string;
  name: string;
  gender: Gender;
  birthDate: string;
  basicAddressInfo: {
    region: string;
    area: string;
  };
  additionalAddressInfo: {
    region: string;
    area: string;
  };
  matchType: MatchType;
}

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
