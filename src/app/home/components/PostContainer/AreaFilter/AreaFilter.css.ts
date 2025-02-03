import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

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

// 지역 목록 컨테이너
export const areaListContainer = style({
  flex: '0.5',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
  padding: '1.2rem 0.8rem',
  backgroundColor: colors.field02,
  borderRadius: '1.2rem',
  height: '28rem',
  overflow: 'scroll',
});

// 기본 텍스트 스타일
export const areaName = style({
  ...fonts.label.large.M14,
  color: colors.text06,
});

// 선택된 지역 텍스트 스타일
export const selectedAreaName = style({
  color: colors.textPrimary,
});

// 숫자 표시 스타일
export const areaCount = style({
  ...fonts.label.medium.R13,
  color: colors.text03,
});

// 지역 버튼을 recipe로 정의 (selected 여부에 따라 스타일이 변경됨)
export const areaButtonRecipe = recipe({
  base: {
    display: 'flex',
    gap: '0.4rem',
    alignItems: 'center',
    padding: '0.6rem 1.2rem',
    borderRadius: '1.2rem',
  },
  variants: {
    selected: {
      true: {
        backgroundColor: colors.primaryTinted,
        outline: `0.1rem solid ${colors.lineTinted}`,
        fontWeight: 'bold',
      },
      false: {
        selectors: {
          '&:hover': {
            backgroundColor: colors.field03,
          },
        },
      },
    },
  },
  defaultVariants: {
    selected: false,
  },
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

// 서브 지역 정보 컨테이너
export const subAreaInfo = style({
  display: 'flex',
  gap: '0.4rem',
  alignItems: 'center',
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

// Footer 영역들
export const footerContainer = style({
  display: 'flex',
  justifyContent: 'flex-end',
});

export const footerButtonContainer = style({
  display: 'flex',
  gap: '0.8rem',
  alignItems: 'center',
});

// 버튼 스타일을 recipe로 재사용 (중복되는 padding, borderRadius 등)
export const buttonRecipe = recipe({
  base: {
    ...fonts.label.large.SB14,
    padding: '0.6rem 1.4rem',
    border: 'none',
    borderRadius: '1.2rem',
  },
  variants: {
    type: {
      reset: {
        backgroundColor: colors.field03,
        color: colors.text06,
      },
      save: {
        backgroundColor: colors.primaryMint,
        color: colors.text01,
      },
    },
  },
});
