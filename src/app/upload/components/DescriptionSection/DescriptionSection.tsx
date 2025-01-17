import { css, Theme } from '@emotion/react';

import { headingIcon, input } from '../UploadContainer/UploadContainer';

import Icon from '@/components/Icon';

const DescriptionSection = () => {
  return (
    <div css={descriptionLayout}>
      <h3>
        <span css={headingIcon}>2</span>어떤 실험인가요?
      </h3>

      <div css={descriptionFormLayout}>
        <input
          css={[input, fullInput]}
          type="text"
          id="post-title"
          placeholder="실험 제목을 입력해 주세요"
        />

        <div css={descriptionContentContainer}>
          <textarea
            name="description"
            id="description"
            css={descriptionTextarea}
            placeholder="본문을 입력해 주세요"
          />
          <div css={uploadImagesContainer}>
            <button type="button" css={addImageContainer}>
              <Icon icon="ImageAdd" width={16} height={16} />
              <p>사진 추가</p>
            </button>
            <p>jpg, png 최대 3장까지 첨부할 수 있어요</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionSection;

export const descriptionLayout = css`
  height: 45.4rem;
`;

export const descriptionFormLayout = css`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  gap: 1.2rem;
`;

export const fullInput = css`
  max-width: 93.6rem;
`;

const descriptionContentContainer = (theme: Theme) => css`
  width: 93.6rem;
  height: 27.6rem;

  border: 0.1rem solid ${theme.colors.line01};
  border-radius: 1.2rem;

  :focus-within {
    border: 0.1rem solid ${theme.colors.lineTinted};

    > div:last-of-type {
      border: none;
    }
  }
`;

const descriptionTextarea = (theme: Theme) => css`
  ${theme.fonts.label.large.R14};

  border: none;
  border-bottom: 0.1rem solid ${theme.colors.line01};
  border-top-left-radius: 1.2rem;
  border-top-right-radius: 1.2rem;

  width: 100%;
  height: 22rem;

  outline: none;

  padding: 1.4rem 1.6rem;

  resize: none;

  &::placeholder {
    color: ${theme.colors.text02};
  }
`;

const uploadImagesContainer = (theme: Theme) => css`
  height: 5.6rem;

  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 1.2rem;

  padding: 1.2rem 1.6rem;

  p {
    ${theme.fonts.label.large.R14};
    color: ${theme.colors.text02};
  }
`;

const addImageContainer = (theme: Theme) => css`
  ${theme.fonts.label.medium.M13};
  color: ${theme.colors.text04};

  background-color: ${theme.colors.field04};

  height: 3.2rem;

  display: flex;
  flex-flow: row nowrap;
  gap: 0.6rem;
  align-items: center;

  padding: 0.8rem 1.2rem;

  border-radius: 0.8rem;
`;
