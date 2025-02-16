import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';
import { zIndex } from '@/styles/zIndex';

export const alertDialogContent = style({
  width: '32rem',
  backgroundColor: colors.field01,
  borderRadius: '1.2rem',
  padding: '3.2rem 4.5rem',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  boxShadow: '0px 4px 16px rgba(53, 59, 61, 0.2)',
  zIndex: zIndex.dialogContent,
  textAlign: 'center',
});

export const alertDialogTitle = style({
  ...fonts.title.medium.SB20,
  color: colors.text06,
  marginTop: '2rem',
  marginBottom: '0.8rem',
});

export const alertDialogDescription = style({
  ...fonts.body.normal.M16,
});
