import { fetchClient, noRetryFetchClient } from './config/fetchClient';
import { ValidateContactEmailParams } from './user';

import { API_URL } from '@/constants/url';
import { ParticipantJoinSubmitSchemaType } from '@/schema/join/ParticipantJoinSchema';
import { ResearcherJoinSubmitSchemaType } from '@/schema/join/ResearcherJoinSchema';
import { Role } from '@/types/user';

export interface UnivAuthCodeResponse {
  isSuccess: boolean;
  message: string;
  requestCount: number;
}

interface JoinResponse {
  accessToken: string;
  refreshToken: string;
  memberInfo: Member;
}

export interface LoginResponse {
  isRegistered: boolean;
  accessToken: string;
  refreshToken: string;
  memberInfo: Member;
}

interface Member {
  memberId: number;
  name: string;
  oauthEmail: string;
  provider: 'GOOGLE' | 'NAVER';
  contactEmail: string;
  role: Role;
}

export interface ParticipantResponse {
  memberInfo: Member;
  gender: 'MALE' | 'FEMALE' | 'ALL';
  birthDate: string;
  basicAddressInfo: {
    region: string;
    area: string;
  };
  additionalAddressInfo: {
    region: string;
    area: string;
  };
  matchType: 'OFFLINE' | 'ONLINE' | 'ALL' | null;
  adConsent: boolean;
  matchConsent: boolean;
}

export interface ResearcherResponse {
  memberInfo: Member;
  univEmail: string;
  univName: string;
  major: string;
  labInfo: string;
  adConsent: boolean;
}

export interface NaverLoginParams {
  code: string;
  role: string;
  state: string;
}

export const googleLogin = async (code: string, role: string) => {
  return await fetchClient.post<LoginResponse>(API_URL.google(role), {
    body: { authorizationCode: code },
  });
};

export const naverLogin = async ({ code, role, state }: NaverLoginParams) => {
  return await fetchClient.post<LoginResponse>(API_URL.naver(role), {
    body: { authorizationCode: code, state },
  });
};

export const sendUnivAuthCode = async (univEmail: string) => {
  return await fetchClient.post<UnivAuthCodeResponse>(API_URL.send, { body: { univEmail } });
};

export const verifyUnivAuthCode = async (univEmail: string, inputCode: string) => {
  return await fetchClient.post<UnivAuthCodeResponse>(API_URL.verify, {
    body: { univEmail, inputCode },
  });
};

export const joinResearcher = async (params: ResearcherJoinSubmitSchemaType) => {
  return await fetchClient.post<JoinResponse>(API_URL.joinResearcher, { body: params });
};

export const joinParticipant = async (params: ParticipantJoinSubmitSchemaType) => {
  return await fetchClient.post<JoinResponse>(API_URL.joinParticipant, { body: params });
};

export const updateAccessToken = async (refreshToken: string) => {
  return await noRetryFetchClient.post<LoginResponse>(API_URL.refresh, { body: { refreshToken } });
};

export const validateJoinContactEmail = async ({ contactEmail }: ValidateContactEmailParams) => {
  return await fetchClient.get(API_URL.validateJoinContactEmail(contactEmail));
};
