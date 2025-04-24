import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const postContainerLayout = style({
  marginTop: '2rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6rem',

  background: 'transparent',
});

export const postContainerTitle = style({
  ...fonts.title.medium.SB20,
  color: colors.text06,
});

export const filterWrapper = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const recruitCheckLabel = style({
  ...fonts.label.large.SB14,
  color: colors.text06,
});
