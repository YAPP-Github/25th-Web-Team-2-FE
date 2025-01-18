export interface EmailForm {
  contactEmail: string;
  univEmail: string;
  authCode: string;
  isEmailVerified: boolean;
  isAllCheck: boolean;
  isTermOfService: boolean;
  isPrivacy: boolean;
  isAdvertise: boolean;
}

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

export interface InfoForm {
  name: string;
  univName: string;
  major: string;
  labInfo: string;
}
