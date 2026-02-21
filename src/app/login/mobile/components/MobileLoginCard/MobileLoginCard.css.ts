import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const mobileLoginCard = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6rem',
  padding: '2.4rem',

  borderRadius: '1rem',
  backgroundColor: colors.field04,
});

export const titleContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
});

export const titleText = style({
  ...fonts.title.medium.B20,
  color: colors.text06,
});

export const subTitleText = style({
  ...fonts.body.small.M15,
  color: colors.text06,
});

export const buttonContainer = style({
  display: 'grid',
  gridTemplateColumns: '1fr 0 1fr',
  backgroundColor: colors.field01,
  border: `1px solid ${colors.line01}`,
  borderRadius: '0.8rem',
});

export const loginButton = style({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.4rem',
  padding: '1rem 2.8rem',
});

const loginButtonRecentBase = style({
  outline: `1px solid ${colors.primaryMint}`,
  outlineOffset: '-1px',
});

export const loginButtonRecentNaver = style([
  loginButtonRecentBase,
  { borderRadius: '0.8rem 0 0 0.8rem' },
]);

export const loginButtonRecentGoogle = style([
  loginButtonRecentBase,
  { borderRadius: '0 0.8rem 0.8rem 0' },
]);

export const recentLoginBadge = style({
  position: 'absolute',
  top: '-0.8rem',
  right: '0.8rem',
  ...fonts.label.small.SB12,
  color: colors.text01,
  backgroundColor: colors.primaryMint,
  padding: '0.4rem 0.6rem',
  borderRadius: '0.8rem',
});

export const loginButtonText = style({
  ...fonts.label.large.M14,
  color: colors.text06,
  whiteSpace: 'nowrap',
});

export const verticalLine = style({
  position: 'relative',
  selectors: {
    '&::after': {
      content: '""',
      width: '0.1rem',
      height: '100%',
      position: 'absolute',
      top: '50%',
      right: 0,
      transform: 'translateY(-50%)',
      backgroundColor: colors.line01,
    },
  },
});
