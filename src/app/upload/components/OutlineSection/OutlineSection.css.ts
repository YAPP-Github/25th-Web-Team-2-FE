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

export const isEndDatePastText = style({
  ...fonts.label.small.M12,
  color: colors.text02,
  marginTop: '0.4rem',
});
