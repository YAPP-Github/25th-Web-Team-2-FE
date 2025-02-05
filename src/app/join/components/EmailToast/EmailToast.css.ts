import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';
import theme from '@/styles/theme';

export const toastLayout = style({
  color: colors.text06,
  height: '5.2rem',
  backgroundColor: colors.fieldToast,
  boxShadow: '0px 4px 16px rgba(53, 59, 61, 0.2)',
  borderRadius: '8rem',
  padding: '1.4rem 2.4rem',
  position: 'fixed',
  top: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: theme.zIndex.toastContent,
});

export const toastTitle = style({
  ...fonts.body.normal.SB16,
  color: colors.text01,
  display: 'flex',
  flexFlow: 'row nowrap',
  alignItems: 'center',
  gap: '1rem',
  width: 'max-content',
});

export const toastViewport = style({
  position: 'fixed',
  top: '6rem',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: theme.zIndex.toastViewport,
});
