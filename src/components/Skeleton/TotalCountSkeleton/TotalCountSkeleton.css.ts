import { style, keyframes } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';

const skeletonAnimation = keyframes({
  '0%': {
    backgroundPosition: '0% 50%',
  },
  '50%': {
    backgroundPosition: '100% 50%',
  },
  '100%': {
    backgroundPosition: '0% 50%',
  },
});

export const skeletonTotalCount = style({
  height: '2.2rem',
  borderRadius: '1.2rem',
  width: '5rem',

  backgroundColor: colors.field03,
  background: `linear-gradient(90deg, ${colors.field03} 25%, ${colors.field02} 50%, ${colors.field03} 75%)`,
  backgroundSize: '400% 100%',
  animation: `${skeletonAnimation} 1.5s infinite`,
});
