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
import ExperimentImageViewer from '../ExperimentImageViewer/ExperimentImageViewer';

import Icon from '@/components/Icon';

const ExperimentPostMobileDetailContent = ({
  postDetailData,
}: {
  postDetailData: UseQueryExperimentDetailsAPIResponse;
}) => {
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

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

  const handleMaximize = (src: string) => {
    setSelectedImage(src);
    setIsImageViewerOpen(true);
  };

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
                <button className={maximizeIcon} onClick={() => handleMaximize(imageSources[0])}>
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
                    style={{
                      objectFit: 'cover',
                      transition: 'opacity 0.3s ease-in-out',
                    }}
                    priority
                    quality={100}
                  />
                  <button className={maximizeIcon} onClick={() => handleMaximize(src)}>
                    <Icon icon="Maximize" width={20} height={20} cursor="pointer" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 이미지 확대 뷰어 */}
      {selectedImage && (
        <ExperimentImageViewer
          initialIndex={imageSources.findIndex((s) => s === selectedImage)}
          images={imageSources}
          open={isImageViewerOpen}
          onOpenChange={(open) => {
            setIsImageViewerOpen(open);
            if (!open) setSelectedImage(null);
          }}
        />
      )}
    </div>
  );
};

export default ExperimentPostMobileDetailContent;
