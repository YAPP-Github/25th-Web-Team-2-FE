import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const ageFormContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
  position: 'relative',
  width: '100%',
});

export const ageInput = style({
  ...fonts.label.large.R14,
  width: '100%',
  height: '2.2rem',
  textAlign: 'center',
  border: 'none',
  outline: 'none',

  '::placeholder': {
    color: colors.text02,
  },

  '@media': {
    'screen and (max-width: 767px)': {
      width: '100%',
    },
  },
});
