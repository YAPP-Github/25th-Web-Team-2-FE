import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';

export const defaultLayoutContainer = style({
  backgroundColor: colors.field02,
  paddingBottom: '5.6rem',
});

export const defaultLayout = style({
  width: '100rem',
  margin: '0 auto',
  backgroundColor: colors.field02,
});
