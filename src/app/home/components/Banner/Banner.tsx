'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';

import {
  bannerCarousel,
  bannerImage,
  bannerLayout,
  bannerWrapper,
  carouselContainer,
  navigationLeft,
  navigationRight,
} from './Banner.css';

import BannerImage from '@/assets/images/banner.webp';
import Icon from '@/components/Icon';

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
    <div className={bannerLayout}>
      <div className={bannerWrapper}>
        <div className={bannerCarousel} ref={carouselRef}>
          <div
            className={carouselContainer}
            style={{
              width: `${BANNER_LENGTH * 100}%`,
              transform: carouselRef.current
                ? `translateX(-${(bannerIdx - 1) * carouselRef.current.clientWidth}px)`
                : 'none',
            }}
          >
            <Image
              src={BannerImage}
              alt="first-banner"
              className={bannerImage}
              priority
              width={1000}
              height={80}
              unoptimized
            />
            <Image
              src={BannerImage}
              alt="second-banner"
              className={bannerImage}
              priority
              width={1000}
              height={80}
              unoptimized
            />
            <Image
              src={BannerImage}
              alt="third-banner"
              className={bannerImage}
              priority
              width={1000}
              height={80}
              unoptimized
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
