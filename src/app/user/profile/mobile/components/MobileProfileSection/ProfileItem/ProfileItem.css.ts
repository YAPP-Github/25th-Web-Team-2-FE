import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const profileItemWrapper = style({
  ...fonts.body.small.M15,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1.6rem 0',
  gap: '2rem',

  ':active': {
    backgroundColor: colors.field02,
  },
});

export const itemTitleWrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
  whiteSpace: 'nowrap',
});

export const itemTitle = style({
  color: colors.text06,
});

export const itemLabelWrapper = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
});

export const itemLabel = style({
  color: colors.text03,
  display: '-webkit-box',
  WebkitLineClamp: 1,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  wordBreak: 'break-word',
});
