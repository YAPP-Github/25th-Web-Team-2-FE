import { style, styleVariants } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const selectInputContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
});

export const selectTrigger = styleVariants({
  default: {
    ...fonts.label.large.R14,
    width: '100%',
    height: '4.8rem',
    padding: '0.8rem 1.6rem',
    border: `0.1rem solid ${colors.line01}`,
    borderRadius: '1.2rem',
    color: colors.text06,
    backgroundColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    selectors: {
      '&[data-placeholder]': {
        color: colors.text02,
      },
      '&[data-state="open"]': {
        border: `0.1rem solid ${colors.primaryMint}`,
        outline: 'none',
      },
    },
  },
  disabled: {
    color: colors.text02,
    backgroundColor: colors.field02,
  },
  error: {
    border: `0.1rem solid ${colors.textAlert}`,
  },
});

export const selectContent = style({
  width: '45.2rem',
  backgroundColor: colors.field01,
  border: `0.1rem solid ${colors.line01}`,
  borderRadius: '1.2rem',
  boxShadow: '0rem 0.4rem 1rem rgba(0, 0, 0, 0.1)',
  padding: '0.8rem 0.8rem',
});

export const selectItem = style({
  ...fonts.label.large.M14,
  height: '3.6rem',
  padding: '0.7rem 2rem',
  cursor: 'pointer',
  outline: 'none',
  marginBottom: '0.8rem',
  selectors: {
    '&:last-of-type': {
      marginBottom: '0',
    },
    '&[data-highlighted]': {
      backgroundColor: colors.field02,
      borderRadius: '1.2rem',
    },
    '&[data-state="checked"]': {
      backgroundColor: colors.primaryTinted,
      color: colors.textPrimary,
      borderRadius: '1.2rem',
      border: `0.1rem solid ${colors.textPrimary}`,
    },
  },
});

export const formMessage = style({
  ...fonts.label.small.M12,
  color: colors.textAlert,
  margin: '0',
});
