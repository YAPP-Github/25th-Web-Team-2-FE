import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const termContainer = style({
  ...fonts.body.normal.M16,
  color: colors.text06,
  backgroundColor: colors.field01,
  border: `0.1rem solid ${colors.line01}`,
  borderRadius: '1.2rem',
  display: 'flex',
  flexDirection: 'column',
  padding: '1.6rem',
  gap: '1.2rem',
});

export const termWrapper = style({
  ...fonts.label.medium.R13,
  overflowY: 'scroll',
  maxHeight: 160,
  padding: '0.8rem 1.6rem',
  borderRadius: '1.2rem',
  backgroundColor: colors.field02,
  color: colors.text05,
});
