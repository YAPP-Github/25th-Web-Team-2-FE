import { BANNER_LENGTH } from '@/app/home/home.constants';
import { useRef, useState } from 'react';

const SLIDE_THRESHOLD = 50;

interface UseTouchSlideProps {
  bannerIdx: number;
  resetAutoSlide: () => void;
  moveSlide: (idx: number) => void;
}

export const useTouchSlide = ({ bannerIdx, resetAutoSlide, moveSlide }: UseTouchSlideProps) => {
  const [translateX, setTranslateX] = useState(0);
  const startTouchRef = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    startTouchRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (startTouchRef.current === null) {
      return;
    }

    const deltaX = startTouchRef.current - e.touches[0].clientX;
    setTranslateX(deltaX);
  };

  const handleTouchEnd = () => {
    if (translateX > SLIDE_THRESHOLD) {
      resetAutoSlide();
      const nextIndex = (bannerIdx + 1) % BANNER_LENGTH;
      moveSlide(nextIndex);
    }

    startTouchRef.current = null;
  };

  return { handleTouchStart, handleTouchMove, handleTouchEnd };
};
