import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useParticipantAutoFilter } from '../useParticipantAutoFilter';
import useQueryParams from '../useQueryParams';

import { mockParticipant, mockResearcher } from '@/tests/mocks/userData';
import { mockSearchParams } from '@/tests/setup';

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
          participantInfo: mockParticipant,
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
          participantInfo: mockParticipant,
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
          participantInfo: mockParticipant,
        }),
      );

      expect(mockSearchParams.toString()).toBe('');
      expect(result.current.isAutoFilled).toBe(true);
    });

    it('비로그인 유저는 자동 필터링이 적용되지 않는다.', () => {
      const { result } = renderHook(() =>
        useParticipantAutoFilter({
          participantInfo: undefined,
        }),
      );

      expect(mockSearchParams.toString()).toBe('');
      expect(result.current.isAutoFilled).toBe(true);
    });
  });
});
