import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

/** ✅ 설명 폼 레이아웃 */
export const descriptionFormLayout = style({
  width: '100%',
  display: 'flex',
  flexFlow: 'column nowrap',
  gap: '1.2rem',
});

/** ✅ 전체 입력 필드 컨테이너 */
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

/** ✅ 본문 텍스트 영역 */
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
        height: 'calc(22rem - 8.5rem)',
      },
      withoutPhotos: {
        height: '22rem',
      },
    },
  },
  defaultVariants: {
    photoGridHeight: 'withoutPhotos',
  },
});

/** ✅ 업로드 이미지 컨테이너 */
export const uploadImagesContainer = style({
  height: '5.6rem',
  display: 'flex',
  flexFlow: 'row nowrap',
  alignItems: 'center',
  gap: '1.2rem',
  padding: '1.2rem 1.6rem',
  borderTop: `0.1rem solid ${colors.line01}`,
});

/** ✅ 추가 이미지 버튼 */
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

/** ✅ 사진 그리드 */
export const photoGrid = style({
  display: 'flex',
  gap: '10px',
  overflowX: 'auto',
  padding: '0 1.6rem',
  height: '8rem',
  marginTop: '1rem',
  marginBottom: '1.4rem',
});

/** ✅ 개별 사진 레이아웃 */
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

/** ✅ 개별 사진 컨테이너 */
export const photoContainer = style({
  position: 'relative',
  width: '8rem',
  height: '8rem',
});

/** ✅ 사진 삭제 버튼 */
export const deleteButton = style({
  position: 'absolute',
  top: '0.4rem',
  right: '0.4rem',
  border: 'none',
  borderRadius: '50%',
});

/** ✅ 폼 메시지 */
export const formMessage = style({
  ...fonts.label.small.M12,
  color: colors.textAlert,
  margin: '0',
  padding: '0.8rem 1.6rem',
});

/** ✅ 업로드 폼 섹션 제목 */
export const uploadFormSectionTitle = style({
  ...fonts.title.small.SB18,
  display: 'flex',
  flexFlow: 'row nowrap',
  alignItems: 'center',
  gap: '0.8rem',
  marginBottom: '2rem',
});

/** ✅ 아이콘 컨테이너 */
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

/** ✅ 업로드 입력 필드 */
export const uploadInput = recipe({
  base: {
    ...fonts.label.large.R14,
    width: '100%',
    maxWidth: '45.2rem',
    height: '4.8rem',
    padding: '10px',
    borderRadius: '1.2rem',
    outline: 'none',
    border: `0.1rem solid ${colors.line01}`,
    '::placeholder': {
      color: colors.text02,
    },
    ':focus': {
      outline: `0.1rem solid ${colors.lineTinted}`,
      outlineOffset: '0',
      border: 'none',
    },
  },
  variants: {
    isError: {
      true: {
        border: `0.1rem solid ${colors.textAlert}`,
      },
    },
  },
  defaultVariants: {
    isError: false,
  },
});
