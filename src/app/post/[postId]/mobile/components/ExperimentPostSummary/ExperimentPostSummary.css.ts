import { style, globalStyle } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const postSummaryLayout = style({
  height: 'min-content',
  borderRadius: '1.2rem',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',

  paddingBottom: '0.4rem',
});

export const postSummaryContent = style({
  borderCollapse: 'separate',
  borderSpacing: '0 1.4rem',
});

globalStyle(`${postSummaryContent} th`, {
  ...fonts.body.small.M15,
  color: colors.text03,
  width: '6rem',
  textAlign: 'left',
});

globalStyle(`${postSummaryContent} td`, {
  ...fonts.body.normal.M16,
  color: colors.text06,
  textAlign: 'left',
  verticalAlign: 'top',

  paddingLeft: '1.6rem',
});

export const otherConditionWrapper = style({
  ...fonts.body.small.R15,
  color: colors.text05,
  backgroundColor: colors.field02,
  borderRadius: '0.8rem',
  padding: '1.2rem 1.4rem',
  display: 'flex',
  justifyContent: 'left',
  alignItems: 'center',

  marginTop: '-0.8rem',
});

export const participationCount = style({
  position: 'relative',
  marginRight: '1.6rem',
  selectors: {
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: 'calc(100% + 0.8rem)',
      transform: 'translateY(-50%)',
      width: '0.1rem',
      height: '1rem',
      backgroundColor: colors.field08,
    },
  },
});

export const dynamicSpacing = style({
  marginBottom: '-1.4rem',
});
