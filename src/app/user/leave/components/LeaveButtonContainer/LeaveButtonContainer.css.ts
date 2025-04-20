import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const buttonContainer = style({
  display: 'flex',
  gap: '1.2rem',
  margin: '0 auto',
});

export const button = style({
  ...fonts.body.normal.B16,
  color: colors.text06,
  backgroundColor: colors.field04,
  borderRadius: '1.2rem',
  padding: '0.8rem 1.6rem',

  selectors: {
    '&:disabled': {
      color: colors.text02,
      cursor: 'not-allowed',
    },
  },
});

export const leaveButton = style({
  ...fonts.body.normal.B16,
  color: colors.text01,
  backgroundColor: colors.field09,
  borderRadius: '1.2rem',
  padding: '0.8rem 1.6rem',

  selectors: {
    '&:disabled': {
      backgroundColor: colors.field04,
      color: colors.text02,
      cursor: 'not-allowed',
    },
  },
});
