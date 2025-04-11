import { createVar, style } from '@vanilla-extract/css';

import { areaOpacity } from '../../AreaFilter.css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const areaOpacity = createVar();

// 서브 지역 리스트 컨테이너
export const subAreaListContainer = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
  height: '28rem',
  overflow: 'scroll',
  padding: '1.2rem 0.8rem',
  borderRadius: '1.2rem',
});

// 서브 지역 항목 (label) 기본 스타일
export const subAreaItem = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '0.4rem',
  height: '100%',
  padding: '0.6rem 0.8rem',
  borderRadius: '1.2rem',
});

// 선택된 서브 지역 항목 스타일
export const selectedSubAreaLabel = style({
  outline: `0.1rem solid ${colors.lineTinted}`,
  backgroundColor: colors.primaryTinted,
});

// 체크박스 숨김 처리
export const checkbox = style({
  position: 'absolute',
  opacity: 0,
  pointerEvents: 'none',
});

// 서브 지역 정보 컨테이너 (opacity를 CSS 변수로 제어)
export const subAreaInfo = style({
  display: 'flex',
  gap: '0.4rem',
  alignItems: 'center',
  opacity: areaOpacity,
});

// placeholder (지역 미선택 시)
export const placeholderArea = style({
  ...fonts.label.large.R14,
  color: colors.text03,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
});
