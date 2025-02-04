import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const nextButton = style({
  ...fonts.body.normal.SB16,
  backgroundColor: colors.primaryMint,
  color: colors.text01,
  borderRadius: '1.2rem',
  padding: '1.2rem 0',
  width: '20rem',
  alignItems: 'center',
  marginBottom: '5.6rem',
  selectors: {
    '&:disabled': {
      color: colors.text02,
      backgroundColor: colors.field04,
    },
  },
});
