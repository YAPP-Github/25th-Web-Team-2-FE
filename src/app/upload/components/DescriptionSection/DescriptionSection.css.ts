import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const descriptionSectionLayout = style({
  backgroundColor: colors.field01,
  borderRadius: '1.2rem',
  padding: '3.2rem 2.8rem',
});

export const descriptionFormLayout = style({
  width: '100%',
  display: 'flex',
  flexFlow: 'column nowrap',
  gap: '1.2rem',
});

export const descriptionContentContainer = recipe({
  base: {
    width: '93.6rem',
    border: `0.1rem solid ${colors.line01}`,
    borderRadius: '1.2rem',
    ':focus-within': {
      border: `0.1rem solid ${colors.lineTinted}`,
    },
  },
  variants: {
    isError: {
      true: {
        border: `0.1rem solid ${colors.textAlert}`,
        ':focus-within': {
          border: `0.1rem solid ${colors.textAlert}`,
        },
      },
    },
  },
  defaultVariants: {
    isError: false,
  },
});

export const descriptionTextarea = recipe({
  base: {
    ...fonts.label.large.R14,
    border: 'none',
    borderTopLeftRadius: '1.2rem',
    borderTopRightRadius: '1.2rem',
    width: '100%',
    outline: 'none',
    padding: '1.4rem 1.6rem',
    resize: 'none',
    '::placeholder': {
      color: colors.text02,
    },
  },
  variants: {
    photoGridHeight: {
      withPhotos: {
        height: '16rem',
      },
      withoutPhotos: {
        height: '24rem',
      },
    },
  },
  defaultVariants: {
    photoGridHeight: 'withoutPhotos',
  },
});

export const uploadImagesContainer = style({
  height: '5.6rem',
  display: 'flex',
  flexFlow: 'row nowrap',
  alignItems: 'center',
  gap: '1.2rem',
  padding: '1.2rem 1.6rem',
  borderTop: `0.1rem solid ${colors.line01}`,
});

export const fileInfoText = style({
  ...fonts.label.large.R14,
  color: colors.text02,
});

export const addImageContainer = style({
  ...fonts.label.medium.M13,
  color: colors.text04,
  backgroundColor: colors.field04,
  height: '3.2rem',
  display: 'flex',
  flexFlow: 'row nowrap',
  gap: '0.6rem',
  alignItems: 'center',
  padding: '0.8rem 1.2rem',
  borderRadius: '0.8rem',
  cursor: 'pointer',
});

export const photoGrid = style({
  display: 'flex',
  gap: '10px',
  overflowX: 'auto',
  padding: '0 1.6rem',
  height: '8.5rem',
  marginTop: '1rem',
  marginBottom: '1.4rem',
});

export const photoLayout = style({
  width: '8rem',
  height: '8rem',
  borderRadius: '4px',
  background: 'white',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

export const photoContainer = style({
  position: 'relative',
  width: '8rem',
  height: '8rem',
});

export const deleteButton = style({
  position: 'absolute',
  top: '0.4rem',
  right: '0.4rem',
  border: 'none',
  borderRadius: '50%',
});

export const formMessage = style({
  ...fonts.label.small.M12,
  color: colors.textAlert,
  margin: '0',
  padding: '0.8rem 1.6rem',
});

export const uploadFormSectionTitle = style({
  ...fonts.title.small.SB18,
  display: 'flex',
  flexFlow: 'row nowrap',
  alignItems: 'center',
  gap: '0.8rem',
  marginBottom: '2rem',
});
