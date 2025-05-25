import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const mobileLoginPageLayout = style({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '4.8rem',
});

export const mobileLoginCardContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6rem',
});

export const tempText = style({
  ...fonts.body.normal.M16,
  color: colors.text03,
  textAlign: 'center',
});
