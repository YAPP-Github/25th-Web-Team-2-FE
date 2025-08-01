'use client';

import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import {
  viewerOverlay,
  slideContainer,
  slideTrack,
  slideItem,
  imageStyle,
  imageViewerHeader,
  pageCurrent,
} from './ExperimentImageViewer.css';

import { useTouchSlide } from '@/app/home/components/Banner/hooks/useTouchSlide';
import Icon from '@/components/Icon';
import { a11yHidden } from '@/styles/a11y.css';
import { colors } from '@/styles/colors';

interface Props {
  images: string[];
  initialIndex?: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ExperimentImageViewer = ({ images, initialIndex = 0, open, onOpenChange }: Props) => {
  const [current, setCurrent] = useState(initialIndex);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => {
        setCurrent(initialIndex);
        setIsReady(true);
      });
    } else {
      setIsReady(false);
    }
  }, [open, initialIndex]);

  const { handleTouchStart, handleTouchMove, handleTouchEnd } = useTouchSlide({
    loop: false,
    currentIdx: current,
    moveSlide: setCurrent,
    totalLength: images.length,
  });

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Overlay className={viewerOverlay} />

      <Dialog.Content asChild>
        <div
          className={slideContainer}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={() => handleTouchEnd()}
        >
          <div className={imageViewerHeader}>
            <Dialog.Close asChild>
              <button aria-label="이미지 뷰 닫기">
                <Icon icon="Arrow" width={24} height={24} color={colors.icon01} />
              </button>
            </Dialog.Close>
            <span className={pageCurrent}>{`${current + 1} / ${images.length}`}</span>
          </div>
          <Dialog.Title className={a11yHidden}>실험 안내 이미지 뷰어</Dialog.Title>
          <Dialog.Description aria-describedby={undefined} />

          {isReady && (
            <div
              className={slideTrack}
              style={{
                transform: `translateX(-${current * 100}%)`,
                transition: 'transform 0.3s ease-in-out',
              }}
            >
              {images.map((src, idx) => (
                <div key={idx} className={slideItem}>
                  <Image
                    src={src}
                    alt={`실험 안내 이미지 ${idx + 1}`}
                    className={imageStyle}
                    fill
                    priority
                    sizes="(max-width: 767px) 100vw, 50vw"
                    quality={100}
                    style={{
                      objectFit: 'contain',
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default ExperimentImageViewer;
