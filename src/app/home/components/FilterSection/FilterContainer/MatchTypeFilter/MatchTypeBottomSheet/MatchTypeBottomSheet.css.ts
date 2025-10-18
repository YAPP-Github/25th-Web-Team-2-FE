import { style } from '@vanilla-extract/css';

import { fonts } from '@/styles/fonts.css';

export const matchOptionList = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '0 0.4rem 1.6rem 0.4rem',
});

export const matchOptionItem = style({
  ...fonts.body.small.M15,
  width: '100%',
  height: '5.2rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  transition: 'all 0.3s ease',
});
