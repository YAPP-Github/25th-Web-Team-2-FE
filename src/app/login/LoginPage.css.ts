import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const loginLayout = style({
  backgroundColor: colors.field01,
  minWidth: '100rem',
  height: 'calc(100vh - 12.2rem)',
  margin: '0 auto',
});

export const loginPageLayout = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '6.5rem',
  paddingTop: '8.4rem',
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
});

export const loginCardContainer = style({
  display: 'flex',
  justifyContent: 'center',
  gap: '2rem',
  marginBottom: '2.8rem',
  minHeight: '37rem',
});
