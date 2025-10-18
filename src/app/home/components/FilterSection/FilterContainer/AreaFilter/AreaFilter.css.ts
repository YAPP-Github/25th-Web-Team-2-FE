import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

// Popover Trigger (동적 색상은 CSS 변수로 처리)
export const triggerWrapper = style({
  ...fonts.label.large.SB14,
  color: 'var(--trigger-color)',
  backgroundColor: 'var(--trigger-bg)',
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
  padding: '0.6rem 1rem 0.6rem 1.4rem',
  borderRadius: '1.2rem',
  whiteSpace: 'nowrap',
  selectors: {
    '&:hover': {
      boxShadow: '0px 4px 16px rgba(53, 59, 61, 0.2)',
    },
  },

  '@media': {
    'screen and (max-width: 767px)': {
      color: 'var(--trigger-color-mobile)',
      backgroundColor: 'var(--trigger-bg-mobile)',
      padding: '0.8rem 1rem 0.8rem 1.4rem',
    },
  },
});

export const regionContentContainer = style({
  width: '36.4rem',
  position: 'relative',
  top: '0.8rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.2rem',
  padding: '1.2rem',
  borderRadius: '1.2rem',

  backgroundColor: colors.field01,
  boxShadow: '0px 4px 16px rgba(53, 59, 61, 0.2)',
});

export const areaName = style({
  ...fonts.label.large.M14,
  color: colors.text06,

  '@media': {
    'screen and (max-width: 767px)': {
      ...fonts.body.small.M15,
    },
  },
});

// 숫자 표시 스타일
export const areaCount = style({
  ...fonts.label.medium.R13,
  color: colors.text03,
});
