import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';

export const experimentPostMobileContainerLayout = style({
  minHeight: 'calc(100dvh - 5.4rem)',
  backgroundColor: colors.field01,

  padding: '0 1.6rem',
});
