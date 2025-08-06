import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const commonStatusLayout = style({
  minHeight: 'calc(100dvh - 12.2rem)',

  display: 'flex',
  flexFlow: 'column nowrap',
  justifyContent: 'center',
  gap: '0.8rem',
  alignItems: 'center',
});

export const commonStatusText = style({
  ...fonts.label.small.M12,
  color: colors.text04,
  marginBottom: '1.6rem',
  textAlign: 'center',
});
