import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const extractKeywordButtonWrapper = style({
  ...fonts.label.large.SB14,
  color: colors.field01,
  width: '18rem',
  padding: '0.6rem 1.2rem',
  borderRadius: '1.2rem',
  background: 'linear-gradient(to right, #3EBBC4, #D768E2)',

  selectors: {
    '&:disabled': {
      color: colors.text01,
      background: colors.field06,
      cursor: 'not-allowed',
    },
  },
});

export const extractKeywordButtonInner = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.4rem',
});
