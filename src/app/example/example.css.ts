import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const exampleBox = recipe({
  base: {
    height: '30rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '1rem',
    color: colors.text07,
    ...fonts.body.normal.R16,
  },
  variants: {
    backgroundColor: {
      primary: {
        backgroundColor: colors.primaryTinted,
      },
      secondary: {
        backgroundColor: colors.secondaryPink,
      },
      gray: {
        backgroundColor: colors.field04,
      },
    },
    size: {
      small: {
        width: '20rem',
        ...fonts.body.normal.B16,
      },
      medium: {
        width: '30rem',
      },
      large: {
        width: '40rem',
        ...fonts.body.normal.R16,
      },
    },
  },
  defaultVariants: {
    backgroundColor: 'primary',
    size: 'medium',
  },
});

export const exampleText = style({
  ...fonts.body.normal.B16,
});
