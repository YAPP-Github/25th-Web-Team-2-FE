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

export const skeletonContainer = style({
  display: 'flex',
  gap: '0.8rem',
  height: '3.2rem',
  alignItems: 'center',
});

export const skeletonButton = style({
  height: '3.2rem',
  borderRadius: '1.2rem',

  backgroundColor: colors.field03,
  background: `linear-gradient(90deg, ${colors.field03} 25%, ${colors.field02} 50%, ${colors.field03} 75%)`,
  backgroundSize: '400% 100%',
  animation: `${skeletonAnimation} 1.5s infinite`,
});

export const matchTypeButtonSkeleton = style([
  skeletonButton,
  {
    width: '10rem',
  },
]);

export const contactTargetButtonSkeleton = style([
  skeletonButton,
  {
    width: '10rem',
  },
]);

export const areaButtonSkeleton = style([
  skeletonButton,
  {
    width: '7rem',
  },
]);
