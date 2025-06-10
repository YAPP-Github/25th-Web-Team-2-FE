import { style } from '@vanilla-extract/css';

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
