import { style } from '@vanilla-extract/css';

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
  borderBottom: '0.1rem solid #ddd',
});

export const tableBody = style({});

export const tableRow = style({
  borderBottom: '0.1rem solid #ddd',
  transition: 'background-color 0.2s',
  selectors: {
    '&:hover': {
      backgroundColor: '#f3f3f3',
    },
  },
});

export const tableHead = style({
  padding: '0.8rem',
  textAlign: 'left',
  fontWeight: 'bold',
  backgroundColor: '#f9f9f9',
  whiteSpace: 'nowrap',
});

export const tableCell = style({
  padding: '0.8rem',
  textAlign: 'left',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const tableFooter = style({
  borderTop: '0.1rem solid #ddd',
  backgroundColor: '#f9f9f9',
  fontWeight: '500',
});

export const tableCaption = style({
  marginTop: '1.6rem',
  fontSize: '0.875rem',
  color: '#888',
  textAlign: 'center',
});
