import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const univEmailInputContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.2rem',
});

export const errorMessage = style({
  ...fonts.label.medium.R13,
  color: colors.textAlert,
});

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
