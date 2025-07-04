import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';

export const myPostsLayoutContainer = style({
  width: '100%',
  minHeight: '100vh',
  backgroundColor: colors.field01,
  padding: '0 2rem',

  paddingBottom: '17.8rem', // 12.2 + 5.6

  '@media': {
    'screen and (max-width: 1023px)': {
      width: 'max-content',
    },

    'screen and (max-width: 767px)': {
      width: '100%',
      paddingBottom: '5.6rem',
    },
  },
  position: 'relative',
  overflowX: 'auto',
});

export const myPostsLayout = style({
  width: '100rem',
  margin: '0 auto',
});
