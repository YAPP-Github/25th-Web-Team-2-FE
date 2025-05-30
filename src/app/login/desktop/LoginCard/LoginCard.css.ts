import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const loginCardLayout = style({
  backgroundColor: colors.field02,
  width: '32.7rem',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '1.2rem',
  padding: '3rem',
  justifyContent: 'space-between',
});

export const cardTitleContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
});

export const badge = style({
  ...fonts.label.large.SB14,
  width: 'fit-content',
  padding: '0.4rem 0.8rem',
  borderRadius: '1.2rem',
  color: 'var(--badge-color)',
  backgroundColor: 'var(--badge-bg)',
});

export const buttonContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
});

export const loginButton = style({
  ...fonts.label.large.R14,
  backgroundColor: colors.field01,
  color: colors.text06,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.4rem',
  padding: '0.8rem',
  borderRadius: '0.8rem',
});
