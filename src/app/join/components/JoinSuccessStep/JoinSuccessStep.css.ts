import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const joinSuccessLayout = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '9rem',
  paddingTop: '3.6rem',
});

export const joinTitleContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '6.4rem',
  textAlign: 'center',
});

export const title = style({
  ...fonts.title.large.SB28,
  color: colors.text06,
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
