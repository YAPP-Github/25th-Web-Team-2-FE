import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const emailWrapper = style({
  display: 'flex',
  alignItems: 'center',
  width: 'fit-content',

  border: `1px solid ${colors.line01}`,
  borderRadius: '5.2rem',
  padding: '0.2rem 0.8rem 0.2rem 0.6rem',
});

export const email = style({
  ...fonts.label.small.R12,
  color: colors.text03,
});
