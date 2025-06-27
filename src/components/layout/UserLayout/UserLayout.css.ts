import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';

export const userLayoutContainer = style({
  backgroundColor: colors.field01,
  maxWidth: '100rem',
  width: '100%',

  margin: '0 auto',
  minHeight: '100vh',

  '@media': {
    'screen and (max-width: 1023px)': {
      padding: '0 2rem',
    },
    'screen and (max-width: 767px)': {
      padding: '0',
    },
  },
});

export const userLayout = style({
  margin: '0 auto',
  backgroundColor: colors.field01,
});
