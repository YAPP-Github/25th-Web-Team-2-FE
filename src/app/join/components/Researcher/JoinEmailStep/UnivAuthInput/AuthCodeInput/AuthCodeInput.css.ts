import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const authInputLayout = style({
  display: 'flex',
  flexDirection: 'column',
});

export const authTimerWrapper = style({
  position: 'absolute',
  right: '1.2rem',
  top: '1rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
});

export const authTimerText = style({
  ...fonts.label.large.M14,
  color: colors.text03,
});

export const authCodeButton = style({
  ...fonts.label.large.SB14,
  padding: '0.7rem 1.6rem',
  borderRadius: '1rem',
  backgroundColor: colors.primaryMint,
  color: colors.text01,
  selectors: {
    '&:disabled': {
      backgroundColor: colors.field04,
      color: colors.text02,
    },
  },
});

export const inputFooter = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  alignItems: 'center',
});

export const sendAgainButton = style({
  ...fonts.label.large.M14,
  color: colors.text03,
  textDecorationLine: 'underline',
  justifySelf: 'end',
});
