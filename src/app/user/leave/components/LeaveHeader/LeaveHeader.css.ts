import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const leaveHeaderWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.2rem',
});

export const title = style({
  ...fonts.title.medium.SB20,
  color: colors.text06,
  height: '2.8rem',
});

export const description = style({
  ...fonts.label.large.R14,
  color: colors.text03,
});
