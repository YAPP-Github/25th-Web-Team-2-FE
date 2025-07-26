import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const leavePageLayout = style({
  display: 'flex',
  maxWidth: '56rem',

  width: '100%',

  margin: '0 auto',

  paddingBottom: '17.8rem', // 12.2 + 5.6

  '@media': {
    'screen and (max-width: 767px)': {
      padding: '0 2rem 5.6rem',
    },
  },
});

export const leaveFormLayout = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4.6rem',
  paddingTop: '6rem',
  flexGrow: 1,

  '@media': {
    'screen and (max-width: 767px)': {
      paddingTop: '0',
    },
  },
});

export const leaveReasonContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2.4rem',
});

export const footerMessageContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
});

export const alertTextWrapper = style({
  ...fonts.label.large.M14,
  color: colors.text04,

  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
});
