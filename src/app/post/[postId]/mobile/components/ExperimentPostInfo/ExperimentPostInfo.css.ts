import { globalStyle, style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const experimentPostInfoLayout = style({
  padding: '0.8rem 0',

  display: 'flex',
  flexFlow: 'column nowrap',
  gap: '0.4rem',
});

export const postTitle = style({
  ...fonts.title.medium.B20,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export const postSubInfo = style({
  ...fonts.label.medium.M13,
  color: colors.text03,
  display: 'flex',
  flexDirection: 'row',
  gap: '2rem',
  alignItems: 'center',
});

globalStyle(`${postSubInfo} > div`, {
  position: 'relative',
});

globalStyle(`${postSubInfo} > div:not(:last-child)::after`, {
  content: '""',
  position: 'absolute',
  top: '50%',
  right: '-1.2rem',
  transform: 'translateY(-50%)',
  width: '0.1rem',
  height: '0.8rem',
  backgroundColor: colors.line02,
});
