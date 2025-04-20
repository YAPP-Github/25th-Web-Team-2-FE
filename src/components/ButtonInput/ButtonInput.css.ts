import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const inputContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.6rem',
  width: '100%',
});

export const inputLabel = style({
  ...fonts.label.large.M14,
  color: colors.text06,
  display: 'flex',
  gap: '0.4rem',
});

export const joinInput = style({
  ...fonts.body.normal.M16,
  color: colors.text06,
  border: `0.1rem solid ${colors.line01}`,
  padding: '1.6rem',
  borderRadius: '1.2rem',
  selectors: {
    '&:disabled': {
      color: colors.text03,
      backgroundColor: colors.field03,
    },
    '&::placeholder': {
      color: colors.text03,
    },
    '&:focus': {
      outline: `0.1rem solid ${colors.lineTinted}`,
    },
    "&[aria-invalid='true']": {
      outline: `0.1rem solid ${colors.textAlert}`,
    },
  },
});

export const inputWrapper = style({
  position: 'relative',
  backgroundColor: colors.field01,
  borderRadius: '1rem',
});

export const confirmButton = style({
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

export const requiredStar = style({
  color: colors.textAlert,
});

export const infoContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
});

export const errorMessage = style({
  ...fonts.label.medium.R13,
  color: colors.textAlert,
});

export const tipWrapper = style({
  ...fonts.label.medium.R13,
  display: 'flex',
  gap: '0.4rem',
  color: colors.text02,
});
