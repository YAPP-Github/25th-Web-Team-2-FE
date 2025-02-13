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

import Icon from '@/components/Icon';
import { a11yHidden } from '@/styles/a11y.css';
import { colors } from '@/styles/colors';

interface ExperimentPostDetailContentProps {
  postDetailData: UseQueryExperimentDetailsAPIResponse;
}

const ExperimentPostDetailContent = ({ postDetailData }: ExperimentPostDetailContentProps) => {
  const { content, imageList = [] } = postDetailData;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [verifiedImages, setVerifiedImages] = useState<string[]>([]);
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false);

  /** 이미지가 접근 가능한지 확인 polling */
  async function checkImageExists(url: string, retries = 10, delay = 2000): Promise<boolean> {
    for (let i = 0; i < retries; i++) {
      try {
        const res = await fetch(url, { method: 'HEAD' });
        if (res.ok) return true; // 이미지가 존재하면 즉시 반환
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(`Image load failed: ${url}`, error);
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
    return false;
  }

  /** 이미지 존재 여부 확인 후 업데이트 */
  useEffect(() => {
    async function verifyImages() {
      setIsImageLoading(true);

      const results = await Promise.all(
        imageList.map(async (image) =>
          isValidImageUrl(image) && (await checkImageExists(image)) ? image : null,
        ),
      );

      setVerifiedImages(results.filter((img): img is string => img !== null));
      setIsImageLoading(false);
    }

    if (imageList.length > 0) {
      verifyImages();
    } else {
      setIsImageLoading(false);
    }
  }, [imageList]);

  return (
    <div className={postDetailContentLayout}>
      <h3>실험 안내</h3>

      {/* 본문 내용 */}
      <div className={postDetailContentWrapper}>{formattedContentText(content || '')}</div>

      {/* 이미지 컨테이너 */}

      {isImageLoading ? (
        <div
          style={{
            textAlign: 'center',
            color: colors.text02,
            height: '40rem',
            lineHeight: '40rem',
          }}
        >
          🔄 이미지 로딩 중...
        </div>
      ) : verifiedImages.length > 0 ? (
        <div className={imageContainer}>
          {verifiedImages.length === 1 ? (
            <div className={singleImageWrapper}>
              <Image
                src={verifiedImages[0]}
                alt="실험 안내 이미지"
                width={588}
                height={588}
                style={{ objectFit: 'cover' }}
                priority
              />
              <button className={maximizeIcon} onClick={() => setSelectedImage(verifiedImages[0])}>
                <Icon icon="Maximize" width={20} height={20} cursor="pointer" />
              </button>
            </div>
          ) : (
            <div className={multiImageGrid}>
              {verifiedImages.map((src, index) => (
                <div key={index} className={imageItem}>
                  <Image
                    src={src}
                    alt={`실험 안내 이미지 ${index + 1}`}
                    width={286}
                    height={286}
                    style={{ objectFit: 'cover' }}
                    priority
                  />
                  <button className={maximizeIcon} onClick={() => setSelectedImage(src)}>
                    <Icon icon="Maximize" width={20} height={20} cursor="pointer" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <p style={{ textAlign: 'center', height: '40rem', lineHeight: '40rem' }}>
          ⚠️ 이미지를 불러올 수 없습니다.
        </p>
      )}

      {/* 이미지 확대 모달 */}
      <Dialog.Root open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <Dialog.Overlay className={modalOverlay} />
        <Dialog.Content className={modalContent}>
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
              style={{
                objectFit: 'cover',
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
