import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import {
  postDetailContentLayout,
  postDetailContentWrapper,
  imageContainer,
  singleImageWrapper,
  multiImageGrid,
  imageItem,
  maximizeIcon,
  modalContent,
  modalOverlay,
  closeButton,
} from './ExperimentPostDetailContent.css';
import {
  formattedContentText,
  isValidImageUrl,
  replaceImageListWithWebp,
} from '../../../ExperimentPostPage.utils';
import { UseQueryExperimentDetailsAPIResponse } from '../../../hooks/useExperimentDetailsQuery';

import Icon from '@/components/Icon';
import { a11yHidden } from '@/styles/a11y.css';
import { colors } from '@/styles/colors';

interface ExperimentPostDetailContentProps {
  postDetailData: UseQueryExperimentDetailsAPIResponse;
}

const ExperimentPostDetailContent = ({ postDetailData }: ExperimentPostDetailContentProps) => {
  const { content, imageList = [] } = postDetailData;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageSources, setImageSources] = useState<string[]>([]);

  /** WebP 변환 이미지 polling 후 존재하면 교체 */
  useEffect(() => {
    if (imageList.length === 0) return;

    let isMounted = true; // 마운트 상태 추적
    const originalImages = [...imageList];
    setImageSources(originalImages);

    replaceImageListWithWebp(originalImages).then((src) => {
      if (isMounted) setImageSources(src); // 마운트 상태 확인 후 setState
    });

    return () => {
      isMounted = false; // 언마운트 시 플래그 변경
    };
  }, [imageList]);

  return (
    <div className={postDetailContentLayout}>
      <h3>실험 안내</h3>
      {/* 본문 내용 */}
      <div className={postDetailContentWrapper}>{formattedContentText(content || '')}</div>

      {/* 이미지 컨테이너 */}
      {imageSources.length > 0 && (
        <div className={imageContainer}>
          {/* Single Image */}
          {imageSources.length === 1 ? (
            isValidImageUrl(imageSources[0]) && (
              <div className={singleImageWrapper}>
                <Image
                  src={imageSources[0]}
                  alt="실험 안내 이미지"
                  width={588}
                  height={588}
                  style={{ objectFit: 'cover', transition: 'opacity 0.3s ease-in-out' }}
                  priority
                  quality={100}
                />
                <button className={maximizeIcon} onClick={() => setSelectedImage(imageSources[0])}>
                  <Icon icon="Maximize" width={20} height={20} cursor="pointer" />
                </button>
              </div>
            )
          ) : (
            <div className={multiImageGrid}>
              {/* Multiple Images */}
              {imageSources.filter(isValidImageUrl).map((src, index) => (
                <div key={index} className={imageItem}>
                  <Image
                    src={src}
                    alt={`실험 안내 이미지 ${index + 1}`}
                    fill
                    sizes="(max-width: 767px) 18.5rem, 18.5rem"
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: '100%',
                      transition: 'opacity 0.3s ease-in-out',
                    }}
                    priority
                    quality={100}
                  />
                  <button className={maximizeIcon} onClick={() => setSelectedImage(src)}>
                    <Icon icon="Maximize" width={20} height={20} cursor="pointer" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 이미지 확대 모달 */}
      <Dialog.Root open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <Dialog.Overlay className={modalOverlay} />
        <Dialog.Content className={modalContent} aria-describedby={undefined}>
          <Dialog.Title className={a11yHidden}>확대된 이미지</Dialog.Title>
          <Dialog.Close asChild>
            <button className={closeButton} onClick={() => setSelectedImage(null)}>
              <Icon
                icon="CloseRound"
                width={28}
                height={28}
                cursor="pointer"
                color={colors.fieldToast}
              />
            </button>
          </Dialog.Close>
          {selectedImage && (
            <Image
              src={selectedImage}
              alt="확대된 이미지"
              width={648}
              height={648}
              quality={100}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
                // borderRadius: '1.2rem',
              }}
            />
          )}
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default ExperimentPostDetailContent;
