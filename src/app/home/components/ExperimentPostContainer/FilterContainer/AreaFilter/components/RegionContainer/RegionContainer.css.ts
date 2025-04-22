import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { colors } from '@/styles/colors';

// 지역 목록 컨테이너
export const regionContainer = style({
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

export const selectedRegionName = style({
  color: colors.textPrimary,
});

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
