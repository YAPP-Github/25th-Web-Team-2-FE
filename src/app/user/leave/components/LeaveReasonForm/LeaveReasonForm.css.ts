import { globalStyle, style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const checkFormContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
});

export const checkFormItem = style({
  ...fonts.label.large.M14,
  color: colors.text05,
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
  padding: '0.2rem 0',
  cursor: 'pointer',
});

globalStyle(`${checkFormItem} input[type="radio"]`, {
  appearance: 'none',
  width: '15px',
  height: '15px',
  boxShadow: `0 0 0 1px ${colors.icon02}`,
  borderRadius: '50%',
});

globalStyle(`${checkFormItem} input[type="radio"]:checked`, {
  border: '3px solid white',
  boxShadow: `0 0 0 2px ${colors.primaryMint}`,
  backgroundColor: colors.primaryMint,
});
