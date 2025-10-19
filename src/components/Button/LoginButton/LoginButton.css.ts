import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const loginButton = style({
  display: 'inline-block',
  ...fonts.label.large.SB14,
  backgroundColor: colors.primaryMint,
  color: colors.text01,
  padding: '0.6rem 1.4rem',
  borderRadius: '1.2rem',
});
