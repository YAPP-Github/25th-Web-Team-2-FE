import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const baseButton = style({
  width: '100%',
  borderRadius: '1.2rem',
  padding: '1.2rem 0',

  selectors: {
    '&:disabled': {
      cursor: 'not-allowed',
    },
  },
});

export const buttonRecipe = recipe({
  base: baseButton,

  variants: {
    variant: {
      primary: {
        backgroundColor: colors.primaryMint,
        color: colors.text01,
        selectors: {
          '&:disabled': {
            color: colors.text02,
            backgroundColor: colors.field04,
          },
        },
      },
      secondary: {
        backgroundColor: colors.field03,
        color: colors.text06,
      },
    },
    size: {
      small: {
        ...fonts.body.small.SB15,
      },
      medium: {
        ...fonts.body.normal.SB16,
      },
    },
  },
});
