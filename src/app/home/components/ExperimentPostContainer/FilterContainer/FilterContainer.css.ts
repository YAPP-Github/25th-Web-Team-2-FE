import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';

export const filterContainerLayout = style({
  display: 'flex',
  gap: '0.8rem',
  height: '3.2rem',
});

export const resetFilterButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: colors.field01,
  padding: '0.8rem',
  borderRadius: '1.2rem',

  '@media': {
    'screen and (max-width: 767px)': {
      backgroundColor: colors.field03,
    },
  },
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
