import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const progressBarContainer = style({
  width: '100rem',
  margin: '0 auto',
  padding: '2.7rem 8rem',
});

export const progressBarInner = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '1.8rem',
});

export const stepContainer = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
  },
  variants: {
    isLast: {
      true: {
        alignItems: 'center',
      },
      false: {
        flex: 1,
      },
    },
  },
});

export const stepIconAndLine = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1.2rem',
});

export const stepIcon = style({
  width: '3.2rem',
  height: '3.2rem',
  borderRadius: '0.8rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  transition: 'all 0.3s ease',
});

export const stepIconActive = style([
  stepIcon,
  {
    backgroundColor: colors.primaryMint,
  },
]);

export const stepIconInactive = style([
  stepIcon,
  {
    backgroundColor: colors.field06,
  },
]);

export const stepIconText = style({
  color: colors.text01,
  ...fonts.title.small.SB18,
});

export const progressLineContainer = style({
  height: '0.3rem',
  backgroundColor: colors.field04,
  borderRadius: '0.6rem',
  overflow: 'hidden',
  flex: 1, // 남은 공간을 동일하게 분배
  minWidth: '4rem',
});

export const progressLineFill = style({
  height: '100%',
  backgroundColor: colors.primaryMint,
  borderRadius: '0.6rem',
  transition: 'width 0.5s linear',
});

export const stepLabel = recipe({
  base: {
    ...fonts.body.small.SB15,
  },
  variants: {
    isProgressed: {
      true: {
        color: colors.textPrimary,
      },
      false: {
        color: colors.text02,
      },
    },
  },
});
