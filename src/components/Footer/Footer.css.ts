import { style, globalStyle } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const footerLayout = style({
  backgroundColor: colors.field09,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1.6rem',
  padding: '2rem 0',

  '@media': {
    'screen and (max-width: 768px)': {
      display: 'none',
    },
  },
});

export const buttonContainer = style({
  display: 'flex',
  gap: '1.2rem',
});

globalStyle(`${buttonContainer} a`, {
  ...fonts.label.large.M14,
  color: colors.text02,
  background: 'none',
  border: 'none',
  cursor: 'pointer',
});

export const verticalLine = style({
  position: 'relative',
  selectors: {
    '&::after': {
      content: '""',
      width: '0.1rem',
      height: '1.2rem',
      position: 'absolute',
      top: '50%',
      right: 0,
      transform: 'translateY(-50%)',
      backgroundColor: colors.line03,
    },
    '&:last-child::after': {
      display: 'none',
    },
  },
});

export const textContainer = style({
  ...fonts.label.large.M14,
  color: colors.text02,
  textAlign: 'center',
});
