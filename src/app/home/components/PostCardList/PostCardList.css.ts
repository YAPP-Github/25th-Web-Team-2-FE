import { style } from '@vanilla-extract/css';

export const postCardListLayout = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  gap: '1.2rem',
});
