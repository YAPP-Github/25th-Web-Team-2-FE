import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const headerLayout = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '2rem 0',
});

export const image = style({
  height: 'auto',
});

export const buttonContainer = style({
  height: '100%',
  display: 'flex',
  gap: '0.8rem',
});

export const contactButton = style({
  ...fonts.label.large.SB14,
  backgroundColor: colors.primaryTinted,
  color: colors.textPrimary,
  padding: '0.6rem 1.4rem',
  borderRadius: '1.2rem',
});

export const loginButton = style({
  display: 'inline-block',
  ...fonts.label.large.SB14,
  backgroundColor: colors.primaryMint,
  color: colors.text01,
  padding: '0.6rem 1.4rem',
  borderRadius: '1.2rem',
});

export const myPostsButton = style({
  display: 'inline-block',
  ...fonts.label.large.SB14,
  backgroundColor: colors.field05,
  color: colors.text05,
  padding: '0.6rem 1.4rem',
  borderRadius: '1.2rem',
});

export const buttonWrapper = style({
  display: 'flex',
  gap: '0.4rem',
  alignItems: 'center',
});
