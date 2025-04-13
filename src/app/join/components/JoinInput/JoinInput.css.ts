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

export const requiredStar = style({
  color: colors.textAlert,
});

export const inputWrapper = style({
  position: 'relative',
});

export const inputResetButton = style({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  right: '1.7rem',
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

export const textCount = style({
  ...fonts.label.small.M12,
  display: 'flex',
  justifyContent: 'flex-end',
  color: colors.text02,
});

export const tipAlert = style({
  color: colors.textPrimary,
});
