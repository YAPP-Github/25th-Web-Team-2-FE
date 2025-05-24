import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const agreeButton = style({
  ...fonts.body.normal.SB16,
  width: '100%',
  height: 56,
  backgroundColor: colors.primaryMint,
  borderRadius: 12,
  color: colors.text01,

  selectors: {
    '&:disabled': {
      backgroundColor: colors.primaryMint,
      opacity: 0.6,
      cursor: 'not-allowed',
    },
  },
});
