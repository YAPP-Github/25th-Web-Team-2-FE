import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';

export const defaultLayoutContainer = style({
  position: 'relative',
  paddingBottom: '5.6rem',
  minHeight: 'calc(100vh - 12.2rem)',
  background: `linear-gradient(to bottom, ${colors.field01} 0%, ${colors.field01} 6%, ${colors.field02} 12%, ${colors.field02} 100%)`,

  '@media': {
    'screen and (max-width: 767px)': {
      minHeight: '100dvh',
      paddingBottom: '0',
    },
  },
});

export const defaultLayout = style({
  width: '100rem',
  margin: '0 auto',

  '@media': {
    'screen and (max-width: 767px)': {
      width: 'auto',
      maxWidth: '100rem',
      backgroundColor: colors.field01,
    },
  },
});
