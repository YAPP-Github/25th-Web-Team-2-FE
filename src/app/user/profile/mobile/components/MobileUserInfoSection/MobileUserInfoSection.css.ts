import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const userInfoHeader = style({
  backgroundColor: colors.field10,
  borderRadius: '1.2rem',
  margin: '0.8rem 1.6rem',
  padding: '2.2rem 2rem',
});

export const userInfoContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
});

export const userName = style({
  ...fonts.title.medium.SB20,
  color: colors.text01,
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
});

export const userBadge = style({
  ...fonts.label.large.B14,
  backgroundColor: 'rgba(38,181,190,0.3)',
  borderRadius: '1.2rem',
  padding: '0.4rem 0.8rem',
  display: 'inline-flex',
  alignItems: 'center',
});

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

export const gender = style({
  color: colors.text02,
});

export const birthDate = style({
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
