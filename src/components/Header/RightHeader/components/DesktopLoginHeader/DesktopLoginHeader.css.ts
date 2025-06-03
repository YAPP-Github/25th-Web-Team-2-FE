import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const desktopRightHeader = style({
  '@media': {
    'screen and (max-width: 767px)': {
      display: 'none',
    },
  },
});

export const uploadButton = style({
  ...fonts.label.large.SB14,
  backgroundColor: colors.primaryTinted,
  color: colors.primaryMint,
  padding: '0.6rem 1.4rem',
  borderRadius: '1.2rem',
});
