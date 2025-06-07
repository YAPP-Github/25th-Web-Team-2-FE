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
