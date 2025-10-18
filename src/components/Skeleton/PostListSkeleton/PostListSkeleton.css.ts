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
      display: 'none',
    },
  },
});

// 개별 포스트 카드 스켈레톤 (실제 카드와 동일한 크기)
export const postCardSkeleton = style({
  position: 'relative',
  height: '20rem',
  padding: '1.6rem 2rem',
  borderRadius: '1.2rem',
  backgroundColor: colors.field01,

  // 내용 영역 스켈레톤 스타일
  background: `linear-gradient(90deg, ${colors.field03} 25%, ${colors.field02} 50%, ${colors.field03} 75%)`,
  backgroundSize: '400% 100%',
  animation: `${skeletonAnimation} 1.5s infinite`,
});
