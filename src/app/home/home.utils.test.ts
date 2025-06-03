import { describe, expect, it } from 'vitest';
import { formatPostDate } from './home.utils';

describe('formatPostDate 유틸 함수 테스트', () => {
  it('시작일과 종료일이 모두 있는 경우 범위 형식으로 날짜 문자열을 반환한다.', () => {
    // Given
    const startDate = '2025-01-15';
    const endDate = '2025-01-20';
    const expected = '01. 15. ~ 01. 20.';

    // When
    const result = formatPostDate({ startDate, endDate });

    // Then
    expect(result).toBe(expected);
  });

  it('시작일만 있는 경우 시작일만 반환한다.', () => {
    // Given
    const startDate = '2025-01-15';
    const endDate = null;
    const expected = '01. 15.';

    // When
    const result = formatPostDate({ startDate, endDate });

    // Then
    expect(result).toBe(expected);
  });

  it('종료일만 있는 경우 종료일만 반환한다.', () => {
    // Given
    const startDate = null;
    const endDate = '2025-01-20';
    const expected = '01. 20.';

    // When
    const result = formatPostDate({ startDate, endDate });

    // Then
    expect(result).toBe(expected);
  });

  it('시작일과 종료일이 모두 없는 경우 "공고 참고" 문자열을 반환한다.', () => {
    // Given
    const startDate = null;
    const endDate = null;
    const expected = '공고 참고';

    // When
    const result = formatPostDate({ startDate, endDate });

    // Then
    expect(result).toBe(expected);
  });
});
