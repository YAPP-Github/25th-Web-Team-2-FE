import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';

export const userLayoutContainer = style({
  backgroundColor: colors.field01,
  paddingBottom: '5.6rem',
  minHeight: 'calc(100vh - 12.2rem)',
});

export const userLayout = style({
  width: '100rem',
  margin: '0 auto',
  backgroundColor: colors.field01,
});
