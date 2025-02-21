import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const customRadioGroup = style({
  display: 'flex',
  flexFlow: 'row nowrap',
  gap: '0.8rem',
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
    error: {
      true: {
        borderColor: colors.textAlert,
      },
    },
  },
});
