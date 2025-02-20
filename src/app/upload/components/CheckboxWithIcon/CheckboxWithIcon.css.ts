import { recipe } from '@vanilla-extract/recipes';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const checkboxContainer = recipe({
  base: {
    width: 'fit-content',
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
  },
  variants: {
    size: {
      small: {
        gap: '0.2rem',
      },
      large: {
        gap: '0.4rem',
      },
    },
  },
  defaultVariants: {
    size: 'small',
  },
});

export const checkboxLayout = recipe({
  base: {
    display: 'flex',
    cursor: 'pointer',
  },
  variants: {
    size: {
      small: {
        ...fonts.label.small.M12,
      },
      large: {
        ...fonts.label.large.R14,
      },
    },
    align: {
      left: {
        justifyContent: 'flex-start',
      },
      center: {
        justifyContent: 'center',
      },
      right: {
        justifyContent: 'flex-end',
      },
    },
    boldStyle: {
      true: {
        fontWeight: '500',
        color: colors.text06,
      },
      false: {
        fontWeight: '400',
        color: colors.text04,
      },
    },
    disabled: {
      true: {
        color: colors.text02,
        cursor: 'default',
      },
      false: {},
    },
  },
  defaultVariants: {
    size: 'small',
    align: 'right',
    boldStyle: false,
    disabled: false,
  },
});
