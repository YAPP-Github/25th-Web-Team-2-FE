import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const leavePageLayout = style({
  display: 'flex',
  width: '56rem',
  margin: '0 auto',
});

export const leaveFormLayout = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4.6rem',
  paddingTop: '6rem',
  flexGrow: 1,
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

export const leaveMessageContainer = style({
  ...fonts.label.large.R14,
  color: colors.text04,
  backgroundColor: colors.field02,

  display: 'flex',
  flexDirection: 'column',
  borderRadius: '1.2rem',
  padding: '1.4rem 2.4rem 1.4rem 1.6rem',

  listStyle: 'none',
});

export const listItem = style({
  position: 'relative',
  paddingLeft: '1.2rem',

  '::before': {
    content: '•',
    position: 'absolute',
    left: '0rem',
  },
});

export const listSubText = style({
  paddingLeft: '1.2rem',
});
