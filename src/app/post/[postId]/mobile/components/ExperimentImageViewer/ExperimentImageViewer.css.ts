import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';
import { zIndex } from '@/styles/zIndex';

export const viewerOverlay = style({
  position: 'fixed',
  inset: 0,
  backgroundColor: colors.field10,
  zIndex: zIndex.imageViewerModalOverlay,
});

export const slideContainer = style({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  width: '100%',
  height: '100dvh',

  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  zIndex: zIndex.dialogContent,
});

export const slideTrack = style({
  display: 'flex',
  flex: 1,
  touchAction: 'pan-y',
});

export const slideItem = style({
  flex: '0 0 100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  position: 'relative',
});

export const imageStyle = style({
  maxWidth: '100%',
  maxHeight: '100%',
  objectFit: 'contain',
});

export const imageViewerHeader = style({
  position: 'relative',
  width: '100%',
  padding: '1.4rem 1.6rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  color: colors.text01,
});

export const pageCurrent = style({
  ...fonts.title.small.SB18,
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
});
