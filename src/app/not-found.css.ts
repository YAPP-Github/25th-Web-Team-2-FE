import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const notFoundLayout = style({
  width: '100%',
  height: 'calc(100vh - 25.2rem)',

  display: 'flex',
  flexFlow: 'column nowrap',
  justifyContent: 'center',
  alignItems: 'center',

  '@media': {
    'screen and (max-width: 767px)': {
      height: '100dvh',
    },
  },
});

export const h2 = style({
  fontSize: '3.2rem',
  fontStyle: 'normal',
  fontWeight: '600',
  lineHeight: '1.4rem',
  letterSpacing: '0',

  marginTop: '4rem',
  height: '3.8rem',
});

export const notFoundContent = style({
  ...fonts.body.normal.M16,
  color: colors.text03,
  marginTop: '0.8rem',
});

export const goToHomeButton = style({
  ...fonts.body.normal.SB16,
  color: colors.text01,

  marginTop: '6rem',
  backgroundColor: colors.primaryMint,
  width: '20rem',
  height: '4.8rem',
  borderRadius: '1.2rem',

  cursor: 'pointer',
});
