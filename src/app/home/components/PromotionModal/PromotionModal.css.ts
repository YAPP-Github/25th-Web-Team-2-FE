import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { zIndex } from '@/styles/zIndex';

export const dialogOverlay = style({
  background: 'rgba(0, 22, 54, 0.31)',
  position: 'fixed',
  inset: 0,
  zIndex: zIndex.dialogOverlay,
});

export const promotionModalContent = style({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: colors.field01,
  borderRadius: '1.2rem',
  padding: '3.2rem',
  boxShadow: '0px 4px 16px rgba(53, 59, 61, 0.2)',
  zIndex: zIndex.dialogContent,
});

export const modalContainer = style({
  borderRadius: '1.6rem',
  padding: '2.4rem',
  maxWidth: '80%',
  maxHeight: '80vh',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6rem',
});

export const closeButtonContainer = style({
  display: 'flex',
  justifyContent: 'flex-end',
});

export const imageContainer = style({
  position: 'relative',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const indicatorContainer = style({
  display: 'flex',
  justifyContent: 'center',
  gap: '0.8rem',
});

export const indicator = style({
  width: '0.8rem',
  height: '0.8rem',
  borderRadius: '50%',
  cursor: 'pointer',
  transition: 'background-color 200ms',
});
