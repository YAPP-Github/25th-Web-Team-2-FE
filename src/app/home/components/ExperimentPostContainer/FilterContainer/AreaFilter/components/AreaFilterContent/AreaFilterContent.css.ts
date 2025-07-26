import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';

export const contentWrapper = style({
  backgroundColor: colors.field02,
  borderRadius: '1.2rem',
  display: 'flex',
});

export const verticalLine = style({
  position: 'relative',
  selectors: {
    '&::after': {
      content: '""',
      width: '0.1rem',
      height: '100%',
      position: 'absolute',
      top: '50%',
      right: '0',
      transform: 'translateY(-50%)',
      backgroundColor: colors.line01,
    },
    '&:last-child::after': {
      display: 'none',
    },
  },

  '@media': {
    'screen and (max-width: 767px)': {
      selectors: {
        '&::after': {
          height: '2rem',
        },
      },
    },
  },
});
