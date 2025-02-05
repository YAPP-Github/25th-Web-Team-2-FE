import { style } from '@vanilla-extract/css';

export const pagination = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.8rem',
  margin: '0 auto',
  width: '100%',
});

export const paginationContent = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '0.4rem',
});

export const paginationItem = style({
  listStyle: 'none',
});

export const paginationLink = style({
  padding: '0.8rem 1.2rem',
  borderRadius: '0.4rem',
  textDecoration: 'none',
  fontSize: '1.4rem',
  cursor: 'pointer',
  selectors: {
    '&:hover': {
      backgroundColor: '#f3f3f3',
    },
  },
});

export const active = style({
  fontWeight: 'bold',
  backgroundColor: '#ddd',
});

export const paginationPrevious = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
});

export const paginationNext = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
});

export const paginationEllipsis = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '3.2rem',
  height: '3.2rem',
});

export const icon = style({
  width: '1.6rem',
  height: '1.6rem',
});
