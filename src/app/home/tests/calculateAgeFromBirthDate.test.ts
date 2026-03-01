import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { calculateAgeFromBirthDate } from '../utils/calculateAgeFromBirthDate';

describe('calculateAgeFromBirthDate - 만 나이 계산 유틸 함수', () => {
  beforeEach(() => {
    vi.setSystemTime(new Date('2025-01-15'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('생일이 지나지 않은 경우의 만 나이를 계산하여 반환한다.', () => {
    // Given
    const birthDate = '2000-01-16';
    const expected = 24;

    // When
    const result = calculateAgeFromBirthDate(birthDate);

    // Then
    expect(result).toBe(expected);
  });

  it('생일이 지난 경우의 만 나이를 계산하여 반환한다.', () => {
    // Given
    const birthDate = '2000-01-14';
    const expected = 25;

    // When
    const result = calculateAgeFromBirthDate(birthDate);

    // Then
    expect(result).toBe(expected);
  });
});
