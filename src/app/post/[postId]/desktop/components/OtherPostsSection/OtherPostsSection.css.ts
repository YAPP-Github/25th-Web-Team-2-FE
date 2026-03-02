import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const otherPostsLayout = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
});

export const otherPostsTitle = style({
  ...fonts.body.small.M15,
  color: colors.text05,
});

export const cardList = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '1.2rem',
});
