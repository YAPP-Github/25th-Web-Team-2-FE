import { css, Theme } from '@emotion/react';
import Image from 'next/image';
import { useState, ChangeEvent } from 'react';

import { headingIcon, input } from '../UploadContainer/UploadContainer';

import Icon from '@/components/Icon';
import { colors } from '@/styles/colors';

type Photo = {
  id: string;
  src: string;
  file: File;
};

const DescriptionSection = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const MAX_PHOTOS = 3;

  const uploadPhotos = (e: ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    if (files) {
      const newPhotos = Array.from(files).map((file) => ({
        id: URL.createObjectURL(file),
        src: URL.createObjectURL(file),
        file,
      }));

      if (photos.length + newPhotos.length > MAX_PHOTOS) {
        const allowedPhotos = newPhotos.slice(0, MAX_PHOTOS - photos.length);
        setPhotos((prevPhotos) => [...prevPhotos, ...allowedPhotos]);
      } else {
        setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
      }
    }
  };

  const deletePhoto = (id: string): void => {
    setPhotos((prevPhotos) => prevPhotos.filter((photo) => photo.id !== id));
  };

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
            css={descriptionTextarea(photos.length > 0 ? 8.5 : 0)}
            placeholder="본문을 입력해 주세요"
          />
          {photos.length > 0 && (
            <div css={photoGrid}>
              {photos.map((photo) => (
                <div css={photoWrapper} key={photo.id}>
                  <div css={photoContainer}>
                    <button css={deleteButton} onClick={() => deletePhoto(photo.id)}>
                      <Icon
                        icon="CloseRound"
                        width={20}
                        height={20}
                        color={colors.field09}
                        cursor="pointer"
                        subcolor={colors.field01}
                      />
                    </button>
                    <Image
                      src={photo.src}
                      alt="업로드한 이미지 미리보기"
                      width={80}
                      height={80}
                      style={{ objectFit: 'cover', borderRadius: '1.2rem' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
          <div css={uploadImagesContainer}>
            <label htmlFor="photos" css={addImageContainer}>
              <Icon icon="ImageAdd" width={16} height={16} />
              <p>사진 추가</p>
            </label>
            <input
              type="file"
              id="photos"
              accept="image/*"
              multiple
              onChange={uploadPhotos}
              style={{ display: 'none' }}
            />
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

const descriptionContentContainer = (theme: Theme) =>
  css`
    width: 93.6rem;
    border: 0.1rem solid ${theme.colors.line01};

    border-radius: 1.2rem;

    :focus-within {
      border: 0.1rem solid ${theme.colors.lineTinted};

      > div:last-of-type {
        border-bottom: 0.1rem solid ${theme.colors.line01};
      }
    }
  `;

const descriptionTextarea = (photoGridHeight: number) => (theme: Theme) =>
  css`
    ${theme.fonts.label.large.R14};

    border: none;
    border-top-left-radius: 1.2rem;
    border-top-right-radius: 1.2rem;

    width: 100%;
    height: calc(22rem - ${photoGridHeight}rem);

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

  border-top: 0.1rem solid ${theme.colors.line01};

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
  cursor: pointer;
`;

const photoGrid = css`
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding: 0 1.6rem;
  height: 8rem;

  margin-top: 1rem;
  margin-bottom: 1.4rem;
`;

const photoWrapper = css`
  width: 8rem;
  height: 8rem;

  border-radius: 4px;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const photoContainer = css`
  position: relative;
  width: 8rem;
  height: 8rem;
`;

const deleteButton = css`
  position: absolute;
  top: 0.55rem;
  right: 0.55rem;
  border: none;
  border-radius: 50%;
`;
