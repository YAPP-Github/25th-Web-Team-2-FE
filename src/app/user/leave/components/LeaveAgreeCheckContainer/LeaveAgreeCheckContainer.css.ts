import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const confirmCheckWrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.6rem',
  padding: '0.6rem 0',
  cursor: 'pointer',
});

export const confirmCheckText = style({
  ...fonts.label.large.M14,
  color: colors.text06,
});
