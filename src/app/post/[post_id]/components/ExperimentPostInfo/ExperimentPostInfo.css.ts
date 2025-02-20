import { style, globalStyle } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const postInfoLayout = style({
  marginTop: '1.6rem',
  width: '100%',
  height: '6rem',
});

globalStyle(`${postInfoLayout} h2`, {
  ...fonts.title.large.SB24,
});

export const postSubInfo = style({
  ...fonts.label.large.M14,
  color: colors.text03,
  marginTop: '0.6rem',
  display: 'flex',
  flexDirection: 'row',
  gap: '1.6rem',
  position: 'relative',
});

globalStyle(`${postSubInfo} > div`, {
  position: 'relative',
});

globalStyle(`${postSubInfo} > div:not(:last-child)::after`, {
  content: '""',
  position: 'absolute',
  top: '50%',
  right: '-0.8rem',
  transform: 'translateY(-50%)',
  width: '0.1rem',
  height: '0.8rem',
  backgroundColor: colors.line02,
});

export const viewsContainer = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '0.3rem',
});

export const postHeaderContainer = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const buttonStyles = style({
  ...fonts.label.large.M14,
  color: colors.text03,
  cursor: 'pointer',
});
