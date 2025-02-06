import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';

export const myPostsLayoutContainer = style({
  height: '100vh',
  backgroundColor: colors.field01,
  paddingBottom: '5.6rem',
});

export const myPostsLayout = style({
  width: '100rem',
  margin: '0 auto',
});
