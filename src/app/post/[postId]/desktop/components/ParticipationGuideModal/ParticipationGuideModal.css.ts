import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';
import { zIndex } from '@/styles/zIndex';

export const participationGuideContent = recipe({
  base: {
    width: '49rem',
    boxShadow: '0px 4px 16px rgba(53, 59, 61, 0.2)',
    backgroundColor: colors.field01,
    borderRadius: '1.2rem',
    padding: '2rem 3rem 3rem 3.3rem',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    zIndex: zIndex.dialogContent,
  },
  variants: {
    onlyContent: {
      true: {
        gap: 0,
      },
      false: {
        gap: '2rem',
      },
    },
  },
  defaultVariants: {
    onlyContent: true,
  },
});

export const participationModalTitle = style({
  ...fonts.title.medium.B20,
  color: colors.text06,
  marginTop: '1.2rem',
  marginRight: '1.2rem',

  overflowWrap: 'break-word',
});

export const contactInfoRowContainer = style({
  display: 'flex',
  flexDirection: 'row',
  gap: '2.2rem',
  marginBottom: '0.8rem',
  ...fonts.body.normal.M16,
});

export const contactInfoTitle = style({
  width: '7.8rem',
  color: colors.text03,
});

export const contactInfoContent = style({
  color: colors.text06,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '0.6rem',
  maxWidth: '31.5rem',
  whiteSpace: 'normal',
  wordBreak: 'break-all',
});

export const applyMethodContainer = style({
  display: 'flex',
  flexFlow: 'column nowrap',
  justifyContent: 'center',
});

export const warningMessage = style({
  width: 'fit-content',
  marginTop: '1.6rem',
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
  height: '5.2rem',
  backgroundColor: colors.fieldToast,
  color: colors.text01,
  borderRadius: '8rem',
  padding: '1.4rem 2.4rem',
  position: 'fixed',
  top: '0',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: zIndex.toastContent,
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
