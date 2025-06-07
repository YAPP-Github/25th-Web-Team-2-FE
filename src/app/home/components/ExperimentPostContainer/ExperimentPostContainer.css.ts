import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const postContainerLayout = style({
  marginTop: '2rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6rem',

  background: 'transparent',

  '@media': {
    'screen and (max-width: 767px)': {
      marginTop: '0',
      gap: '0',
    },
  },
});

export const postContainerTitleDesktop = style({
  ...fonts.title.medium.SB20,
  color: colors.text06,

  '@media': {
    'screen and (max-width: 767px)': {
      display: 'none',
    },
  },
});

export const horizontalLineMobile = style({
  display: 'none',

  '@media': {
    'screen and (max-width: 767px)': {
      display: 'block',
      width: '100%',
      height: '1.2rem',
      backgroundColor: colors.fieldBg,
    },
  },
});

export const filterWrapper = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  '@media': {
    'screen and (max-width: 767px)': {
      padding: '1.6rem',
      overflow: 'scroll',
    },
  },
});

export const recruitCheckLabel = style({
  ...fonts.label.large.SB14,
  color: colors.text06,
});

export const recruitCheckWrapper = recipe({
  variants: {
    isMobile: {
      true: {
        '@media': {
          'screen and (min-width: 768px)': {
            display: 'none',
          },
        },
      },
      false: {
        '@media': {
          'screen and (max-width: 767px)': {
            display: 'none',
          },
        },
      },
    },
  },
});
