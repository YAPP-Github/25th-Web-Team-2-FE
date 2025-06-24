import { style } from '@vanilla-extract/css';

export const emptyLayout = style({
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  height: '100vh',
  background: 'linear-gradient(to bottom, #FFFFFF 0%, #FFFFFF 6%, #F6F8F9 12%, #F6F8F9 100%)',
});
