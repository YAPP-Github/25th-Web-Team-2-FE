import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';
import { useState } from 'react';

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
import { formattedContentText } from '../../ExperimentPostPage.utils';
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

  return (
    <div className={postDetailContentLayout}>
      <h3>실험 안내</h3>

      {/* 본문 내용 */}
      <div className={postDetailContentWrapper}>{formattedContentText(content || '')}</div>

      {/* 이미지 컨테이너 */}
      {imageList.length > 0 && (
        <div className={imageContainer}>
          {imageList.length === 1 ? (
            <div className={singleImageWrapper}>
              <Image
                src={imageList[0]}
                alt="실험 안내 이미지"
                width={588}
                height={588}
                style={{ objectFit: 'cover' }}
              />
              <button className={maximizeIcon} onClick={() => setSelectedImage(imageList[0])}>
                <Icon icon="Maximize" width={20} height={20} cursor="pointer" />
              </button>
            </div>
          ) : (
            <div className={multiImageGrid}>
              {imageList.map((src, index) => (
                <div key={index} className={imageItem}>
                  <Image
                    src={src}
                    alt={`실험 안내 이미지 ${index + 1}`}
                    width={286}
                    height={286}
                    style={{ objectFit: 'cover' }}
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
