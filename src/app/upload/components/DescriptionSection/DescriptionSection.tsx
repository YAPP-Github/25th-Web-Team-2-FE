import * as Toast from '@radix-ui/react-toast';
import Image from 'next/image';
import { ChangeEvent, DragEvent, useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import {
  addImageContainer,
  deleteButton,
  descriptionContentContainer,
  descriptionFormLayout,
  descriptionSectionLayout,
  descriptionTextarea,
  fileInfoText,
  photoContainer,
  photoGrid,
  photoLayout,
  uploadFormSectionTitle,
  uploadImagesContainer,
} from './DescriptionSection.css';
import InputForm from '../InputForm/InputForm';
import { formMessage } from '../InputForm/InputForm.css';
import { headingIcon } from '../UploadContainer/UploadContainer.css';

import {
  copyToastLayout,
  copyToastTitle,
  copyToastViewport,
} from '@/app/post/[postId]/desktop/components/ParticipationGuideModal/ParticipationGuideModal.css';
import Icon from '@/components/Icon';
import { UploadExperimentPostSchemaType } from '@/schema/upload/uploadExperimentPostSchema';
import { colors } from '@/styles/colors';

interface DescriptionSectionProps {
  images: (string | File)[]; // 기존 이미지 (URL) + 새로 추가된 이미지 (File)
  setImages: (images: (string | File)[]) => void;
}

const MAX_PHOTOS = 3;
const VALID_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

const DescriptionSection = ({ images, setImages }: DescriptionSectionProps) => {
  const {
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<UploadExperimentPostSchemaType>();

  const contentError = errors.content;
  const [openToast, setOpenToast] = useState(false);

  useEffect(() => {
    const existingImages = getValues('imageListInfo.images') || [];

    if (images.length === 0 && existingImages.length > 0) {
      setImages([...existingImages.slice(0, MAX_PHOTOS)]);
    }
  }, [getValues, images, setImages]);

  const uploadPhotos = (e: ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    if (!files) return;

    const newPhotos: (string | File)[] = [];

    for (const file of Array.from(files)) {
      if (!VALID_IMAGE_TYPES.includes(file.type)) {
        setOpenToast(true);
        continue;
      }

      newPhotos.push(file);
    }

    const updatedImages = [...images, ...newPhotos].slice(0, MAX_PHOTOS);
    setImages(updatedImages);
  };

  const deletePhoto = (index: number): void => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);

    setValue(
      'imageListInfo.images',
      updatedImages.filter((img) => typeof img === 'string'),
    );
  };

  const onDragStart = (e: DragEvent<HTMLDivElement>, index: number): void => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('photoIndex', String(index));
  };

  const onDrop = (e: DragEvent<HTMLDivElement>, targetIndex: number): void => {
    e.preventDefault();
    const sourceIndex = Number(e.dataTransfer.getData('photoIndex'));

    if (sourceIndex === targetIndex) return;

    const updatedImages = [...images];
    const [movedImage] = updatedImages.splice(sourceIndex, 1);
    updatedImages.splice(targetIndex, 0, movedImage);

    setImages(updatedImages);
  };

  return (
    <>
      <div className={descriptionSectionLayout}>
        <h3 className={uploadFormSectionTitle}>
          <span className={headingIcon}>1</span>어떤 실험인가요?{' '}
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
                placeholder="제목을 입력해 주세요"
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
                    photoGridHeight: images.length > 0 ? 'withPhotos' : 'withoutPhotos',
                  })}
                  placeholder="본문을 입력해 주세요"
                />
              )}
            />

            {/* Image Container */}
            {images.length > 0 && (
              <div className={photoGrid}>
                {images.map((image, index) => (
                  <div
                    className={photoLayout}
                    key={`image-${index}`}
                    draggable
                    onDragStart={(e) => onDragStart(e, index)}
                    onDrop={(e) => onDrop(e, index)}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    <div className={photoContainer}>
                      <button className={deleteButton} onClick={() => deletePhoto(index)}>
                        <Icon
                          icon="CloseRound"
                          width={20}
                          height={20}
                          color={'rgba(109, 123, 130, 0.7)'}
                          cursor="pointer"
                          subcolor={colors.field01}
                        />
                      </button>
                      <Image
                        src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                        alt="업로드된 이미지"
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
              <label
                htmlFor="photos"
                className={addImageContainer({ disabled: !!(images.length >= 3) })}
              >
                <Icon
                  icon="ImageAdd"
                  width={16}
                  height={16}
                  color={!!(images.length >= 3) ? colors.icon02 : colors.icon03}
                  cursor="pointer"
                />
                <p>사진 추가</p>
              </label>
              <input
                type="file"
                id="photos"
                accept="image/png, image/jpeg, image/jpg"
                multiple
                onChange={uploadPhotos}
                style={{ display: 'none' }}
              />
              <p className={fileInfoText}>jpg, png 최대 3장까지 첨부할 수 있어요</p>
            </div>
          </div>

          {/* 에러 메시지  */}
          {errors.content?.message && (
            <p className={formMessage} style={{ marginTop: '-0.2rem' }}>
              {errors.content.message}
            </p>
          )}
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
            <Icon icon="Alert" color={colors.textAlert} width={24} height={24} />
            <p>지원되지 않는 파일 형식이에요. JPG 또는 PNG를 업로드 해주세요.</p>
          </Toast.Title>
        </Toast.Root>
        <Toast.Viewport className={copyToastViewport} />
      </Toast.Provider>
    </>
  );
};

export default DescriptionSection;
