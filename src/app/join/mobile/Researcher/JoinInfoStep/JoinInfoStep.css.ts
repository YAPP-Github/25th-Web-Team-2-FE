import { style } from '@vanilla-extract/css';

export const joinContentContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.4rem',
  paddingBottom: '7.2rem', // 버튼(5.6rem) + 여백(1.6rem)
});
