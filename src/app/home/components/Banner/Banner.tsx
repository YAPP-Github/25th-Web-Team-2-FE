'use client';

import Image from 'next/image';
import { useRef } from 'react';

import {
  bannerCarousel,
  bannerImage,
  bannerLayout,
  carouselContainer,
  navigationLeft,
  navigationRight,
} from './Banner.css';

import WebBanner from '@/assets/images/webBanner.png';
import WebBannerSecond from '@/assets/images/webBanner2.png';
import Icon from '@/components/Icon';
import { useSlide } from './hooks/useSlide';
import { useTouchSlide } from './hooks/useTouchSlide';
import { SLIDE_SPEED } from '../../home.constants';

const Banner = () => {
  const { bannerIdx, resetAutoSlide, moveSlide, handleClickPrev, handleClickNext } = useSlide();
  const { handleTouchStart, handleTouchMove, handleTouchEnd } = useTouchSlide({
    bannerIdx,
    resetAutoSlide,
    moveSlide,
  });

  const carouselRef = useRef<HTMLDivElement>(null);

  return (
    <div className={bannerLayout}>
      <div
        className={bannerCarousel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
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
            width={1000}
            height={80}
            style={{ width: 'auto', height: 'auto' }}
          />
          <Image
            src={WebBannerSecond}
            alt="공강 시간에 부담 없이 용돈 버는 방법 학교 근처 실험에 참여하고 보상을 받아보세요"
            className={bannerImage}
            priority
            width={1000}
            height={80}
            style={{ width: 'auto', height: 'auto' }}
          />
          <Image
            src={WebBanner}
            alt="참여자 언제 다 모을지 고민이라면 공고를 올리고 가까운 참여자에게 실험을 알려보세요"
            className={bannerImage}
            priority
            width={1000}
            height={80}
            style={{ width: 'auto', height: 'auto' }}
          />
          <Image
            src={WebBannerSecond}
            alt="공강 시간에 부담 없이 용돈 버는 방법 학교 근처 실험에 참여하고 보상을 받아보세요"
            className={bannerImage}
            priority
            width={1000}
            height={80}
            style={{ width: 'auto', height: 'auto' }}
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
  );
};

export default Banner;
