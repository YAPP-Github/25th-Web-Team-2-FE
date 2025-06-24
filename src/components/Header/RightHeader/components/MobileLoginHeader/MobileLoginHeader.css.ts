import { style } from '@vanilla-extract/css';

export const mobileRightHeader = style({
  display: 'none',

  '@media': {
    'screen and (max-width: 767px)': {
      display: 'flex',
      alignItems: 'center',
      gap: '2rem',
    },
  },
});
