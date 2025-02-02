import Image from 'next/image';
import { useState, ChangeEvent } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import {
  addImageContainer,
  deleteButton,
  descriptionContentContainer,
  descriptionFormLayout,
  descriptionTextarea,
  formMessage,
  photoContainer,
  photoGrid,
  photoLayout,
  uploadFormSectionTitle,
  uploadImagesContainer,
} from './DescriptionSection.css';
import InputForm from '../InputForm/InputForm';
import { headingIcon, uploadSectionLayout } from '../UploadContainer/UploadContainer.css';

import Icon from '@/components/Icon';
import { UploadExperimentPostSchemaType } from '@/schema/upload/uploadExperimentPostSchema';
import { colors } from '@/styles/colors';

type Photo = {
  id: string;
  src: string;
  file: File;
};

const DescriptionSection = () => {
  const { control, formState } = useFormContext<UploadExperimentPostSchemaType>();
  const contentError = formState.errors.content;

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

  const onDragStart = (e: React.DragEvent<HTMLDivElement>, index: number): void => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('photoIndex', String(index));
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>, targetIndex: number): void => {
    e.preventDefault();
    const sourceIndex = Number(e.dataTransfer.getData('photoIndex'));

    if (sourceIndex === targetIndex) return;

    const updatedPhotos = [...photos];
    const [movedPhoto] = updatedPhotos.splice(sourceIndex, 1);
    updatedPhotos.splice(targetIndex, 0, movedPhoto);

    setPhotos(updatedPhotos);
  };

  return (
    <div className={uploadSectionLayout}>
      {/* 제목 영역 */}
      <h3 className={uploadFormSectionTitle}>
        <span className={headingIcon}>2</span>어떤 실험인가요?{' '}
        <span style={{ color: colors.textAlert }}>*</span>
      </h3>

      <div className={descriptionFormLayout}>
        {/* 실험 제목 */}
        <Controller
          name="title"
          control={control}
          render={({ field, fieldState }) => (
            <InputForm
              {...field}
              type="text"
              id="title"
              placeholder="실험 제목을 입력해 주세요"
              field={field}
              fieldState={fieldState}
              size="full"
            />
          )}
        />

        <div className={descriptionContentContainer({ isError: !!contentError })}>
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <>
                <textarea
                  {...field}
                  id="content"
                  className={descriptionTextarea({
                    photoGridHeight: photos.length > 0 ? 'withPhotos' : 'withoutPhotos',
                  })}
                  placeholder="본문을 입력해 주세요"
                />
              </>
            )}
          />
          {photos.length > 0 && (
            <div className={photoGrid}>
              {photos.map((photo, index) => (
                <div
                  className={photoLayout}
                  key={photo.id}
                  draggable
                  onDragStart={(e) => onDragStart(e, index)}
                  onDragOver={onDragOver}
                  onDrop={(e) => onDrop(e, index)}
                >
                  <div className={photoContainer}>
                    <button className={deleteButton} onClick={() => deletePhoto(photo.id)}>
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
          <div className={uploadImagesContainer}>
            <label htmlFor="photos" className={addImageContainer}>
              <Icon icon="ImageAdd" width={16} height={16} />
              <p style={{ color: colors.text04, fontWeight: '500' }}>사진 추가</p>
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
      {!!contentError && <p className={formMessage}>{contentError.message}</p>}
    </div>
  );
};

export default DescriptionSection;
