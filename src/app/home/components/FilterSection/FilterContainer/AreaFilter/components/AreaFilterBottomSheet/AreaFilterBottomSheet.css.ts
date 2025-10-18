import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const areaFilterBottomSheetContainer = style({
  display: 'flex',
  flexDirection: 'column',
});

export const contentWrapper = style({
  backgroundColor: colors.field02,
  borderRadius: '1.2rem',
  display: 'flex',
});

export const footerButtonContainer = style({
  display: 'flex',
  gap: '1rem',
  paddingTop: '1.6rem',
});

export const resetButton = style({
  ...fonts.body.normal.SB16,
  padding: '1.6rem 0',
  borderRadius: '1.2rem',
  flexBasis: '30%',
});

export const saveButton = style({
  ...fonts.body.normal.SB16,
  padding: '1.6rem 0',
  borderRadius: '1.2rem',
  flexBasis: '70%',
});

export const verticalLine = style({
  position: 'relative',
  selectors: {
    '&::after': {
      content: '""',
      width: '0.1rem',
      height: '100%',
      position: 'absolute',
      top: '50%',
      right: '0',
      transform: 'translateY(-50%)',
      backgroundColor: colors.line01,
    },
    '&:last-child::after': {
      display: 'none',
    },
  },
});
