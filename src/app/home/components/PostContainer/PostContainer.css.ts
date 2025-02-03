import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const postContainerLayout = style({
  margin: '2rem 0',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6rem',
});

export const postContainerTitle = style({
  ...fonts.title.medium.SB20,
  color: colors.text06,
});

export const postCardContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.6rem',
  minHeight: '40rem',
});

export const totalPostCount = style({
  ...fonts.label.large.R14,
  color: colors.text03,
});

export const filterWrapper = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});
