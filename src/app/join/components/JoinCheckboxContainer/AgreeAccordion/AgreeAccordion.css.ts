import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const accordionTrigger = style({
  ...fonts.body.normal.M16,
  color: colors.text06,

  width: '100%',

  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  cursor: 'pointer',
});

export const accordionContent = style({
  ...fonts.body.normal.M16,
  color: colors.text06,
  padding: '0.8rem 0',
});

export const accordionChevron = style({
  transition: 'transform 300ms',

  selectors: {
    '[data-state="open"] &': {
      transform: 'rotate(-180deg)',
    },
  },
});
