'use client';

import Image from 'next/image';
import {
  bannerCarousel,
  bannerImage,
  bannerLayout,
  bannerWrapper,
  carouselContainer,
  navigationLeft,
  navigationRight,
} from './Banner.styles';

import BannerImage from '@/assets/images/banner.svg';
import Icon from '@/components/Icon';
import { useRef, useState } from 'react';

const BANNER_LENGTH = 3;

const Banner = () => {
  const [bannerIdx, setBannerIdx] = useState(1);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleClickPrev = () => {
    setBannerIdx((prev) => (prev === 1 ? BANNER_LENGTH : prev - 1));
  };

  const handleClickNext = () => {
    setBannerIdx((prev) => (prev === BANNER_LENGTH ? 1 : prev + 1));
  };

  return (
    <div css={bannerLayout}>
      <div css={bannerWrapper}>
        <div css={bannerCarousel} ref={carouselRef}>
          <div
            css={carouselContainer}
            style={{
              transform: carouselRef.current
                ? `translateX(-${(bannerIdx - 1) * carouselRef.current.clientWidth}px)`
                : 'none',
            }}
          >
            <Image src={BannerImage} alt="배너1" css={bannerImage} priority />
            <Image src={BannerImage} alt="배너2" css={bannerImage} priority />
            <Image src={BannerImage} alt="배너3" css={bannerImage} priority />
          </div>
        </div>
        <button css={navigationLeft} onClick={handleClickPrev}>
          <Icon icon="ChevronSquare" rotate={-90} cursor="pointer" />
        </button>
        <button css={navigationRight} onClick={handleClickNext}>
          <Icon icon="ChevronSquare" rotate={90} cursor="pointer" />
        </button>
      </div>
    </div>
  );
};

export default Banner;
