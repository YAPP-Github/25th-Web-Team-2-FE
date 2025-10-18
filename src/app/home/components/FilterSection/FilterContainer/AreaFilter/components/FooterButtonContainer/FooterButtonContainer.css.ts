import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const footerButtonContainer = style({
  display: 'flex',
  gap: '0.8rem',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
});

export const infoTextContainer = style({
  display: 'flex',
  gap: '0.4rem',
  alignItems: 'center',
});

export const infoText = style({
  ...fonts.label.medium.R13,
  color: colors.text03,
});

export const buttonContainer = style({
  display: 'flex',
  gap: '0.8rem',
  alignItems: 'center',
});

export const footerButton = style({
  ...fonts.label.large.SB14,
  padding: '0.6rem 1.4rem',
});
