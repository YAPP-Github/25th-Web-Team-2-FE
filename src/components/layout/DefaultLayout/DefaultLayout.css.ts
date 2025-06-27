import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';

export const defaultLayoutContainer = style({
  position: 'relative',
  paddingBottom: '5.6rem',
  minHeight: '100vh',
  background: `linear-gradient(to bottom, ${colors.field01} 0%, ${colors.field01} 6%, ${colors.field02} 12%, ${colors.field02} 100%)`,

  '@media': {
    'screen and (max-width: 1023px)': {
      width: 'max-content',
    },

    'screen and (max-width: 767px)': {
      width: 'auto',
      minHeight: '100dvh',
      paddingBottom: '0',
      background: colors.field01,
    },
  },
});

export const defaultLayout = style({
  width: '100rem',
  margin: '0 auto',

  '@media': {
    'screen and (max-width: 1023px)': {
      padding: '0 2rem',
    },

    'screen and (max-width: 767px)': {
      width: '100%',
      padding: '0',
    },
  },
});
