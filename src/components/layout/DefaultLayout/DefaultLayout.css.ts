import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';

export const defaultLayoutContainer = style({
  background: `linear-gradient(to bottom, ${colors.field01} 0%, ${colors.field01} 8%, ${colors.field02} 13%, ${colors.field02} 100%)`,

  paddingBottom: '5.6rem',
  minHeight: 'calc(100vh - 12.2rem)',
});

export const defaultLayout = style({
  width: '100rem',
  margin: '0 auto',
});
