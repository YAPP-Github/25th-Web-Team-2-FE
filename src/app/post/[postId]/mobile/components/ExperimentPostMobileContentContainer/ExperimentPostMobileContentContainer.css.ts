import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const experimentPostMobileContentContainerLayout = style({
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

export const emptyView = style({
  display: 'flex',
  flexFlow: 'column nowrap',
  gap: '2rem',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100dvh',
  width: '100%',
});

export const emptyViewTitle = style({
  ...fonts.body.normal.M16,
});

export const contactButton = style({
  ...fonts.label.medium.M13,
  backgroundColor: colors.field04,
  color: colors.text06,
  padding: '0.6rem 1.4rem',
  borderRadius: '1.2rem',

  selectors: {
    '&:hover': {
      backgroundColor: colors.field05,
    },
  },
});
