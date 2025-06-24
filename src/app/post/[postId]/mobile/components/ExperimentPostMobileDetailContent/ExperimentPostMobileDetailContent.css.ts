import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const postMobileDetailContentLayout = style({
  backgroundColor: colors.field01,
});

export const postMobileDetailContentWrapper = style({
  ...fonts.body.small.R15,
  color: colors.text06,
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',

  paddingBottom: '2rem',
});

export const imageContainer = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});

export const singleImageWrapper = style({
  position: 'relative',

  height: '37rem',
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
});

export const multiImageGrid = style({
  width: '100%',
  display: 'grid',
  gap: '1.2rem',
  gridTemplateColumns: 'repeat(3, 1fr)',

  '@media': {
    'screen and (max-width: 767px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    'screen and (max-width: 375px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const singleImageItem = style({
  minHeight: '17.9rem',
  aspectRatio: '1 / 1',
  position: 'relative',
  borderRadius: '1.2rem',
  overflow: 'hidden',

  border: `0.1rem solid ${colors.line01}`,
});
