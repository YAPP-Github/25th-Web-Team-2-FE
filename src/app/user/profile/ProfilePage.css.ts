import { style } from '@vanilla-extract/css';

export const profileLayout = style({
  display: 'flex',
  width: '56rem',
  margin: '0 auto',
  minHeight: 'calc(100vh - 12.2rem)',
});

export const joinLayout = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2.2rem',
  paddingTop: '6rem',
  flexGrow: 1,
});
