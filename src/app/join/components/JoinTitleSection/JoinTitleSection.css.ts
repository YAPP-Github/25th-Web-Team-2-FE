import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const titleContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const joinTitle = style({
  ...fonts.title.medium.SB20,
  color: colors.text06,
});

export const progressBarContainer = style({
  width: '8rem',
  height: '0.6rem',
  backgroundColor: colors.field03,
  borderRadius: '0.6rem',
});

export const progressBarFill = style({
  width: 'var(--progress-width)',
  height: '100%',
  backgroundColor: colors.primaryMint,
  borderRadius: '0.6rem',
  transition: 'width 1s',
});
