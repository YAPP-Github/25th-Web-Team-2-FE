import { style } from '@vanilla-extract/css';

export const backHeaderWrapper = style({
  display: 'grid',
  gridTemplateColumns: '24px 1fr 24px',
  alignItems: 'center',
  justifyItems: 'center',
  padding: '1.2rem 1.6rem',
  height: '5.4rem',
});
