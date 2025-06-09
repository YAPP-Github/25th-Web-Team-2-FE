import Image from 'next/image';
import { useEffect, useState } from 'react';

import {
  imageContainer,
  singleImageItem,
  maximizeIcon,
  multiImageGrid,
  postMobileDetailContentLayout,
  postMobileDetailContentWrapper,
  singleImageWrapper,
} from './ExperimentPostMobileDetailContent.css';
import {
  formattedContentText,
  isValidImageUrl,
  replaceImageListWithWebp,
} from '../../../ExperimentPostPage.utils';
import { UseQueryExperimentDetailsAPIResponse } from '../../../hooks/useExperimentDetailsQuery';

import Icon from '@/components/Icon';

const ExperimentPostMobileDetailContent = ({
  postDetailData,
}: {
  postDetailData: UseQueryExperimentDetailsAPIResponse;
}) => {
  const { content, imageList = [] } = postDetailData;
  // todo 이미지 확대 창 생성 시 사용 예정
  const [_, setSelectedImage] = useState<string | null>(null);
  const [imageSources, setImageSources] = useState<string[]>([]);

  /** WebP 변환 이미지 polling 후 존재하면 교체 */
  useEffect(() => {
    if (imageList.length === 0) return;

    const originalImages = [...imageList];
    setImageSources(originalImages);

    replaceImageListWithWebp(originalImages).then(setImageSources);
  }, [imageList]);

  return (
    <div className={postMobileDetailContentLayout}>
      {/* 본문 내용 */}
      <div className={postMobileDetailContentWrapper}>{formattedContentText(content || '')}</div>

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
                <div key={index} className={singleImageItem}>
                  <Image
                    src={src}
                    alt={`실험 안내 이미지 ${index + 1}`}
                    sizes="(max-width: 767px) 50vw, 33vw"
                    fill
                    style={{ objectFit: 'cover', transition: 'opacity 0.3s ease-in-out' }}
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
    </div>
  );
};

export default ExperimentPostMobileDetailContent;
