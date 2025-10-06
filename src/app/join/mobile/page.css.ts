import { globalStyle, style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const layout = style({
  width: '100%',
});

export const headerWrapper = style({
  display: 'grid',
  gridTemplateColumns: '24px 1fr 24px',
  alignItems: 'center',
  justifyItems: 'center',
  padding: '1.2rem 1.6rem',
  height: '5.4rem',
});

export const headerTitle = style({
  ...fonts.body.normal.SB16,
  color: colors.text06,
});

export const progressBar = style({
  height: '0.2rem',
  backgroundColor: colors.field05,
});

export const mainContentLayout = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  padding: '2.8rem 1.6rem 0 1.6rem',

  '@media': {
    'screen and (max-width: 767px)': {
      overflowY: 'auto',
    },
  },
});

export const emailInput = style({
  ...fonts.body.small.M15,
  color: colors.text06,
  border: `1px solid ${colors.line01}`,
  borderRadius: '1.2rem',
  padding: '1.6rem',

  selectors: {
    '&:focus': {
      outline: 'none',
      border: `0.1rem solid ${colors.primaryMint}`,
    },

    '&::placeholder': {
      color: colors.text02,
    },
  },
});

export const serviceAgreeBottomSheetLayout = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6rem',
});

export const serviceAgreeContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
});

export const checkboxWrapper = style({
  padding: '0.6rem 0',
  textAlign: 'left',
  wordBreak: 'keep-all',
});

globalStyle(`${checkboxWrapper} label`, {
  alignItems: 'flex-start',
});

export const bottomButtonLayout = style({
  position: 'fixed',
  left: 0,
  bottom: 16,
  width: '100%',

  padding: '0 1.6rem',
});
