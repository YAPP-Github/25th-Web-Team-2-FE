import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const loginLayout = style({
  position: 'relative',
  paddingTop: '8.4rem',
  paddingBottom: '20.6rem', // 12.2 + 8.4rem
  backgroundColor: colors.field01,

  minHeight: '100vh',

  '@media': {
    'screen and (max-width: 767px)': {
      paddingBottom: '8.4rem',
    },
  },
});

export const contentLayout = style({
  maxWidth: '56rem',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const loginPageLayout = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '6.5rem',
});

export const descriptionWrapper = style({
  ...fonts.title.medium.SB20,
  color: colors.text06,
});

export const sloganContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem',
});

export const sloganWrapper = style({
  ...fonts.title.medium.SB20,
  color: colors.text06,
  textAlign: 'center',
  whiteSpace: 'pre-wrap',
});

export const loginCardContainer = style({
  display: 'flex',
  justifyContent: 'center',
  gap: '2rem',
  minHeight: '37rem',
});

export const mobileLoginLayout = style({
  height: '100dvh',
  padding: '0 1.6rem',

  backgroundColor: colors.field01,
});

export const loginRedirectLayout = style({
  height: '100dvh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.4rem',

  color: colors.text06,
  fontSize: '1.6rem',
});
