import { style, globalStyle } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const postDetailContentLayout = style({
  minWidth: '64.8rem',
  padding: '2.4rem 3rem',
  flex: 1,
  backgroundColor: colors.field01,
  borderRadius: '1.2rem',
});

globalStyle(`${postDetailContentLayout} h3`, {
  ...fonts.title.small.SB18,
  color: colors.text07,
  marginBottom: '2rem',
});

export const postDetailContentWrapper = style({
  ...fonts.body.normal.R16,
  color: colors.text06,
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
});
