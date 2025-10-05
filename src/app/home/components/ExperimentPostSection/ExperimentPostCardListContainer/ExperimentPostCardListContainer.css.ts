import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const postCardContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.6rem',
  minHeight: '40rem',
});

export const postCardContainerHeader = style({
  '@media': {
    'screen and (max-width: 767px)': {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '0.4rem 1.6rem',
    },
  },
});

export const totalPostCount = style({
  ...fonts.label.large.R14,
  color: colors.text03,
});
