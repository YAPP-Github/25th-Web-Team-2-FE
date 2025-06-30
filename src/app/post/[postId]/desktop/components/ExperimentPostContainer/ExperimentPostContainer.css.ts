import { style } from '@vanilla-extract/css';

export const postContentLayout = style({
  display: 'flex',
  flexFlow: 'row nowrap',
  gap: '1.2rem',
  marginTop: '2.4rem',
  marginBottom: '6rem',
  borderRadius: '1.2rem',
  position: 'relative',
  paddingBottom: '8.4rem',

  '@media': {
    'screen and (max-width: 767px)': {
      display: 'flex',
      flexFlow: 'column nowrap',
      paddingBottom: '0',
    },
  },
});

export const emptyViewLayout = style({
  minHeight: '100vh',

  display: 'flex',
  flexFlow: 'column nowrap',
  justifyContent: 'center',
  gap: '0.8rem',
  alignItems: 'center',
});
