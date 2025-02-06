import { style } from '@vanilla-extract/css';

import { fonts } from '@/styles/fonts.css';
import { colors } from '@/styles/colors';

export const myPostContainerLayout = style({});

export const myPostsHeaderContainer = style({
  display: 'flex',
  flexFlow: 'row nowrap',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const myPostsHeaderText = style({
  ...fonts.title.medium.SB20,
  marginBottom: '2rem',
  marginTop: '1.2rem',
});

export const postsSorting = style({
  ...fonts.label.large.SB14,
  color: colors.text03,
  display: 'flex',
  flexFlow: 'row nowrap',
  alignItems: 'center',
  gap: '0.4rem',
});
