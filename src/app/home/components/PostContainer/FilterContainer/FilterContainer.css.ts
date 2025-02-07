import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';

export const filterContainerLayout = style({
  display: 'flex',
  gap: '0.8rem',
  height: '3.2rem',
});

export const resetFilterButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: colors.field01,
  padding: '0.8rem',
  borderRadius: '1.2rem',
});
