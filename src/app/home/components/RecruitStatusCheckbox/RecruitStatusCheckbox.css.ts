import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const recruitCheckLabel = style({
  ...fonts.label.large.SB14,
  color: colors.text06,
});

export const recruitCheckWrapper = style({
  gridArea: 'checkbox',
  display: 'flex',
  alignItems: 'center',

  '@media': {
    'screen and (max-width: 767px)': {
      padding: '0.4rem 1.6rem',
      justifyContent: 'flex-end',
    },
  },
});
