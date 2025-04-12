import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

// Footer 영역들
export const footerContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
});

export const footerButtonContainer = style({
  display: 'flex',
  gap: '0.8rem',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
});

export const infoTextContainer = style({
  display: 'flex',
  gap: '0.4rem',
  alignItems: 'center',
});

export const infoText = style({
  ...fonts.label.medium.R13,
  color: colors.text03,
});

export const buttonContainer = style({
  display: 'flex',
  gap: '0.8rem',
  alignItems: 'center',
});

// 버튼 스타일을 recipe로 재사용
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
        selectors: {
          '&:disabled': {
            opacity: 0.6,
            cursor: 'not-allowed',
          },
        },
      },
    },
  },
});
