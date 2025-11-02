import { style } from '@vanilla-extract/css';

export const uploadFunnelLayout = style({
  '@media': {
    'screen and (max-width: 1023px)': {
      padding: '0 2rem',
    },

    'screen and (max-width: 767px)': {
      width: '100%',
      padding: '0',
    },
  },
});
