import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const postCardContentContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6rem',
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

export const watchMoreButton = style({
  ...fonts.label.large.SB14,
  color: colors.text04,
  backgroundColor: colors.field04,
  padding: '1.2rem 0',
  borderRadius: '1.2rem',
});

export const loadingMoreButton = style({
  height: '4.6rem',
});
