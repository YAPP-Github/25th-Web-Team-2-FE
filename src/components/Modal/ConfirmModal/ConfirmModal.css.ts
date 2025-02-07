import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';
import { zIndex } from '@/styles/zIndex';

export const confirmContent = style({
  width: '49rem',
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

export const confirmTitleStyle = style({
  ...fonts.title.medium.SB20,
  color: colors.text06,
  textAlign: 'center',
  margin: '0 auto',
  marginBottom: '3.2rem',
  whiteSpace: 'pre-wrap',
  wordBreak: 'keep-all',
});

export const confirmDescriptionStyle = style({
  ...fonts.body.normal.M16,
  marginTop: '0.8rem',
  fontSize: '1.6rem',
});

export const confirmButtonContainer = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  gap: '0.8rem',
});

export const confirmButtonWrapper = style({
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

export const dialogOverlay = style({
  background: 'rgba(0, 22, 54, 0.31)',
  position: 'fixed',
  inset: 0,
  zIndex: zIndex.dialogOverlay,
});

export const closeButton = style({
  cursor: 'pointer',
  position: 'absolute',
  top: '1.2rem',
  right: '1.2rem',
  textAlign: 'right',
});
