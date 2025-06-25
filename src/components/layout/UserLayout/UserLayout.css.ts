import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';

export const userLayoutContainer = style({
  backgroundColor: colors.field01,
  maxWidth: '100rem',
  width: '100%',

  margin: '0 auto',
  minHeight: 'calc(100vh - 12.2rem)',
});

export const userLayout = style({
  margin: '0 auto',
  backgroundColor: colors.field01,
});
