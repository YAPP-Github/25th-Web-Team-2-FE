import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const outlineFormLayout = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gridTemplateRows: '10.2rem 10.2rem auto',
  gridColumnGap: '3.2rem',
  gridRowGap: '2.8rem',
  margin: '0 auto',
});

export const radioGroup = style({
  display: 'flex',
  flexFlow: 'row nowrap',
  gap: '0.8rem',
});

export const customRadioGroup = style({
  display: 'flex',
  gap: '1rem',
});

export const customRadioButton = recipe({
  base: {
    ...fonts.label.large.M14,
    width: '14.533rem',
    height: '4.8rem',
    padding: '1rem 2rem',
    border: `0.1rem solid ${colors.line01}`,
    borderRadius: '1.2rem',
    backgroundColor: colors.field01,
    cursor: 'pointer',
    transition: 'all 0.2s ease',

    ':hover': {
      backgroundColor: colors.field02,
    },
  },
  variants: {
    active: {
      true: {
        border: `0.1rem solid ${colors.lineTinted}`,
        backgroundColor: colors.primaryTinted,
        color: colors.textPrimary,

        ':hover': {
          backgroundColor: colors.primaryTinted,
        },
      },
    },
  },
  defaultVariants: {
    active: false,
  },
});

export const uploadInputContainer = style({
  display: 'flex',
  flexFlow: 'column nowrap',
  gap: '0.8rem',
});

export const disabledInput = style({
  ...fonts.label.large.R14,
  width: '100%',
  maxWidth: '45.2rem',
  height: '4.8rem',
  padding: '10px',
  borderRadius: '1.2rem',
  outline: 'none',
  border: `0.1rem solid ${colors.line01}`,
  backgroundColor: colors.field02,
  color: colors.text02,
});

export const headingIcon = style({
  ...fonts.label.small.SB12,
  width: '1.8rem',
  height: '1.8rem',
  borderRadius: '50%',
  textAlign: 'center',
  padding: '0.2rem',
  backgroundColor: colors.primaryMint,
  color: colors.text01,
});

export const label = style({
  ...fonts.label.large.M14,
  color: colors.text05,
  marginBottom: '0.8rem',
  display: 'block',
});

export const uploadInput = recipe({
  base: {
    ...fonts.label.large.R14,
    width: '100%',
    maxWidth: '45.2rem',
    height: '4.8rem',
    padding: '10px',
    borderRadius: '1.2rem',
    outline: 'none',
    border: `0.1rem solid ${colors.line01}`,

    '::placeholder': {
      color: colors.text02,
    },

    ':focus': {
      outline: `0.1rem solid ${colors.lineTinted}`,
      outlineOffset: '0',
      border: 'none',
    },
  },
  variants: {
    isError: {
      true: {
        border: `0.1rem solid ${colors.textAlert}`,
      },
    },
  },
  defaultVariants: {
    isError: false,
  },
});
