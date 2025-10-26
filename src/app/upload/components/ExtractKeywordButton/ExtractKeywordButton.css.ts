import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const extractKeywordButtonWrapper = style({
  ...fonts.label.large.SB14,
  color: colors.field01,
  padding: '1rem',
  borderRadius: '0.8rem',
  background: 'linear-gradient(to right, #3EBBC4, #D768E2)',
  marginTop: '1.2rem',
});

export const extractKeywordButtonInner = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.4rem',
});
