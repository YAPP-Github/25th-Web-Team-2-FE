import { keyframes, style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';

export const experimentPostMobileContainerLayout = style({
  minHeight: 'calc(100dvh - 5.4rem)',
  backgroundColor: colors.field01,

  padding: '0 1.6rem 5.6rem 1.6rem',
});

export const fixedBottomButtonLayout = style({
  position: 'fixed',
  bottom: '1.6rem',
  left: '1.6rem',
  right: '1.6rem',
});

const fadeIn = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translateY(0.2rem)',
  },
  '20%': {
    opacity: 0.6,
  },
  '100%': {
    opacity: 1,
    transform: 'translateY(0)',
  },
});

export const fadeInWithDelay = style({
  animation: `${fadeIn} 0.2s ease-in`,
  animationDelay: '0.25s',
  animationFillMode: 'both',
});

export const buttonGradientBackground = style({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  height: '8.8rem',
  background: `linear-gradient(
    to bottom,
  rgba(250, 250, 250, 0) 0%,
  rgba(250, 250, 250, 0.85) 100%
  )`,
});
