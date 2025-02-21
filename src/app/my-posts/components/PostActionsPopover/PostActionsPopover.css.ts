import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';
import { zIndex } from '@/styles/zIndex';

export const postsActionsPopoverContainer = style({
  marginLeft: '-1.6rem',
  height: '2rem',
  verticalAlign: 'middle',
});

export const postsActionsPopoverContent = style({
  backgroundColor: colors.field01,
  borderRadius: '1.2rem',
  boxShadow: '0 0.4rem 0.8rem rgba(0, 0, 0, 0.15)',
  padding: '0.8rem',
  display: 'flex',
  flexDirection: 'column',
  zIndex: zIndex.dialogContent,
});

export const postsActionsPopoverButton = style({
  ...fonts.label.small.M12,
  color: colors.text05,
  border: 'none',
  padding: '0.4rem 1.2rem',
  width: '100%',
  cursor: 'pointer',
  transition: 'background 0.2s',

  borderRadius: '0.8rem',

  selectors: {
    '&:hover': {
      background: colors.field02,
    },
  },
});
