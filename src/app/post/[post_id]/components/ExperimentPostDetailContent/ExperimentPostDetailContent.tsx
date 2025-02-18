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
import { formattedContentText, isValidImageUrl } from '../../ExperimentPostPage.utils';
import { UseQueryExperimentDetailsAPIResponse } from '../../hooks/useExperimentDetailsQuery';

import { convertToWebpUrl } from '@/app/upload/upload.utils';
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

  /** 이미지가 접근 가능한지 확인하는 polling */
  async function checkImageExists(url: string, retries = 10, delay = 2000): Promise<boolean> {
    for (let i = 0; i < retries; i++) {
      try {
        const res = await fetch(url, { method: 'HEAD', cache: 'no-store' });
        if (res.ok) return true;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(`Image load failed: ${url}`, error);
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
    return false;
  }

  /** WebP 변환 이미지 polling 후 교체 */
  useEffect(() => {
    if (imageList.length === 0) return;

    const originalImages = [...imageList];
    setImageSources(originalImages); // 원본 이미지 먼저 렌더링

    async function checkAndReplaceWithWebp() {
      const updatedImages = await Promise.all(
        originalImages.map(async (originalUrl) => {
          if (!isValidImageUrl(originalUrl)) return originalUrl;

          const webpUrl = convertToWebpUrl(originalUrl);
          const isWebpAvailable = await checkImageExists(webpUrl);

          return isWebpAvailable ? webpUrl : originalUrl;
        }),
      );

      setImageSources(updatedImages);
    }

    checkAndReplaceWithWebp();
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
            <div className={singleImageWrapper}>
              <Image
                src={imageSources[0]}
                alt="실험 안내 이미지"
                width={588}
                height={588}
                style={{ objectFit: 'contain', transition: 'opacity 0.3s ease-in-out' }}
                priority
                quality={100}
              />
              <button className={maximizeIcon} onClick={() => setSelectedImage(imageSources[0])}>
                <Icon icon="Maximize" width={20} height={20} cursor="pointer" />
              </button>
            </div>
          ) : (
            <div className={multiImageGrid}>
              {/* Multiple Images */}
              {imageSources.map((src, index) => (
                <div key={index} className={imageItem}>
                  <Image
                    src={src}
                    alt={`실험 안내 이미지 ${index + 1}`}
                    width={286}
                    height={286}
                    style={{ objectFit: 'contain', transition: 'opacity 0.3s ease-in-out' }}
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
                objectFit: 'contain',
                borderRadius: '1.2rem',
                border: `0.1em solid ${colors.fieldToast}`,
              }}
            />
          )}
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default ExperimentPostDetailContent;
