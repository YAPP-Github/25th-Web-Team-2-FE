import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';

export const toggle = style({
  position: 'relative',
  width: '5rem',
  height: '3rem',
  display: 'flex',
  alignItems: 'center',
  borderRadius: '1.6rem',
  transition: 'background 0.2s',
  cursor: 'pointer',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',

  selectors: {
    '&:disabled': {
      cursor: 'not-allowed',
    },
  },
});

export const switchButton = style({
  position: 'absolute',
  left: '0.2rem',
  top: '0.2rem',
  width: '2.6rem',
  height: '2.6rem',
  borderRadius: '50%',
  backgroundColor: colors.field01,
  transition: 'transform 0.2s',
  boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
});
