import { globalStyle, style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const tableContainer = style({
  width: '100%',
  overflow: 'auto',
  position: 'relative',
});

export const table = style({
  width: '100%',
  borderCollapse: 'collapse',
  tableLayout: 'fixed',
});

export const tableHeader = style({
  backgroundColor: colors.field02,
  borderBottom: `0.1rem solid ${colors.line01}`,
});

export const tableBody = style({});

export const tableRow = style({
  height: '5rem',
  transition: 'background-color 0.2s',
});

globalStyle('thead tr', {
  height: '3.8rem !important',
});

globalStyle('tr:hover', {
  backgroundColor: colors.field02,
});

globalStyle('tr:hover td:first-child', {
  borderTopLeftRadius: '1.2rem',
  borderBottomLeftRadius: '1.2rem',
});

globalStyle('tr:hover td:last-child', {
  borderTopRightRadius: '1.2rem',
  borderBottomRightRadius: '1.2rem',
});

export const tableHead = style({
  ...fonts.label.large.M14,
  color: colors.text02,
  verticalAlign: 'middle',
});

export const tableCell = style({
  ...fonts.title.small.M18,
  padding: '0 1.6rem',

  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',

  height: '5rem',
  verticalAlign: 'middle',
});
