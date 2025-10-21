import { style, styleVariants } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const uploadLayout = style({
  display: 'flex',
  flexFlow: 'column nowrap',
  gap: '4rem',
  color: colors.text06,
  marginTop: '1.6rem',

  paddingBottom: '12.2rem', // footer
});

export const headerTitle = style({
  ...fonts.title.large.SB24,

  '@media': {
    'screen and (max-width: 767px)': {
      marginLeft: '2.8rem',
    },
  },
});

export const headerSubTitle = style({
  ...fonts.label.large.R14,
  color: colors.text03,

  '@media': {
    'screen and (max-width: 767px)': {
      marginLeft: '2.8rem',
    },
  },
});

export const uploadFormSectionTitle = style({
  ...fonts.title.small.SB18,
  display: 'flex',
  flexFlow: 'row nowrap',
  alignItems: 'center',
  gap: '0.8rem',
  marginBottom: '2rem',
});

export const uploadContentLayout = style({
  display: 'flex',
  flexFlow: 'column nowrap',
});

export const uploadSectionLayout = style({
  backgroundColor: colors.field01,
  borderRadius: '1.2rem',
  padding: '2.8rem 2.8rem',

  marginTop: '4.8rem',
});

export const buttonContainer = style({
  ...fonts.body.normal.B16,
  width: '100%',
  height: '4rem',
  display: 'flex',
  flexFlow: 'row nowrap',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1.2rem',
});

export const buttonVariants = styleVariants({
  active: {
    color: colors.text06,
    backgroundColor: colors.field04,
    borderRadius: '1.2rem',
    padding: '0.8rem 1.6rem',
  },
  upload: {
    color: colors.text01,
    backgroundColor: colors.field09,
    borderRadius: '1.2rem',
    padding: '0.8rem 1.6rem',
  },
});

export const outlineFormLayout = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gridTemplateRows: '10.2rem 10.2rem 21.4rem',
  gridColumnGap: '3.2rem',
  gridRowGap: '2.8rem',
  margin: '0 auto',
});

export const ReferToDetailsContainer = style({
  ...fonts.label.small.M12,
  color: colors.text04,
  marginTop: '0.4rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.2rem',
  justifyContent: 'right',
});

export const headingIcon = style({
  ...fonts.label.small.SB12,
  width: '1.8rem',
  height: '1.8rem',
  borderRadius: '50%',
  textAlign: 'center',
  padding: '0.2rem',
  backgroundColor: colors.primaryMint,
  color: colors.text01,
});

export const label = style({
  ...fonts.label.large.M14,
  color: colors.text05,
  marginBottom: '0.8rem',
  display: 'block',
});
