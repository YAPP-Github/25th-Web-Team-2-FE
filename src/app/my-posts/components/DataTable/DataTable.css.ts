import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6rem',
  padding: '1.6rem',
});

export const headerBar = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBottom: '0.8rem',
});

export const searchInput = style({
  width: '25rem',
});

export const tableWrapper = style({
  width: '100%',
  overflowX: 'auto',
});

export const noResults = style({
  textAlign: 'center',
  padding: '1.6rem',
  fontSize: '1.4rem',
  color: '#888',
});
