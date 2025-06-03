import { useCallback, useEffect, useRef, useState } from 'react';

import { BANNER_LENGTH, SLIDE_SPEED } from '@/app/home/home.constants';

const AUTO_SLIDE_INTERVAL = 5000;

export const useSlide = () => {
  const [bannerIdx, setBannerIdx] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const slideTimerRef = useRef<NodeJS.Timeout | null>(null);

  const moveSlide = (index: number) => {
    if (carouselRef.current) {
      const width = carouselRef.current.clientWidth;
      carouselRef.current.style.transition = `transform ${SLIDE_SPEED}s ease-in-out`;
      carouselRef.current.style.transform = `translateX(-${width * index}px)`;
      setBannerIdx(index);
    }
  };

  const handleClickPrev = () => {
    resetAutoSlide();
    const prevIndex = bannerIdx === 0 ? BANNER_LENGTH - 1 : bannerIdx - 1;
    moveSlide(prevIndex);
  };

  const handleClickNext = () => {
    resetAutoSlide();
    const nextIndex = (bannerIdx + 1) % BANNER_LENGTH;
    moveSlide(nextIndex);
  };

  const startAutoSlide = useCallback(() => {
    if (slideTimerRef.current) {
      clearInterval(slideTimerRef.current);
    }

    slideTimerRef.current = setInterval(() => {
      const nextIndex = (bannerIdx + 1) % BANNER_LENGTH;
      moveSlide(nextIndex);
    }, AUTO_SLIDE_INTERVAL);
  }, [bannerIdx]);

  const resetAutoSlide = () => {
    if (slideTimerRef.current) {
      clearInterval(slideTimerRef.current);
    }
    startAutoSlide();
  };

  useEffect(() => {
    startAutoSlide();

    return () => {
      if (slideTimerRef.current) {
        clearInterval(slideTimerRef.current);
      }
    };
  }, [bannerIdx, startAutoSlide]);

  return {
    bannerIdx,
    carouselRef,
    handleClickPrev,
    handleClickNext,
    resetAutoSlide,
    startAutoSlide,
    moveSlide,
  };
};
