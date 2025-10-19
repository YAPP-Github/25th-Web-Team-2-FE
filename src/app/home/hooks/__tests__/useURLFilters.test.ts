import { renderHook, act } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import useURLFilters from '../useURLFilters';

import { mockSearchParams } from '@/tests/setup';
import { customWrapper } from '@/tests/test-utils';

describe('useURLFilters', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Array.from(mockSearchParams.keys()).forEach((key) => {
      mockSearchParams.delete(key);
    });
  });

  describe('기본 동작', () => {
    it('쿼리 파라미터가 없을 때 기본 필터를 반환한다.', () => {
      const { result } = renderHook(() => useURLFilters(), {
        wrapper: customWrapper,
      });

      expect(result.current.filters).toEqual({
        recruitStatus: 'ALL',
      });
    });

    it('쿼리 파라미터가 있을 때 파싱된 필터를 반환한다.', () => {
      mockSearchParams.set('recruitStatus', 'OPEN');
      mockSearchParams.set('gender', 'MALE');
      mockSearchParams.set('age', '25');

      const { result } = renderHook(() => useURLFilters(), {
        wrapper: customWrapper,
      });

      expect(result.current.filters).toEqual({
        recruitStatus: 'OPEN',
        gender: 'MALE',
        age: 25,
      });
      expect(result.current.isRecruiting).toBe(true);
    });
  });

  describe('필터 변경', () => {
    it('handleFilterChange로 필터를 변경할 수 있다.', () => {
      const { result, rerender } = renderHook(() => useURLFilters(), {
        wrapper: customWrapper,
      });

      act(() => {
        result.current.handleFilterChange({
          recruitStatus: 'OPEN',
          gender: 'FEMALE',
          age: 30,
        });
      });

      expect(mockSearchParams.get('recruitStatus')).toBe('OPEN');
      expect(mockSearchParams.get('gender')).toBe('FEMALE');
      expect(mockSearchParams.get('age')).toBe('30');

      rerender();

      expect(result.current.filters).toEqual({
        recruitStatus: 'OPEN',
        gender: 'FEMALE',
        age: 30,
      });
    });

    it('배열 값을 인자로 넘겨주면 쿼리 파라미터에는 쉼표로 구분하여 저장된다.', () => {
      const { result, rerender } = renderHook(() => useURLFilters(), {
        wrapper: customWrapper,
      });

      act(() => {
        result.current.handleFilterChange({
          areas: ['GEUMCHEONGU', 'NOWONGU'],
        });
      });

      expect(mockSearchParams.get('areas')).toBe('GEUMCHEONGU,NOWONGU');

      rerender();

      expect(result.current.filters).toEqual({
        recruitStatus: 'ALL',
        areas: ['GEUMCHEONGU', 'NOWONGU'],
      });
    });
  });

  describe('모집 상태 토글', () => {
    it('handleToggleRecruitStatus로 모집 상태를 변경할 수 있다.', () => {
      const { result, rerender } = renderHook(() => useURLFilters(), {
        wrapper: customWrapper,
      });

      expect(result.current.filters).toEqual({ recruitStatus: 'ALL' });

      act(() => {
        result.current.handleToggleRecruitStatus();
      });

      expect(mockSearchParams.get('recruitStatus')).toBe('OPEN');

      rerender();

      expect(result.current.filters).toEqual({ recruitStatus: 'OPEN' });
      expect(result.current.isRecruiting).toBe(true);
    });
  });

  describe('필터 초기화', () => {
    it('handleResetFilter로 필터를 초기화할 수 있다.', () => {
      mockSearchParams.set('gender', 'MALE');
      mockSearchParams.set('age', '25');

      const { result, rerender } = renderHook(() => useURLFilters(), {
        wrapper: customWrapper,
      });

      expect(mockSearchParams.get('age')).toBe('25');
      expect(mockSearchParams.get('gender')).toBe('MALE');

      act(() => {
        result.current.handleResetFilter();
      });

      rerender();

      expect(mockSearchParams.get('recruitStatus')).toBe('ALL');
      expect(mockSearchParams.has('age')).toBe(false);
      expect(mockSearchParams.has('gender')).toBe(false);

      expect(result.current.filters).toEqual({
        recruitStatus: 'ALL',
      });
    });
  });
});
