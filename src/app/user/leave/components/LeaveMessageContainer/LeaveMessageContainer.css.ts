import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

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
