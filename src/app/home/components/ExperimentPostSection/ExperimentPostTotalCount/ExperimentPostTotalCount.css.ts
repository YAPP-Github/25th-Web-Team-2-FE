import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const totalPostCount = style({
  ...fonts.label.large.R14,
  color: colors.text03,
});
