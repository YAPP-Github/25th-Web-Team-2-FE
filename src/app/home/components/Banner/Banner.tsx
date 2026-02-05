'use client';

import { assignInlineVars } from '@vanilla-extract/dynamic';
import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';

import {
  bannerBgVar,
  bannerCarousel,
  bannerImage,
  bannerImageContainer,
  bannerLayout,
  bannerLink,
  bannerWrapper,
  carouselContainer,
  navigationLeft,
  navigationRight,
} from './Banner.css';
import { useSlide } from './hooks/useSlide';
import { useTouchSlide } from './hooks/useTouchSlide';
import { SLIDE_SPEED } from '../../home.constants';

import MobileBanner from '@/assets/images/firstMobileBanner.webp';
import MobileAIBanner from '@/assets/images/mobileBannerAI.webp';
import MobileBannerSecond from '@/assets/images/secondMobileBanner.webp';
import WebBanner from '@/assets/images/webBanner.png';
import WebBannerSecond from '@/assets/images/webBanner2.png';
import WebAIBanner from '@/assets/images/webBannerAI.webp';
import Icon from '@/components/Icon';

type BannerType = {
  webSrc: StaticImageData;
  mobileSrc: StaticImageData;
  alt: string;
  backgroundColor: string;
  url?: string;
};

const BannerMap: BannerType[] = [
  {
    webSrc: WebBanner,
    mobileSrc: MobileBanner,
    alt: '참여자 언제 다 모을지 고민이라면 공고를 올리고 가까운 참여자에게 실험을 알려보세요',
    backgroundColor: '#141421' as const,
  },
  {
    webSrc: WebBannerSecond,
    mobileSrc: MobileBannerSecond,
    alt: '공강 시간에 부담 없이 용돈 버는 방법. 학교 근처 실험에 참여하고 보상을 받아보세요',
    backgroundColor: '#141421' as const,
  },
  {
    webSrc: WebAIBanner,
    mobileSrc: MobileAIBanner,
    alt: 'AI 자동 입력이 새로 나왔어요. 본문만 작성하면 AI로 공고등록 1분 컷.',
    backgroundColor: '#1F0012' as const,
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
                src={banner.webSrc}
                alt={banner.alt}
                className={bannerImage}
                priority
                width={1000}
                height={80}
              />
            );

            return (
              <picture
                key={idx}
                className={bannerWrapper}
                style={assignInlineVars({ [bannerBgVar]: banner.backgroundColor })}
              >
                <source media="(max-width: 767px)" srcSet={banner.mobileSrc.src} />
                {banner.url ? (
                  <Link href={banner.url} className={bannerLink}>
                    <div className={bannerImageContainer}>{imageContent}</div>
                  </Link>
                ) : (
                  <div className={bannerImageContainer}>{imageContent}</div>
                )}
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
