import { style } from '@vanilla-extract/css';

import { colors } from '@styles/colors';
import { fonts } from '@styles/fonts.css';

export const recentLoginTooltipContent = style({
  ...fonts.label.medium.M13,
  color: colors.text05,
  backgroundColor: colors.field01,
  padding: '0.8rem 1.6rem',
  borderRadius: '0.6rem',
  border: `0.15rem solid ${colors.line01}`,
  boxShadow: '0px 4px 16px rgba(53, 59, 61, 0.3)',
});
