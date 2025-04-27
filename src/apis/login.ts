import { ROLE } from '@/constants/config';
import { API } from './config';
import { ValidateContactEmailParams } from './user';

import { API_URL } from '@/constants/url';
import { ParticipantJoinSchemaType } from '@/schema/join/ParticipantJoinSchema';
import { ResearcherJoinSchemaType } from '@/schema/join/ResearcherJoinSchema';
import { Role } from '@/types/user';

export interface UnivAuthCodeResponse {
  isSuccess: boolean;
  message: string;
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
  gender: 'MALE' | 'FEMALE';
  birthDate: string;
  basicAddressInfo: {
    region: string;
    area: string;
  };
  additionalAddressInfo: {
    region: string;
    area: string;
  };
  matchType: 'OFFLINE' | 'ONLINE' | 'ALL';
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
  const res = await API.post<LoginResponse>(API_URL.google(role), { authorizationCode: code });

  return res.data;
};

export const naverLogin = async ({ code, role, state }: NaverLoginParams) => {
  const res = await API.post<LoginResponse>(API_URL.naver(role), {
    authorizationCode: code,
    state,
  });

  return res.data;
};

export const sendUnivAuthCode = async (univEmail: string) => {
  const res = await API.post<UnivAuthCodeResponse>(API_URL.send, { univEmail });

  return res.data;
};

export const verifyUnivAuthCode = async (univEmail: string, inputCode: string) => {
  const res = await API.post<UnivAuthCodeResponse>(API_URL.verify, { univEmail, inputCode });

  return res.data;
};

export const joinResearcher = async (params: ResearcherJoinSchemaType) => {
  const res = await API.post<JoinResponse>(API_URL.joinResearcher, { ...params });

  return res.data;
};

export const joinParticipant = async (params: ParticipantJoinSchemaType) => {
  const res = await API.post<JoinResponse>(API_URL.joinParticipant, { ...params });

  return res.data;
};

export const getResearcherInfo = async () => {
  const res = await API.get<ResearcherResponse>(API_URL.me(ROLE.researcher.toLowerCase()));

  return res.data;
};

export const getParticipantInfo = async () => {
  const res = await API.get<ParticipantResponse>(API_URL.me(ROLE.participant.toLowerCase()));

  return res.data;
};

export const updateAccessToken = async (refreshToken: string) => {
  const res = await API.post<LoginResponse>(API_URL.refresh, { refreshToken });

  return res.data;
};

export const validateContactEmailInfo = async ({ contactEmail }: ValidateContactEmailParams) => {
  const res = await API.get(API_URL.validateContactEmailInfo(contactEmail));

  return res.data;
};
