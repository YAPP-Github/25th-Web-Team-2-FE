import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';

export const myPostsLayoutContainer = style({
  width: 'fit-content',
  margin: '0 auto',
  backgroundColor: colors.field01,
  paddingBottom: '2.6rem',
});

export const myPostsLayout = style({
  width: '100rem',
});
