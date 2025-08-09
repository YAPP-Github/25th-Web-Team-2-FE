import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const emptyMyPostsLayout = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1.6rem',
  paddingTop: '10rem',
});

export const emptyContents = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.8rem',
});

export const emptyTitle = style({
  ...fonts.body.normal.M16,
  color: colors.text05,
});

export const emptyDescription = style({
  ...fonts.label.large.M14,
  color: colors.text03,
});
