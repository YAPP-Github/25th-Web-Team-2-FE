import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const titleContainerLayout = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.2rem',
});

export const titleWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
});

export const titleText = style({
  ...fonts.title.medium.SB20,
  color: colors.text06,
});

export const descriptionText = style({
  ...fonts.label.large.R14,
  color: colors.text03,
  whiteSpace: 'pre-wrap',
});
