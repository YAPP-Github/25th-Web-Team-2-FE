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
  padding: '0.5rem 1.4rem',
  borderRadius: '1.2rem',
  selectors: {
    '&:hover': {
      boxShadow: '0px 4px 16px rgba(53, 59, 61, 0.2)',
    },
  },
});

// Popover Content 영역
export const regionContentContainer = style({
  backgroundColor: colors.field01,
  position: 'relative',
  top: '0.8rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.2rem',
  width: '36.4rem',
  height: '35rem',
  padding: '1.2rem',
  borderRadius: '1.2rem',
  boxShadow: '0px 4px 16px rgba(53, 59, 61, 0.2)',
});

// 내부 레이아웃
export const contentWrapper = style({
  backgroundColor: colors.field02,
  borderRadius: '1.2rem',
  display: 'flex',
});

// 기본 텍스트 스타일
export const areaName = style({
  ...fonts.label.large.M14,
  color: colors.text06,
});

// 숫자 표시 스타일
export const areaCount = style({
  ...fonts.label.medium.R13,
  color: colors.text03,
});

// 세로 구분선
export const verticalLine = style({
  position: 'relative',
  selectors: {
    '&::after': {
      content: '""',
      width: '0.1rem',
      height: '100%',
      position: 'absolute',
      top: '50%',
      right: '0',
      transform: 'translateY(-50%)',
      backgroundColor: colors.line01,
    },
    '&:last-child::after': {
      display: 'none',
    },
  },
});
