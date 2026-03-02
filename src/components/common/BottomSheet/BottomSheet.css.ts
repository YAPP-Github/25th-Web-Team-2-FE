import { createVar, keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

const slideUp = keyframes({
  from: {
    transform: 'translateY(100%)',
  },
  to: {
    transform: 'translateY(0)',
  },
});

const slideDown = keyframes({
  from: {
    transform: 'translateY(0)',
  },
  to: {
    transform: 'translateY(100%)',
  },
});

export const delayVar = createVar();

export const sheetContainer = style({
  position: 'fixed',
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
});

// 배경 오버레이
export const backdrop = recipe({
  base: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  variants: {
    isOpen: {
      true: {
        backgroundColor: colors.fieldDim,
      },
      false: {
        backgroundColor: 'transparent',
      },
    },
  },
  defaultVariants: {
    isOpen: false,
  },
});

export const sheet = recipe({
  base: {
    position: 'fixed',
    left: 16,
    bottom: 16,
    right: 16,
    borderRadius: 16,
    backgroundColor: colors.field01,

    vars: {
      [delayVar]: '0.3s',
    },
  },
  variants: {
    isOpen: {
      true: {
        animation: `${slideUp} ${delayVar} ease-out forwards`,
      },
      false: {
        animation: `${slideDown} ${delayVar} ease-out forwards`,
      },
    },
  },
  defaultVariants: {
    isOpen: false,
  },
});

export const headerContainer = recipe({
  base: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  variants: {
    isDraggable: {
      true: {
        height: '2.8rem',
      },
    },
  },
});

export const headerContent = style({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '1.6rem 2rem 0.8rem 2rem',
});

export const headerTitle = style({
  ...fonts.title.small.SB18,
});

export const dragHandle = style({
  width: '3.6rem',
  height: '0.4rem',
  backgroundColor: colors.field08,
  borderRadius: 12,
});

export const contentContainer = style({
  padding: '8px 16px 16px 16px',
});
