import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { zIndex } from '@/styles/zIndex';

export const backToTopButton = style({
  width: '4.8rem',
  height: '4.8rem',

  backgroundColor: colors.field01,

  borderRadius: '5.143rem',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  boxShadow: '0rem 0.2rem 0.3rem rgba(0, 0, 0, 0.03)',

  cursor: 'pointer',

  position: 'fixed',
  bottom: '2.8rem',
  right: '3rem',

  zIndex: zIndex.backToTopButton,
});
