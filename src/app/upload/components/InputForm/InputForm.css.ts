import { styleVariants, style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const textInputContainer = styleVariants({
  half: {
    display: 'flex',
    flexDirection: 'column',

    position: 'relative',
    width: '100%',
    maxWidth: '45.2rem',
  },
  full: {
    display: 'flex',
    flexDirection: 'column',

    position: 'relative',
    width: '100%',
    maxWidth: '93.6rem',
  },
});

export const textInput = styleVariants({
  default: {
    ...fonts.label.large.R14,
    width: '100%',
    height: '4.8rem',
    padding: '0.8rem 1.6rem',
    border: `0.1rem solid ${colors.line01}`,
    borderRadius: '1.2rem',
    color: colors.text06,
    '::placeholder': {
      color: colors.text02,
      ...fonts.label.large.R14,
    },
    ':focus': {
      borderColor: colors.lineTinted,
      outline: 'none',
    },
  },
  error: {
    border: `0.1rem solid ${colors.textAlert}`,
    ':focus': {
      borderColor: colors.textAlert,
    },
  },
});

export const textCounter = style({
  ...fonts.label.small.M12,
  color: colors.text02,
  textAlign: 'right',
});

export const textSubMessageLayout = styleVariants({
  withCounter: {
    display: 'flex',
    flexFlow: 'row-reverse nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '0.4rem',
  },
  noCounter: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export const formMessage = style({
  ...fonts.label.small.M12,
  color: colors.textAlert,
  margin: '0',
  marginTop: '0.4rem',
});
