import { API } from './config';

import { JoinParams } from '@/app/join/JoinPage.types';
import { API_URL } from '@/constants/url';

interface UnivAuthCodeResponse {
  isSuccess: boolean;
  message: string;
}

interface JoinResponse {
  accessToken: string;
  refreshToken: string;
  memberInfo: Member;
}

interface LoginResponse {
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
  role: 'RESEARCHER' | 'PARTICIPANT';
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
}

export interface ResearcherResponse {
  leadResearcher: string;
  univName: string;
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

export const join = async (params: JoinParams) => {
  const res = await API.post<JoinResponse>(API_URL.join, { ...params });

  return res.data;
};

export const getResearcherInfo = async () => {
  const res = await API.get<ResearcherResponse>(API_URL.me('researchers'));

  return res.data;
};

export const getParticipantInfo = async () => {
  const res = await API.get<ParticipantResponse>(API_URL.me('participants'));

  return res.data;
};

export const updateAccessToken = async (refreshToken: string) => {
  const res = await API.post<LoginResponse>(API_URL.refresh, { refreshToken });

  return res.data;
};
