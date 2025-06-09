import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const tabsRoot = style({
  display: 'flex',
  flexFlow: 'column nowrap',
});

export const tabList = style({
  display: 'flex',
  flexFlow: 'row nowrap',
  height: '5.6rem',
});

export const tabTrigger = style({
  ...fonts.body.normal.SB16,
  width: '100%',
  padding: '1.2rem 1.6rem',
  cursor: 'pointer',
  borderBottom: '0.2rem solid transparent',
  transition: 'color 0.2s, border-color 0.2s',
  selectors: {
    '&[data-state="active"]': {
      color: colors.text07,
      borderBottomColor: colors.text07,
    },
    '&[data-state="inactive"]': {
      color: colors.text03,
      borderBottomColor: colors.line01,
    },
  },
});

export const tabContent = style({
  ...fonts.body.small.M15,
  // R15 추가해야함
  padding: '1.6rem 0',
});
