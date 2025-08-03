import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';
import { zIndex } from '@/styles/zIndex';

export const participationGuideBottomSheetLayout = style({
  marginTop: '0.8rem',
  minWidth: '3.7rem',
});

export const bottomSheetTitle = style({
  ...fonts.title.small.SB18,
  color: colors.text06,

  marginBottom: '1.2rem',
});

export const contactInfoRowContainer = style({
  display: 'flex',
  flexDirection: 'row',
  gap: '2.2rem',
  marginBottom: '0.8rem',
  ...fonts.body.normal.M16,
});

export const contactInfoTitle = style({
  ...fonts.label.large.M14,
  width: '3.7rem',
  minWidth: 'fit-content',
  color: colors.text03,
});

export const contactInfoContent = style({
  ...fonts.label.large.M14,
  color: colors.text06,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '0.6rem',
  whiteSpace: 'normal',
  wordBreak: 'break-all',
});

export const applyMethodContainer = style({
  display: 'flex',
  flexFlow: 'column nowrap',
  justifyContent: 'center',

  marginBottom: '1.6rem',
});

export const warningMessage = style({
  width: 'fit-content',
  marginTop: '0.8rem',
  padding: '0.4rem 1.2rem',
  borderRadius: '1.2rem',
  backgroundColor: colors.fieldAlert,
  color: colors.textAlert,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '0.6rem',
  ...fonts.label.small.M12,
});

export const copyToastLayout = style({
  ...fonts.body.small.SB15,
  height: '4.4rem',
  backgroundColor: colors.field01,
  color: colors.text06,
  borderRadius: '8rem',
  padding: '1.4rem 2.4rem',
  display: 'flex',
  alignItems: 'center',

  boxShadow: '0px 4px 16px rgba(53, 59, 61, 0.2)',
});

export const copyToastTitle = style({
  ...fonts.body.normal.SB16,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '1rem',
  width: 'max-content',
});

export const copyToastViewport = style({
  position: 'fixed',
  top: '6rem',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: zIndex.toastViewport,
});

export const emptyView = style({
  ...fonts.body.normal.M16,
  display: 'flex',
  flexFlow: 'row nowrap',
  alignItems: 'center',
  gap: '2rem',
  height: '8rem',
  padding: '0 1.8rem',
});
