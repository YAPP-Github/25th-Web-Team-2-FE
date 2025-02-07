import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const genderSelectWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
});

export const ageSelectWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
});

export const popoverTrigger = style({
  ...fonts.label.large.SB14,
  display: 'flex',
  gap: '0.4rem',
  alignItems: 'center',
  width: 'fit-content',
  padding: '0.6rem 1.4rem',
  border: 'none',
  borderRadius: '1.2rem',
  color: 'var(--popover-trigger-color)',
  backgroundColor: 'var(--popover-trigger-bg)',
  selectors: {
    '&:hover': {
      boxShadow: '0px 4px 16px rgba(53, 59, 61, 0.2)',
    },
  },
});

export const popoverContent = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '2rem',
  borderRadius: '1.2rem',
  backgroundColor: colors.field01,
  boxShadow: '0px 4px 16px rgba(53, 59, 61, 0.2)',
  gap: '1.6rem',
  marginTop: '0.6rem',
});

export const labelWrapper = style({
  display: 'flex',
  gap: '0.4rem',
  alignItems: 'center',
});

export const label = style({
  ...fonts.body.normal.M16,
  color: colors.text06,
});

export const subLabel = style({
  ...fonts.label.large.R14,
  color: colors.text03,
});

export const genderButtonGroup = style({
  display: 'flex',
  gap: '0.8rem',
});

export const genderButton = style({
  ...fonts.label.large.M14,
  color: colors.text06,
  padding: '0.6rem 2.15rem',
  borderRadius: '1.2rem',
  outline: `1px solid ${colors.line01}`,
  transition: 'color 0.1s, background-color 0.1s, outline 0.1s',
  width: '10.6rem',
  selectors: {
    '&.active': {
      backgroundColor: colors.primaryTinted,
      outline: `0.1rem solid ${colors.lineTinted}`,
      color: colors.textPrimary,
    },
  },
});

export const ageInputContainer = style({
  display: 'flex',
  gap: '1rem',
  alignItems: 'center',
});

export const ageInput = style({
  ...fonts.label.large.M14,
  width: '100%',
  padding: '0.6rem 0 0.6rem 1.6rem',
  border: `0.1rem solid ${colors.line01}`,
  borderRadius: '1.2rem',
  selectors: {
    '&:focus': {
      outline: 'none',
      border: `0.1rem solid ${colors.primaryMint}`,
    },
  },
});

export const footerButtonContainer = style({
  display: 'flex',
  gap: '0.8rem',
  justifyContent: 'flex-end',
});

export const resetButton = style({
  ...fonts.label.large.SB14,
  padding: '0.6rem 1.4rem',
  borderRadius: '1.2rem',
  backgroundColor: colors.field03,
  color: colors.text06,
});

export const saveButton = style({
  ...fonts.label.large.SB14,
  padding: '0.6rem 1.4rem',
  borderRadius: '1.2rem',
  backgroundColor: colors.primaryMint,
  color: colors.text01,
});
