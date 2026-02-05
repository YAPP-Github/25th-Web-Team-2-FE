import { useRef, useState } from 'react';

const SLIDE_THRESHOLD = 50;

interface UseTouchSlideProps {
  currentIdx: number;
  moveSlide: (idx: number) => void;
  totalLength: number;
  resetAutoSlide?: () => void;
  loop?: boolean;
}

export const useTouchSlide = ({
  currentIdx,
  moveSlide,
  totalLength,
  resetAutoSlide,
  loop = true,
}: UseTouchSlideProps) => {
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
    if (Math.abs(translateX) <= SLIDE_THRESHOLD) {
      startTouchRef.current = null;
      setTranslateX(0);
      return;
    }

    resetAutoSlide?.();

    if (loop) {
      const prevIdx = (currentIdx - 1 + totalLength) % totalLength;
      const nextIdx = (currentIdx + 1) % totalLength;
      const targetIdx = translateX > 0 ? nextIdx : prevIdx;
      moveSlide(targetIdx);
    } else {
      if (translateX > 0 && currentIdx < totalLength - 1) {
        moveSlide(currentIdx + 1);
      } else if (translateX < 0 && currentIdx > 0) {
        moveSlide(currentIdx - 1);
      }
    }

    startTouchRef.current = null;
    setTranslateX(0);
  };

  return { handleTouchStart, handleTouchMove, handleTouchEnd };
};
