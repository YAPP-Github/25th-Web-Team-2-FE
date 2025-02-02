import { style } from '@vanilla-extract/css';

import { zIndex } from '@/styles/zIndex';

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
