import { describe, expect, it } from 'vitest';

import { getContactTargetFilterText } from '../utils/getContactTargetFilterText';

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

  it('성별이 전체인 경우 "전체" 텍스트를 반환한다.', () => {
    // Given
    const age = undefined;
    const gender = 'ALL';
    const expected = '전체';

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
