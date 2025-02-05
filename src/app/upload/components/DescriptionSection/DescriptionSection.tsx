import * as Toast from '@radix-ui/react-toast';
import Image from 'next/image';
import { ChangeEvent, DragEvent, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import {
  addImageContainer,
  deleteButton,
  descriptionContentContainer,
  descriptionFormLayout,
  descriptionTextarea,
  photoContainer,
  photoGrid,
  photoLayout,
  uploadFormSectionTitle,
  uploadImagesContainer,
} from './DescriptionSection.css';
import InputForm from '../InputForm/InputForm';
import { headingIcon, uploadSectionLayout } from '../UploadContainer/UploadContainer.css';

import {
  copyToastLayout,
  copyToastTitle,
  copyToastViewport,
} from '@/app/post/[post_id]/components/ParticipationGuideModal/ParticipationGuideModal.css';
import Icon from '@/components/Icon';
import { UploadExperimentPostSchemaType } from '@/schema/upload/uploadExperimentPostSchema';
import { colors } from '@/styles/colors';

interface DescriptionSectionProps {
  selectedImages: File[];
  setSelectedImages: (images: File[]) => void;
}

const MAX_PHOTOS = 3;
const VALID_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

const DescriptionSection = ({ selectedImages, setSelectedImages }: DescriptionSectionProps) => {
  const { control, formState } = useFormContext<UploadExperimentPostSchemaType>();
  const contentError = formState.errors.content;
  const [openToast, setOpenToast] = useState(false);

  const uploadPhotos = (e: ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;

    if (!files) return;

    const newPhotos: File[] = [];

    for (const file of Array.from(files)) {
      if (!VALID_IMAGE_TYPES.includes(file.type)) {
        setOpenToast(true);
        continue;
      }

      if (selectedImages.length + newPhotos.length >= MAX_PHOTOS) {
        break;
      }

      newPhotos.push(file);
    }

    setSelectedImages([...selectedImages, ...newPhotos]);
  };

  // 파일 삭제
  const deletePhoto = (index: number): void => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };

  // 드래그 앤 드랍을 위한 핸들러
  const onDragStart = (e: DragEvent<HTMLDivElement>, index: number): void => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('photoIndex', String(index));
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
  };

  const onDrop = (e: DragEvent<HTMLDivElement>, targetIndex: number): void => {
    e.preventDefault();
    const sourceIndex = Number(e.dataTransfer.getData('photoIndex'));

    if (sourceIndex === targetIndex) return;

    const updatedPhotos = [...selectedImages];
    const [movedPhoto] = updatedPhotos.splice(sourceIndex, 1);
    updatedPhotos.splice(targetIndex, 0, movedPhoto);

    setSelectedImages(updatedPhotos);
  };

  return (
    <>
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
                <textarea
                  {...field}
                  id="content"
                  className={descriptionTextarea({
                    photoGridHeight: selectedImages.length > 0 ? 'withPhotos' : 'withoutPhotos',
                  })}
                  placeholder="본문을 입력해 주세요"
                />
              )}
            />

            {selectedImages.length > 0 && (
              <div className={photoGrid}>
                {selectedImages.map((photo, index) => (
                  <div
                    className={photoLayout}
                    key={index}
                    draggable
                    onDragStart={(e) => onDragStart(e, index)}
                    onDragOver={onDragOver}
                    onDrop={(e) => onDrop(e, index)}
                  >
                    <div className={photoContainer}>
                      <button className={deleteButton} onClick={() => deletePhoto(index)}>
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
                        src={URL.createObjectURL(photo)}
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
                accept="image/png, image/jpeg, image/jpg"
                multiple
                onChange={uploadPhotos}
                style={{ display: 'none' }}
              />
              <p>jpg, png 최대 3장까지 첨부할 수 있어요</p>
            </div>
          </div>
        </div>
      </div>

      {/* 잘못된 확장자 파일 업로드 시 Toast 알림 */}
      <Toast.Provider swipeDirection="right">
        <Toast.Root
          className={copyToastLayout}
          open={openToast}
          onOpenChange={setOpenToast}
          duration={3500}
        >
          <Toast.Title className={copyToastTitle}>
            <Icon icon="Alert" color={colors.primaryMint} width={24} height={24} />
            <p>지원되지 않는 파일 형식입니다. JPG 또는 PNG 파일을 업로드하세요.</p>
          </Toast.Title>
        </Toast.Root>
        <Toast.Viewport className={copyToastViewport} />
      </Toast.Provider>
    </>
  );
};

export default DescriptionSection;
