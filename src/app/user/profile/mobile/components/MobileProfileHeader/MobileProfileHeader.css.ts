import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const mobileProfileHeaderWrapper = style({
  display: 'grid',
  gridTemplateColumns: '24px 1fr 24px',
  alignItems: 'center',
  justifyItems: 'center',
  padding: '1.2rem 1.6rem',
  height: '5.4rem',
});

export const headerTitle = style({
  ...fonts.body.normal.SB16,
  color: colors.text06,
});
