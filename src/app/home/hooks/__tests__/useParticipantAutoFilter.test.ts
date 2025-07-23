import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useParticipantAutoFilter } from '../useParticipantAutoFilter';
import useQueryParams from '../useQueryParams';

import { ParticipantResponse, ResearcherResponse } from '@/apis/login';

const mockRouter = {
  replace: vi.fn(),
  push: vi.fn(),
  back: vi.fn(),
  forward: vi.fn(),
  refresh: vi.fn(),
  prefetch: vi.fn(),
};

const mockSearchParams = new URLSearchParams();
const mockPathname = '/home';

vi.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
  useSearchParams: () => mockSearchParams,
  usePathname: () => mockPathname,
}));

vi.mock('../useQueryParams', () => ({
  default: () => ({
    searchParams: new URLSearchParams(mockSearchParams),
    updateURLParams: vi.fn((newParams: URLSearchParams) => {
      Array.from(mockSearchParams.keys()).forEach((key) => {
        mockSearchParams.delete(key);
      });
      newParams.forEach((value, key) => {
        mockSearchParams.set(key, value);
      });
    }),
  }),
}));

const mockParticipant: ParticipantResponse = {
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
};

const mockResearcher: ResearcherResponse = {
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
};

describe('useParticipantAutoFilter', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Array.from(mockSearchParams.keys()).forEach((key) => {
      mockSearchParams.delete(key);
    });
  });

  describe('참여자 자동 필터링', () => {
    it('참여자가 빈 URL로 접근 시 자동 필터링이 적용된다.', () => {
      const { result, rerender } = renderHook(() =>
        useParticipantAutoFilter({
          userInfo: mockParticipant,
          isUserInfoLoading: false,
        }),
      );

      expect(mockSearchParams.get('recruitStatus')).toBe('ALL');
      expect(mockSearchParams.get('gender')).toBe('MALE');
      expect(mockSearchParams.get('age')).toBe('25');
      expect(result.current.isAutoFilled).toBe(false);

      rerender();

      expect(result.current.isAutoFilled).toBe(true);
    });

    it('참여자가 필터 초기화 시 자동 필터링이 적용되지 않는다.', () => {
      renderHook(() =>
        useParticipantAutoFilter({
          userInfo: mockParticipant,
          isUserInfoLoading: false,
        }),
      );

      const { updateURLParams } = useQueryParams();
      const mockUpdateURLParams = updateURLParams as ReturnType<typeof vi.fn>;
      const resetParams = new URLSearchParams();
      resetParams.set('recruitStatus', 'ALL');
      mockUpdateURLParams(resetParams);

      expect(mockSearchParams.get('recruitStatus')).toBe('ALL');
      expect(mockSearchParams.has('gender')).toBe(false);
      expect(mockSearchParams.has('age')).toBe(false);
    });
  });

  describe('참여자가 아닌 경우', () => {
    it('연구자는 자동 필터링이 적용되지 않는다.', () => {
      const { result } = renderHook(() =>
        useParticipantAutoFilter({
          userInfo: mockResearcher,
          isUserInfoLoading: false,
        }),
      );

      expect(mockSearchParams.toString()).toBe('');
      expect(result.current.isAutoFilled).toBe(true);
    });

    it('비로그인 유저는 자동 필터링이 적용되지 않는다.', () => {
      const { result } = renderHook(() =>
        useParticipantAutoFilter({
          userInfo: undefined,
          isUserInfoLoading: false,
        }),
      );

      expect(mockSearchParams.toString()).toBe('');
      expect(result.current.isAutoFilled).toBe(true);
    });
  });
});
