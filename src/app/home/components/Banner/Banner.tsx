'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

import {
  bannerCarousel,
  bannerImage,
  bannerLayout,
  bannerWrapper,
  carouselContainer,
  navigationLeft,
  navigationRight,
} from './Banner.css';

import WebBanner from '@/assets/images/webBanner.png';
import WebBannerSecond from '@/assets/images/webBanner2.png';
import Icon from '@/components/Icon';

const BANNER_LENGTH = 3;
const AUTO_SLIDE_INTERVAL = 5000;
const SLIDE_SPEED = 1.2;

const Banner = () => {
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

  return (
    <div className={bannerLayout}>
      <div className={bannerWrapper}>
        <div className={bannerCarousel}>
          <div
            ref={carouselRef}
            className={carouselContainer}
            style={{
              transition: `transform ${SLIDE_SPEED}s ease-in-out`,
            }}
          >
            <Image
              src={WebBanner}
              alt="참여자 언제 다 모을지 고민이라면 공고를 올리고 가까운 참여자에게 실험을 알려보세요"
              className={bannerImage}
              priority
            />
            <Image
              src={WebBannerSecond}
              alt="공강 시간에 부담 없이 용돈 버는 방법 학교 근처 실험에 참여하고 보상을 받아보세요"
              className={bannerImage}
              priority
            />
            <Image
              src={WebBanner}
              alt="참여자 언제 다 모을지 고민이라면 공고를 올리고 가까운 참여자에게 실험을 알려보세요"
              className={bannerImage}
              priority
            />
            <Image
              src={WebBannerSecond}
              alt="공강 시간에 부담 없이 용돈 버는 방법 학교 근처 실험에 참여하고 보상을 받아보세요"
              className={bannerImage}
              priority
            />
          </div>
        </div>

        <button className={navigationLeft} onClick={handleClickPrev}>
          <Icon icon="ChevronSquare" rotate={-90} cursor="pointer" />
        </button>

        <button className={navigationRight} onClick={handleClickNext}>
          <Icon icon="ChevronSquare" rotate={90} cursor="pointer" />
        </button>
      </div>
    </div>
  );
};

export default Banner;
