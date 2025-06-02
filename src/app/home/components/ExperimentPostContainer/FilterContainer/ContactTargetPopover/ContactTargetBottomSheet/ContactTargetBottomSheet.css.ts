import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const contactTargetBottomSheetContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '3.2rem',
});

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
  padding: '0.6rem 1rem 0.6rem 1.4rem',
  border: 'none',
  borderRadius: '1.2rem',
  color: 'var(--trigger-color)',
  backgroundColor: 'var(--trigger-bg)',
  whiteSpace: 'nowrap',
  selectors: {
    '&:hover': {
      boxShadow: '0px 4px 16px rgba(53, 59, 61, 0.2)',
    },
  },

  '@media': {
    'screen and (max-width: 767px)': {
      color: 'var(--trigger-color-mobile)',
      backgroundColor: 'var(--trigger-bg-mobile)',
      padding: '0.8rem 1rem 0.8rem 1.4rem',
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
  ...fonts.body.normal.SB16,
  color: colors.text06,
});

export const genderButtonGroup = style({
  display: 'flex',
  gap: '0.8rem',
});

export const genderButton = style({
  ...fonts.body.small.M15,
  color: colors.text06,
  flex: 1,
  padding: '1.2rem 0',
  borderRadius: '1.2rem',
  outline: `1px solid ${colors.line01}`,
  transition: 'color 0.1s, background-color 0.1s, outline 0.1s',
  width: '10.6rem',
  selectors: {
    '&.active': {
      ...fonts.body.small.SB15,
      backgroundColor: colors.primaryTinted,
      outline: `0.1rem solid ${colors.lineTinted}`,
      color: colors.textPrimary,
    },
  },
});

export const ageInputContainer = style({
  display: 'flex',
  alignItems: 'center',
});

export const ageInput = style({
  ...fonts.body.small.M15,
  width: '100%',
  padding: '1.2rem 0 1.2rem 1.6rem',
  border: `0.1rem solid ${colors.line01}`,
  borderRadius: '1.2rem',
  selectors: {
    '&:focus': {
      outline: 'none',
      border: `0.1rem solid ${colors.primaryMint}`,
    },

    '&::placeholder': {
      color: colors.text02,
    },
  },
});

export const footerButtonContainer = style({
  display: 'flex',
  gap: '1rem',
  paddingTop: '1.6rem',
});

export const resetButton = style({
  ...fonts.body.normal.SB16,
  padding: '1.6rem 0',
  borderRadius: '1.2rem',
  flexBasis: '30%',
});

export const saveButton = style({
  ...fonts.body.normal.SB16,
  padding: '1.6rem 0',
  borderRadius: '1.2rem',
  flexBasis: '70%',
});
