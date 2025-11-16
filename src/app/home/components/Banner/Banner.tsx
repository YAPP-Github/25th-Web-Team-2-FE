'use client';

import Image from 'next/image';
import Link from 'next/link';

import {
  bannerCarousel,
  bannerImage,
  bannerLayout,
  carouselContainer,
  navigationLeft,
  navigationRight,
} from './Banner.css';
import { useSlide } from './hooks/useSlide';
import { useTouchSlide } from './hooks/useTouchSlide';
import { SLIDE_SPEED } from '../../home.constants';

import MobileBanner from '@/assets/images/mobileSurveyBanner.webp';
import MobileBannerSecond from '@/assets/images/mobileBannerAI.webp';
import WebBanner from '@/assets/images/webSurveyBanner.webp';
import WebBannerSecond from '@/assets/images/webBannerAI.webp';
import Icon from '@/components/Icon';

const SURVEY_URL = 'https://gradmeet.co.kr/post/0NF84Z489GFJE?utm_source=banner';

const BannerMap = [
  {
    webSrc: WebBanner,
    mobileSrc: MobileBanner,
    alt: '참여자 언제 다 모을지 고민이라면 공고를 올리고 가까운 참여자에게 실험을 알려보세요',
    url: SURVEY_URL,
  },
  {
    webSrc: WebBannerSecond,
    mobileSrc: MobileBannerSecond,
    alt: 'AI 자동 입력이 새로 나왔어요. 본문만 작성하면 AI로 공고등록 1분 컷.',
  },
];

const Banner = () => {
  const { bannerIdx, carouselRef, resetAutoSlide, moveSlide, handleClickPrev, handleClickNext } =
    useSlide({ bannerLength: BannerMap.length });

  const { handleTouchStart, handleTouchMove, handleTouchEnd } = useTouchSlide({
    currentIdx: bannerIdx,
    resetAutoSlide,
    moveSlide,
    totalLength: BannerMap.length,
  });

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
          {BannerMap.map((banner, idx) => {
            const imageContent = (
              <Image
                key={idx}
                src={banner.webSrc}
                alt={banner.alt}
                className={bannerImage}
                priority
                width={1000}
                height={80}
              />
            );

            return (
              <picture key={idx} style={{ display: 'block', flex: '0 0 100%' }}>
                <source media="(max-width: 767px)" srcSet={banner.mobileSrc.src} />
                {banner.url ? <Link href={banner.url}>{imageContent}</Link> : imageContent}
              </picture>
            );
          })}
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
