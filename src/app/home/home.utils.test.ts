import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  calculateAgeFromBirthDate,
  formatPostDate,
  getContactTargetFilterText,
  getRegionFilterText,
} from './home.utils';

describe('formatPostDate - 실험공고 날짜 형식 맞추는 유틸 함수', () => {
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

describe('getContactTargetFilterText - 모집 대상 filter 텍스트 유틸 함수', () => {
  it('나이와 성별이 모두 있는 경우 모두 반환한다.', () => {
    // Given
    const age = 25;
    const gender = 'MALE';
    const expected = '남성 · 만 25세';

    // When
    const result = getContactTargetFilterText(age, gender);

    // Then
    expect(result).toBe(expected);
  });

  it('나이와 성별이 모두 있지만 성별을 선택하지 않은 경우(ALL) 나이만 반환한다.', () => {
    // Given
    const age = 25;
    const gender = 'ALL';
    const expected = '만 25세';

    // When
    const result = getContactTargetFilterText(age, gender);

    // Then
    expect(result).toBe(expected);
  });

  it('성별만 있는 경우 성별만 반환한다.', () => {
    // Given
    const age = undefined;
    const gender = 'FEMALE';
    const expected = '여성';

    // When
    const result = getContactTargetFilterText(age, gender);

    // Then
    expect(result).toBe(expected);
  });

  it('나이만 있는 경우 나이만 반환한다.', () => {
    // Given
    const age = 25;
    const gender = undefined;
    const expected = '만 25세';

    // When
    const result = getContactTargetFilterText(age, gender);

    // Then
    expect(result).toBe(expected);
  });

  it('나이와 성별이 모두 없는 경우 "모집 대상" 문자열을 반환한다.', () => {
    // Given
    const age = undefined;
    const gender = undefined;
    const expected = '모집 대상';
    // When
    const result = getContactTargetFilterText(age, gender);

    // Then
    expect(result).toBe(expected);
  });
});

describe('getRegionFilterText - 지역 filter 텍스트 유틸 함수', () => {
  it('지역만 있고 세부 지역이 없는 경우 지역명만 반환한다.', () => {
    // Given
    const region = 'SEOUL';
    const areas = undefined;
    const expected = '서울';

    // When
    const result = getRegionFilterText(region, areas);

    // Then
    expect(result).toBe(expected);
  });

  it('지역과 세부 지역 1개 있는 경우, 지역과 세부 지역을 함께 반환한다.', () => {
    // Given
    const region = 'SEOUL';
    const areas = ['GANGNAMGU'];
    const expected = '서울 · 강남구';
    // When
    const result = getRegionFilterText(region, areas);

    // Then
    expect(result).toBe(expected);
  });

  it('지역과 세부 지역 2개 이상 있는 경우, 지역과 첫 번째 세부 지역과 나머지 개수를 반환한다.', () => {
    // Given
    const region = 'SEOUL';
    const areas = ['GANGNAMGU', 'GANGDONGGU', 'MAPOGU'];
    const expected = '서울 · 강남구 외 2';
    // When
    const result = getRegionFilterText(region, areas);

    // Then
    expect(result).toBe(expected);
  });

  it('지역만 설정한 경우 지역명만 반환한다.', () => {
    // Given
    const region = 'BUSAN';
    const areas = undefined;
    const expected = '부산';
    // When
    const result = getRegionFilterText(region, areas);

    // Then
    expect(result).toBe(expected);
  });

  it('지역이 없는 경우, 기본 메시지 "지역"을 반환한다.', () => {
    // Given
    const region = undefined;
    const areas = ['GANGNAMGU'];
    const expected = '지역';

    // When
    const result = getRegionFilterText(region, areas);

    // Then
    expect(result).toBe(expected);
  });
});
