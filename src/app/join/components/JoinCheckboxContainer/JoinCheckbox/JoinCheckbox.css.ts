import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const checkboxLayout = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
});

export const checkboxWrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
  userSelect: 'none',
});

export const allCheckWrapper = style({
  borderBottom: `0.1rem solid ${colors.line01}`,
  paddingBottom: '1.6rem',
});

export const checkbox = style({
  position: 'absolute',
  opacity: 0,
  pointerEvents: 'none',
});

export const requiredCheckboxText = style({
  color: colors.textPrimary,
});

export const labelWrapper = style({
  display: 'flex',
  gap: '0.4rem',
});

export const tipWrapper = style({
  ...fonts.label.small.M12,
  display: 'flex',
  gap: '0.4rem',
  color: colors.text02,
});

export const tipAlert = style({
  color: colors.textPrimary,
});
