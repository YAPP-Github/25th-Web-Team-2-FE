import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';
import { zIndex } from '@/styles/zIndex';

export const dialogContent = style({
  width: '49rem',
  boxShadow: '0px 4px 16px rgba(53, 59, 61, 0.2)',
  backgroundColor: colors.field01,
  borderRadius: '1.2rem',
  padding: '2rem 3rem 3rem 3.3rem',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  zIndex: zIndex.dialogContent,
});

export const dialogTitle = style({
  ...fonts.title.medium.SB20,
  color: colors.text06,
  marginTop: '1.2rem',
  marginRight: '1.2rem',
});

export const infoRow = style({
  display: 'flex',
  flexDirection: 'row',
  gap: '2.2rem',
  marginBottom: '0.8rem',
  ...fonts.body.normal.M16,
});

export const infoTitle = style({
  width: '7.8rem',
  color: colors.text03,
});

export const infoContent = style({
  color: colors.text06,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '0.6rem',
});

export const warning = style({
  width: 'fit-content',
  marginTop: '1.6rem',
  padding: '0.4rem 1.2rem',
  borderRadius: '1.2rem',
  backgroundColor: colors.fieldAlert,
  color: colors.textAlert,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '0.6rem',
  ...fonts.label.small.M12,
});

export const toastLayout = style({
  height: '5.2rem',
  backgroundColor: colors.field01,
  color: colors.text06,
  boxShadow: '0px 4px 16px rgba(53, 59, 61, 0.2)',
  borderRadius: '8rem',
  padding: '1.4rem 2.4rem',
  position: 'fixed',
  top: '0',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: zIndex.toastContent,
});

export const toastTitle = style({
  ...fonts.body.normal.SB16,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '1rem',
  width: 'max-content',
});

export const toastViewport = style({
  position: 'fixed',
  top: '6rem',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: zIndex.toastViewport,
});
