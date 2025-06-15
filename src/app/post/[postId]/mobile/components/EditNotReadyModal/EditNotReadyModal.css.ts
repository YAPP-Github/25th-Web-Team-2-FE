import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';
import { zIndex } from '@/styles/zIndex';

export const editModalOverlay = style({
  background: 'rgba(0, 22, 54, 0.31)',
  position: 'fixed',
  inset: 0,
  zIndex: zIndex.dialogOverlay,
});

export const editModalContent = style({
  width: '92%',
  minWidth: '37rem',

  backgroundColor: colors.field01,
  borderRadius: '1.2rem',
  padding: '3.4rem 1.6rem',

  position: 'fixed',
  top: '50%',
  left: '50%',

  transform: 'translate(-50%, -50%)',
  boxShadow: '0px 4px 16px rgba(53, 59, 61, 0.2)',
  zIndex: zIndex.dialogContent,
  textAlign: 'center',
});

export const editModalCloseButton = style({
  position: 'absolute',
  top: '1.2rem',
  right: '1.2rem',
  cursor: 'pointer',
});

export const editModalImage = style({
  width: '14rem',
  height: 'auto',
  margin: '0 auto 2rem',
});

export const editModalTitle = style({
  ...fonts.body.normal.SB16,
  height: '4.8rem',
  color: colors.text06,
  marginBottom: '0.4rem',
  whiteSpace: 'pre-wrap',
});

export const editModalButtonContainer = style({
  display: 'flex',
  flexDirection: 'column',
});

export const editModalSecondaryButton = style({
  ...fonts.body.normal.R16,
  backgroundColor: 'transparent',
  color: colors.text04,
  marginTop: '1.6rem',
});

export const notReadyButton = style({
  ...fonts.body.normal.SB16,

  width: '100%',
  borderRadius: '1.2rem',
  padding: '1.6rem 0',

  backgroundColor: colors.primaryMint,
  color: colors.text01,

  cursor: 'pointer',
  selectors: {
    '&:disabled': {
      color: colors.text02,
      backgroundColor: colors.field04,
      cursor: 'not-allowed',
    },
  },
});
