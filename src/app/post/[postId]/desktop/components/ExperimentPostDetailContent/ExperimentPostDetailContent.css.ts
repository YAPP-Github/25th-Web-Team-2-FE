import { style, globalStyle } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';
import { zIndex } from '@/styles/zIndex';

export const postDetailContentLayout = style({
  minWidth: '64.8rem',
  padding: '2.4rem 3rem',
  flex: 1,
  backgroundColor: colors.field01,
  borderRadius: '1.2rem',

  '@media': {
    'screen and (max-width: 1023px)': {
      minWidth: '36rem',
    },
  },
});

globalStyle(`${postDetailContentLayout} h3`, {
  ...fonts.title.small.SB18,
  color: colors.text07,
  marginBottom: '2rem',
});

export const postDetailContentWrapper = style({
  ...fonts.body.normal.R16,
  color: colors.text06,
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
});

export const imageContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1.6rem',

  marginTop: '3rem',

  '@media': {
    'screen and (max-width: 1023px)': {
      overflowY: 'auto',
      display: 'flex',
      alignItems: 'start',
    },
  },
});

export const singleImageWrapper = style({
  position: 'relative',
  maxWidth: '58.8rem',
  maxHeight: '58.8rem',
  width: '100%',
  aspectRatio: '1',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '1.2rem',
  overflow: 'hidden',
});

export const maximizeIcon = style({
  position: 'absolute',
  top: '1rem',
  right: '1rem',
  cursor: 'pointer',
  zIndex: 10,
});

export const multiImageGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 18.5rem)',
  gap: '1.6rem',

  '@media': {
    'screen and (max-width: 767px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
  },
});

export const imageItem = style({
  maxWidth: '18.5rem',
  maxHeight: '18.5rem',
  width: '100%',
  aspectRatio: '1',

  borderRadius: '1.2rem',
  overflow: 'hidden',

  position: 'relative',

  '@media': {
    'screen and (max-width: 767px)': {
      minWidth: '14.5rem',
      minHeight: '14.5rem',
    },
  },
});

export const modalOverlay = style({
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0, 22, 54, 0.31)',
  zIndex: zIndex.imageViewerModalOverlay,
});

export const modalContent = style({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '64.8rem',
  height: '64.8rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#fff',
  boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)',
  borderRadius: '1.2rem',
  zIndex: zIndex.imageViewerModalContent,

  border: `0.1em solid ${colors.fieldToast}`,

  '@media': {
    'screen and (max-width: 1023px)': {
      width: 'calc(100% - 20rem)',
    },

    'screen and (max-width: 767px)': {
      width: 'calc(100% - 6rem)',
      maxHeight: '40rem',
    },
  },
});

export const closeButton = style({
  position: 'absolute',
  top: '0',
  right: '-3.6rem',
  cursor: 'pointer',
  zIndex: zIndex.imageViewerModalCloseButton,

  '@media': {
    'screen and (max-width: 1023px)': {
      top: '2rem',
      right: '2rem',
    },

    'screen and (max-width: 767px)': {
      top: '2rem',
      right: '2rem',
    },
  },
});
