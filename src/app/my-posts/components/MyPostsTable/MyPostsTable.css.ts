import { style, globalStyle } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',

  minHeight: '62.2rem',
});

export const headerBar = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const searchInput = style({
  width: '25rem',
});

export const tableWrapper = style({
  width: '100%',
  overflowX: 'auto',

  marginBottom: '2rem',
});

export const noResults = style({
  textAlign: 'center',
  padding: '1.6rem',
  fontSize: '1.4rem',
  color: '#888',
});

export const textAlignLeft = style({
  textAlign: 'left',
  paddingLeft: '0.8rem',
});

globalStyle(`${textAlignLeft} div`, {
  textAlign: 'left',
});

export const textAlignRight = style({
  ...fonts.body.normal.R16,
  color: colors.text04,

  textAlign: 'right',
  paddingRight: '0.8rem',
});

globalStyle(`${textAlignRight} div`, {
  textAlign: 'right',
});

export const tableEmptyViewLayout = style({
  width: '100%',
  margin: '0 auto',
  height: 'calc(100vh - 27.4rem)',

  display: 'flex',
  flexFlow: 'column nowrap',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.8rem',
});

export const emptyTitle = style({
  ...fonts.body.normal.M16,
  color: colors.text04,
  marginTop: '0.8rem',
});
export const emptySubTitle = style({
  ...fonts.label.small.M12,
  color: colors.text04,
  marginBottom: '1.6rem',
});
