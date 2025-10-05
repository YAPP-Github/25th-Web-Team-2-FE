import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const emptyPostCardLayout = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1.6rem',
  height: '30.8rem',
});

export const emptyPostCardContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
  textAlign: 'center',
});

export const emptyListTitle = style({
  ...fonts.body.normal.M16,
  color: colors.text04,
});

export const emptyListContent = style({
  ...fonts.label.small.M12,
  color: colors.text04,
});
