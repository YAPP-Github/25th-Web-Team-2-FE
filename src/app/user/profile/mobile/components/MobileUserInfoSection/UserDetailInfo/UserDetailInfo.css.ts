import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const userDetails = style({
  ...fonts.body.small.R15,
  display: 'flex',
  flexDirection: 'column',
});

export const userDetailWrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
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
  },
});

export const firstTitle = style({
  color: colors.text03,
});

export const firstContent = style({
  color: colors.text02,
});

export const userID = style({
  color: colors.text02,
});

export const userIDLabel = style({
  color: colors.text03,
});

export const userIDWrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
});
