import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const leaveSuccessPageLayout = style({
  display: 'flex',
  width: '56rem',
  margin: '0 auto',
  minHeight: 'calc(100dvh - 12.2rem)',

  '@media': {
    'screen and (max-width: 767px)': {
      minHeight: '100dvh',
      width: '100%',
    },
  },
});

export const leaveSuccessLayout = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  flexGrow: 1,
  gap: '4.8rem',
});

export const leaveTitleContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '4.8rem',
  textAlign: 'center',
});

export const title = style({
  ...fonts.title.large.SB28,
  color: colors.text06,
});

export const subTitle = style({
  ...fonts.body.normal.M16,
  color: colors.text04,
});

export const image = style({
  margin: '3.2rem 0',
});

export const homeLink = style({
  ...fonts.body.normal.SB16,
  backgroundColor: colors.primaryMint,
  color: colors.text01,
  borderRadius: '1.2rem',
  padding: '1.2rem 3.35rem',
  marginTop: '2.6rem',
});
