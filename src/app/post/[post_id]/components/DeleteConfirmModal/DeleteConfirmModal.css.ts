import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';
import { zIndex } from '@/styles/zIndex';

export const dialogContent = style({
  width: '49rem',
  height: '16.4rem',
  backgroundColor: colors.field01,
  borderRadius: '1.2rem',
  padding: '3.2rem',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  boxShadow: '0px 4px 16px rgba(53, 59, 61, 0.2)',
  zIndex: zIndex.dialogContent,
});

export const dialogTitle = style({
  ...fonts.title.medium.SB20,
  color: colors.text06,
  textAlign: 'center',
  marginBottom: '3.2rem',
});

export const buttonGroup = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  gap: '0.8rem',
});

export const modalButtonStyle = style({
  ...fonts.body.normal.SB16,
  width: '100%',
  height: '4.8rem',
  borderRadius: '1.2rem',
  padding: '1.2rem 0',
  textAlign: 'center',
  cursor: 'pointer',
});

export const cancelButton = style({
  backgroundColor: colors.field04,
  color: colors.text06,
});

export const confirmButton = style({
  backgroundColor: colors.primaryMint,
  color: colors.text01,
});
