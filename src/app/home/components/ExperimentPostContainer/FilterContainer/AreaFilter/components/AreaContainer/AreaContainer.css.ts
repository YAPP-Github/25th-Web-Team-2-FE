import { createVar, style } from '@vanilla-extract/css';

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

  '@media': {
    'screen and (max-width: 767px)': {
      height: '40rem',
      gap: '0.8rem',
      padding: '0.8rem',
    },
  },
});

export const subAreaItem = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '0.4rem',
  padding: '0.6rem 0.8rem',
  borderRadius: '1.2rem',

  '@media': {
    'screen and (max-width: 767px)': {
      padding: '0.8rem 1.2rem',
      height: '4rem',
    },
  },
});

export const selectedSubAreaLabel = style({
  outline: `0.1rem solid ${colors.lineTinted}`,
  backgroundColor: colors.primaryTinted,
});

export const checkbox = style({
  position: 'absolute',
  opacity: 0,
  pointerEvents: 'none',
});

export const subAreaInfo = style({
  display: 'flex',
  gap: '0.4rem',
  alignItems: 'center',
  opacity: areaOpacity,
});

export const selectedRegionName = style({
  color: colors.textPrimary,

  '@media': {
    'screen and (max-width: 767px)': {
      ...fonts.body.small.SB15,
    },
  },
});

export const placeholderArea = style({
  ...fonts.label.large.R14,
  color: colors.text03,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
});
