import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const modalContent = style({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  width: '32rem',
  borderRadius: '1.2rem',
  padding: '2.6rem 2rem 2.2rem 2rem',

  textAlign: 'center',
  backgroundColor: colors.field01,

  display: 'flex',
  flexDirection: 'column',
  gap: '2em',
});

export const dialogOverlay = style({
  backgroundColor: colors.fieldDim,
  position: 'fixed',
  inset: 0,
});

export const closeButton = style({
  position: 'absolute',
  top: '1.6rem',
  right: '1.6rem',
});

export const modalTitleContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
});

export const modalTitle = style({
  ...fonts.title.small.SB18,
  color: colors.text06,
  whiteSpace: 'pre-wrap',
});

export const modalDescription = style({
  ...fonts.label.large.R14,
  color: colors.text03,
  textAlign: 'center',
  whiteSpace: 'pre-wrap',
});

export const modalButtonContainer = style({
  display: 'flex',
  gap: '1.2rem',
});
