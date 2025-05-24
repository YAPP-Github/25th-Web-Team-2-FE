import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const customRadioGroup = style({
  display: 'flex',
  flexFlow: 'row nowrap',
  gap: '0.8rem',
});

export const customRadioButton = style({
  ...fonts.label.large.M14,
  flexGrow: 1,
  flexBasis: 0,
  height: '4.8rem',
  padding: '1rem 2rem',
  border: `0.1rem solid ${colors.line01}`,
  borderRadius: '1.2rem',
  backgroundColor: colors.field01,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  selectors: {
    '&:hover': {
      backgroundColor: colors.field02,
    },
    "&[aria-invalid='true']": {
      outline: `0.1rem solid ${colors.textAlert}`,
    },
  },
});

export const activeRadioButton = style({
  border: `0.1rem solid ${colors.lineTinted}`,
  backgroundColor: colors.primaryTinted,
  color: colors.textPrimary,
  selectors: {
    '&:hover': {
      backgroundColor: colors.primaryTinted,
    },
  },
});

export const errorRadioButton = style({
  borderColor: colors.textAlert,
});
