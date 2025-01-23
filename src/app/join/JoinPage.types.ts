export interface JoinParams {
  provider: 'NAVER' | 'GOOGLE';
  oauthEmail: string;
  contactEmail: string;
  univEmail: string;
  name: string;
  univName: string;
  major: string;
  labInfo: string;
}

export interface ServiceAgreeCheck {
  isTermOfService: boolean;
  isPrivacy: boolean;
  isAdvertise: boolean;
}
