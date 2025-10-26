import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';
import { ChangeEvent, DragEvent, useEffect } from 'react';
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
import ExtractKeywordButton from '../ExtractKeywordButton/ExtractKeywordButton';
import InputForm from '../InputForm/InputForm';
import { formMessage } from '../InputForm/InputForm.css';

import useFunnel from '@/app/join/hooks/useFunnel';
import { STEP } from '@/app/join/JoinPage.constants';
import Icon from '@/components/Icon';
import { dialogOverlay } from '@/components/Modal/ConfirmModal/ConfirmModal.css';
import { useToast } from '@/hooks/useToast';
import { UploadExperimentPostSchemaType } from '@/schema/upload/uploadExperimentPostSchema';
import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

interface DescriptionSectionProps {
  images: (string | File)[]; // 기존 이미지 (URL) + 새로 추가된 이미지 (File)
  setImages: (images: (string | File)[]) => void;
  extractKeywordsFromContent?: () => Promise<void>;
  isLoading?: boolean;
}

const MAX_PHOTOS = 3;
const VALID_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

const DescriptionSection = ({
  images,
  setImages,
  extractKeywordsFromContent,
  isLoading,
}: DescriptionSectionProps) => {
  const {
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<UploadExperimentPostSchemaType>();
  const { currentStepIdx, step } = useFunnel();

  const toast = useToast();
  const contentError = errors.content;

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
        toast.error({
          message: '지원되지 않는 파일 형식이에요. JPG 또는 PNG를 업로드 해주세요.',
        });
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
          어떤 실험인가요?&nbsp;<span style={{ color: colors.textAlert }}>*</span>
        </h3>

        <div className={descriptionFormLayout}>
          {/* 실험 제목 */}
          <Controller
            name="title"
            control={control}
            render={({ field, fieldState }) => (
              <InputForm
                field={field}
                type="text"
                id="title"
                placeholder="제목을 입력해 주세요"
                error={fieldState.error}
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
                    stretch: currentStepIdx > 0,
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
          {step === STEP.outline && (
            <ExtractKeywordButton onClick={extractKeywordsFromContent} isLoading={isLoading} />
          )}

          {/* 에러 메시지  */}
          {errors.content?.message && (
            <p className={formMessage} style={{ marginTop: '-0.2rem' }}>
              {errors.content.message}
            </p>
          )}
        </div>
      </div>

      <Dialog.Root open={isLoading ?? false}>
        <Dialog.Overlay className={dialogOverlay} />
        <Dialog.Content
          style={{
            width: '32rem',
            backgroundColor: colors.field01,
            borderRadius: '1.2rem',
            padding: '3.2rem',
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: '0px 4px 16px rgba(53, 59, 61, 0.2)',
            zIndex: 100,
            textAlign: 'center',
          }}
        >
          <Dialog.Title>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2rem',
              }}
            >
              <Icon icon="TwinkleStars" width={48} height={48} />
              <span
                style={{
                  ...fonts.title.medium.SB20,
                  color: colors.text06,
                }}
              >
                AI 자동 입력중이에요
              </span>
            </div>
          </Dialog.Title>
          <Dialog.Description
            style={{
              whiteSpace: 'pre-wrap',
              ...fonts.body.small.M15,
              color: colors.text06,
              marginTop: '0.8rem',
            }}
          >
            {`공고를 읽고 입력칸을 자동으로 채워드려요\n가끔 실수할 수 있으니, 꼭 확인해 주세요`}
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};

export default DescriptionSection;
