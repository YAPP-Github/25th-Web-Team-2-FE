import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

// 지역 목록 컨테이너
export const regionContainer = style({
  flex: 0.5,
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
  padding: '1.2rem 0.8rem',
  backgroundColor: colors.field02,
  borderRadius: '1.2rem',
  height: '28rem',
  overflow: 'scroll',

  '@media': {
    'screen and (max-width: 767px)': {
      height: '40rem',
      gap: '0.8rem',
      padding: '0.8rem',
      maxWidth: '13.6rem',
    },
  },
});

export const selectedRegionName = style({
  color: colors.textPrimary,

  '@media': {
    'screen and (max-width: 767px)': {
      ...fonts.body.small.SB15,
    },
  },
});

export const areaButtonRecipe = recipe({
  base: {
    display: 'flex',
    gap: '0.4rem',
    alignItems: 'center',
    padding: '0.6rem 1.2rem',
    borderRadius: '1.2rem',

    '@media': {
      'screen and (max-width: 767px)': {
        padding: '0.8rem 1.2rem',
        height: '4rem',
      },
    },
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
