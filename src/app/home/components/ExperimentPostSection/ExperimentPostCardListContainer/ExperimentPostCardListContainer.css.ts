import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const postCardContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.6rem',
  minHeight: '40rem',
});

export const emptyViewLayout = style({
  minHeight: 'calc(100dvh - 12.2rem)',

  display: 'flex',
  flexFlow: 'column nowrap',
  justifyContent: 'center',
  gap: '0.8rem',
  alignItems: 'center',
});

export const emptySubTitle = style({
  ...fonts.label.small.M12,
  color: colors.text04,
  marginBottom: '1.6rem',
  textAlign: 'center',
});
