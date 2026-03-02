import { describe, expect, it } from 'vitest';

import { AreaType } from '@/types/filter';

import { getRegionFilterText } from '../utils/getRegionFilterText';


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
    const areas: AreaType[] = ['GANGNAMGU'];
    const expected = '서울 · 강남구';
    // When
    const result = getRegionFilterText(region, areas);

    // Then
    expect(result).toBe(expected);
  });

  it('지역과 세부 지역 2개 이상 있는 경우, 지역과 첫 번째 세부 지역과 나머지 개수를 반환한다.', () => {
    // Given
    const region = 'SEOUL';
    const areas: AreaType[] = ['GANGNAMGU', 'GANGDONGGU', 'MAPOGU'];
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
    const areas: AreaType[] = ['GANGNAMGU'];
    const expected = '지역';

    // When
    const result = getRegionFilterText(region, areas);

    // Then
    expect(result).toBe(expected);
  });
});
