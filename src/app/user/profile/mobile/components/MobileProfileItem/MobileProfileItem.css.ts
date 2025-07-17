import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const profileItem = style({
  display: 'flex',
  alignItems: 'center',
  padding: '1.6rem',
  backgroundColor: colors.field01,
  cursor: 'pointer',
  textDecoration: 'none',
  color: 'inherit',
});

export const profileItemContent = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
});

export const profileItemLabel = style({
  ...fonts.body.normal.M14,
  color: colors.text06,
  display: 'flex',
  alignItems: 'center',
});

export const profileItemValue = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
  ...fonts.body.normal.R14,
  color: colors.text05,
});

export const profileItemArrow = style({
  color: colors.text04,
  fontSize: '1.2rem',
});
