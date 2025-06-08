import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const univInputWrapper = style({
  position: 'relative',
  borderRadius: '1rem',
});

export const required = style({
  color: colors.textAlert,
});

export const univAuthButton = style({
  ...fonts.label.large.SB14,
  position: 'absolute',
  right: '1.2rem',
  top: '1rem',
  padding: '0.7rem 1.6rem',
  borderRadius: '1rem',
  color: colors.text01,
  backgroundColor: colors.primaryMint,
  border: 'none',
  selectors: {
    '&:disabled': {
      color: colors.text02,
      backgroundColor: colors.field04,
    },
  },
});

export const editButton = style({
  color: colors.text06,
  backgroundColor: colors.field01,
  border: `0.1rem solid ${colors.line02}`,
});

export const errorMessage = style({
  ...fonts.label.large.R14,
  color: colors.textAlert,
  height: '2.2rem',
});
