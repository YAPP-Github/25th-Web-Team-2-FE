import { ParticipantResponse, ResearcherResponse } from '@/apis/login';

export const mockParticipant = {
  memberInfo: {
    memberId: 1,
    name: '테스트',
    oauthEmail: 'test@example.com',
    provider: 'GOOGLE',
    contactEmail: 'test@example.com',
    role: 'PARTICIPANT',
  },
  gender: 'MALE',
  birthDate: '2000-01-01',
  basicAddressInfo: {
    region: 'SEOUL_ALL',
    area: 'GANGNAMGU',
  },
  additionalAddressInfo: {
    region: 'GYEONGGI_ALL',
    area: 'SUWON_GWONSEONGU',
  },
  matchType: 'ALL',
  adConsent: true,
  matchConsent: true,
} satisfies ParticipantResponse;

export const mockResearcher = {
  memberInfo: {
    memberId: 2,
    name: '연구자',
    oauthEmail: 'researcher@example.com',
    provider: 'GOOGLE',
    contactEmail: 'researcher@example.com',
    role: 'RESEARCHER',
  },
  univEmail: 'researcher@univ.ac.kr',
  univName: '테스트 대학교',
  major: '컴퓨터공학과',
  labInfo: 'AI 연구실',
  adConsent: true,
} satisfies ResearcherResponse;
