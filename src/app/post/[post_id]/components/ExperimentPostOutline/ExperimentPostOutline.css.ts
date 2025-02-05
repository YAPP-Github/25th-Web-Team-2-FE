import { style, globalStyle } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const postOutlineLayout = style({
  minWidth: '34rem',
  maxWidth: '44rem',
  height: 'min-content',
  maxHeight: '60rem',
  borderRadius: '1.2rem',
  backgroundColor: colors.field01,
  position: 'sticky',
  top: '12rem',
  padding: '2.4rem 3rem 0 3rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

export const postOutlineTitle = style({
  ...fonts.title.small.SB18,
  color: colors.text07,
  position: 'sticky',
  top: 0,
  backgroundColor: colors.field01,
  paddingBottom: '1.6rem',
});

export const postOutlineContent = style({
  width: '100%',
  tableLayout: 'fixed',
  borderCollapse: 'separate',
  borderSpacing: '1.6rem 1.2rem',
  marginLeft: '-1.6rem',
  overflowY: 'hidden',
});

globalStyle(`${postOutlineContent} th`, {
  ...fonts.body.normal.R16,
  color: colors.text03,
  width: '6rem',
  textAlign: 'left',
  verticalAlign: 'top',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  wordWrap: 'break-word',
});

globalStyle(`${postOutlineContent} td`, {
  ...fonts.body.normal.M16,
  color: colors.text06,
  whiteSpace: 'nowrap',
  width: '20.4rem',
  textAlign: 'left',
  verticalAlign: 'top',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  wordWrap: 'break-word',
});

export const scrollableContent = style({
  flex: 1,
  position: 'relative',
  overflowY: 'auto',
  overflowX: 'hidden',
});

export const divider = style({
  width: '100%',
  height: '0.1rem',
  backgroundColor: colors.line02,
  margin: '1.2rem 0',
});

export const otherConditionWrapper = style({
  ...fonts.label.large.R14,
  color: colors.text05,
  backgroundColor: colors.field02,
  borderRadius: '0.8rem',
  width: '28rem',
  padding: '1.2rem 1.4rem',
  display: 'flex',
  justifyContent: 'left',
  alignItems: 'center',
});

export const participationCount = style({
  position: 'relative',
  marginRight: '3.2rem',
  selectors: {
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: 'calc(100% + 1.6rem)',
      transform: 'translateY(-50%)',
      width: '0.1rem',
      height: '1rem',
      backgroundColor: colors.field08,
    },
  },
});

export const buttonContainer = style({
  width: '34rem',
  height: '8.8rem',
  position: 'sticky',
  bottom: 0,
  padding: '0 3rem',
  marginLeft: '-3rem',
  backgroundColor: colors.field01,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderBottomLeftRadius: '1.2rem',
  borderBottomRightRadius: '1.2rem',
});

export const checkButton = recipe({
  base: {
    ...fonts.body.normal.SB16,
    width: '100%',
    height: '4rem',
    borderRadius: '1.2rem',
    backgroundColor: colors.field09,
    color: colors.text01,
    cursor: 'pointer',
  },
  variants: {
    disabled: {
      true: {
        backgroundColor: colors.field04,
        color: colors.text03,
        cursor: 'not-allowed',
      },
      false: {},
    },
  },
  defaultVariants: {
    disabled: false,
  },
});

export const textWrapRow = style({
  height: 'auto',
  maxHeight: '4.8rem',
});

globalStyle(`${textWrapRow} p`, {
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  wordBreak: 'break-word',
  whiteSpace: 'normal',
});

export const dynamicSpacing = style({
  marginBottom: '-1.6rem',
});
