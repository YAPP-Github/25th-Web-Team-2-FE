import { API } from './config';

import { API_URL } from '@/constants/url';

interface UnivAuthCodeResponse {
  isSuccess: boolean;
  message: string;
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

export const googleLogin = async (code: string, role: string) => {
  const res = await API.post<LoginResponse>(API_URL.google(role), { authorizationCode: code });

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
