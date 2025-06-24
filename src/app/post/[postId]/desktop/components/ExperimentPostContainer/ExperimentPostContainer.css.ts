import { style } from '@vanilla-extract/css';

export const postContentLayout = style({
  display: 'flex',
  flexFlow: 'row nowrap',
  gap: '1.2rem',
  marginTop: '2.4rem',
  marginBottom: '6rem',
  borderRadius: '1.2rem',
  position: 'relative',

  '@media': {
    'screen and (max-width: 767px)': {
      display: 'flex',
      flexFlow: 'column nowrap',
    },
  },
});

export const emptyViewLayout = style({
  height: 'calc(100vh - 25rem)',
  display: 'flex',
  flexFlow: 'column nowrap',
  justifyContent: 'center',
  gap: '0.8rem',
  alignItems: 'center',
});
