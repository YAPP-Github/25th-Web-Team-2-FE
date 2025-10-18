import { style, keyframes } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';

// FilterSkeleton과 동일한 애니메이션 사용
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

// 포스트 리스트 컨테이너 (실제 grid와 동일)
export const postListSkeletonContainer = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  gap: '1.6rem 1.2rem',

  '@media': {
    'screen and (max-width: 767px)': {
      gridTemplateColumns: '1fr',
      gap: '1.2rem',
    },
  },
});

const baseSkeleton = style({
  background: `linear-gradient(90deg, ${colors.field03} 25%, ${colors.field02} 50%, ${colors.field03} 75%)`,
  backgroundSize: '400% 100%',
  animation: `${skeletonAnimation} 1.5s infinite`,
});

// 개별 포스트 카드 스켈레톤 (실제 카드와 동일한 크기)
export const postCardSkeleton = style([
  baseSkeleton,
  {
    height: '18.7rem',
    padding: '1.6rem 2rem',
    borderRadius: '1.2rem',

    '@media': {
      'screen and (max-width: 767px)': {
        background: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '1.2rem',
      },
    },
  },
]);

export const postCardSkeletonHeader = style([
  baseSkeleton,
  {
    display: 'none',

    '@media': {
      'screen and (max-width: 767px)': {
        display: 'block',
        height: '7.4rem',
        borderRadius: '1.2rem',
      },
    },
  },
]);

export const postCardSkeletonFooter = style({
  display: 'none',

  '@media': {
    'screen and (max-width: 767px)': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      gap: '1.2rem',
    },
  },
});

export const postCardSkeletonInfo = style([
  baseSkeleton,
  {
    display: 'none',

    '@media': {
      'screen and (max-width: 767px)': {
        display: 'block',
        width: '15rem',
        height: '4.7rem',
        borderRadius: '1.2rem',
      },
    },
  },
]);

export const postCardSkeletonViews = style([
  baseSkeleton,
  {
    display: 'none',

    '@media': {
      'screen and (max-width: 767px)': {
        display: 'block',
        width: '10rem',
        height: '4.7rem',
        borderRadius: '1.2rem',
      },
    },
  },
]);
