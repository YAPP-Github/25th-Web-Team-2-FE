import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const headerLayout = style({
  backgroundColor: 'transparent',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '2rem 0',

  '@media': {
    'screen and (max-width: 767px)': {
      height: '5.4rem',
      padding: '1rem 1.6rem',
    },
  },
});

export const image = style({
  height: 'auto',
});

export const imageWrapperRecipe = recipe({
  base: {},
  variants: {
    isPostDetailPage: {
      true: {
        '@media': {
          'screen and (max-width: 767px)': {
            display: 'none',
          },
        },
      },
      false: {},
    },
  },
  defaultVariants: {
    isPostDetailPage: false,
  },
});

export const backButtonRecipe = recipe({
  base: {
    display: 'none',
  },
  variants: {
    isPostDetailPage: {
      true: {
        '@media': {
          'screen and (max-width: 767px)': {
            display: 'block',
          },
        },
      },
      false: {},
    },
  },
  defaultVariants: {
    isPostDetailPage: false,
  },
});

export const buttonContainer = style({
  height: '100%',
});

export const contactButton = style({
  ...fonts.label.large.SB14,
  backgroundColor: colors.field04,
  color: colors.text06,
  padding: '0.6rem 1.4rem',
  borderRadius: '1.2rem',

  selectors: {
    '&:hover': {
      backgroundColor: colors.field05,
    },
  },
});

export const loginButton = style({
  display: 'inline-block',
  ...fonts.label.large.SB14,
  backgroundColor: colors.primaryMint,
  color: colors.text01,
  padding: '0.6rem 1.4rem',
  borderRadius: '1.2rem',
});
