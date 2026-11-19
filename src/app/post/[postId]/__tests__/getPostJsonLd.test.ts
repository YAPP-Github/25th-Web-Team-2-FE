import { describe, expect, it, vi } from 'vitest';

import type { UseQueryExperimentDetailsAPIResponse } from '../hooks/useExperimentDetailsQuery';
import { getPostJsonLd } from '../server/getPostJsonLd';

// getPostMetadata 가 의존하는 서버 전용 모듈(server-only, next-auth)은 테스트에서 불러오지 않습니다.
vi.mock('../server/fetchExperimentPost', () => ({ fetchExperimentPost: vi.fn() }));

const createPost = (
  overrides: Partial<UseQueryExperimentDetailsAPIResponse> = {},
): UseQueryExperimentDetailsAPIResponse => ({
  experimentPostId: '0S8Y15V156450',
  title: '광고 이미지 평가 연구 참여자 모집',
  uploadDate: '2026-11-18',
  uploaderName: '김연구',
  isUploaderActive: true,
  views: 198,
  recruitStatus: true,
  summary: {
    startDate: null,
    endDate: null,
    leadResearcher: '김연구',
    matchType: 'ONLINE',
    reward: '메가커피 아이스 아메리카노 기프티콘',
    count: 30,
    timeRequired: 'LESS_30M',
  },
  targetGroup: { startAge: 18, endAge: 39, genderType: 'ALL', otherCondition: null },
  address: {
    place: null,
    region: null,
    area: null,
    detailedAddress: '',
    isOnCampus: false,
  },
  content: '본문',
  imageList: [],
  isAuthor: false,
  alarmAgree: false,
  ...overrides,
});

describe('getPostJsonLd - 공고 상세 페이지 구조화 데이터', () => {
  it('Article 에 제목, 작성일, 작성자, 정형화된 설명, 절대 URL 을 담는다.', () => {
    // When
    const [article] = getPostJsonLd(createPost());

    // Then
    expect(article).toMatchObject({
      '@type': 'Article',
      '@id': 'https://gradmeet.co.kr/post/0S8Y15V156450#article',
      headline: '광고 이미지 평가 연구 참여자 모집',
      url: 'https://gradmeet.co.kr/post/0S8Y15V156450',
      datePublished: '2026-11-18',
      author: { '@type': 'Person', name: '김연구' },
      image: 'https://gradmeet.co.kr/og-image.png',
    });
    expect(article.description).toBe(
      '모집 중 | 광고 이미지 평가 연구 참여자 모집 | 모집 대상: 만 18 ~ 39세 | 참여 보상: 메가커피 아이스 아메리카노 기프티콘 | 진행 방식: 비대면 | 소요 시간: 30분 미만',
    );
  });

  it('발행자는 @id 만이 아니라 이름과 URL 을 함께 담아 페이지 단독으로 해석된다.', () => {
    const [article] = getPostJsonLd(createPost());

    expect(article.publisher).toEqual({
      '@type': 'Organization',
      '@id': 'https://gradmeet.co.kr/#organization',
      name: '그라밋',
      url: 'https://gradmeet.co.kr',
    });
  });

  it('탈퇴한 회원의 공고에는 author 를 넣지 않는다.', () => {
    const [article] = getPostJsonLd(createPost({ isUploaderActive: false }));

    expect(article).not.toHaveProperty('author');
  });

  it('모집 종료 공고는 설명이 "모집 종료"로 시작한다.', () => {
    const [article] = getPostJsonLd(createPost({ recruitStatus: false }));

    expect(article.description).toMatch(/^모집 종료 \| /);
  });

  it('http(s) 로 시작하는 첫 이미지를 쓰고, 없으면 기본 OG 이미지를 절대 URL 로 쓴다.', () => {
    const [withImage] = getPostJsonLd(
      createPost({ imageList: ['blob:local', 'https://cdn.example.com/a.webp'] }),
    );
    const [withoutImage] = getPostJsonLd(createPost({ imageList: ['blob:local'] }));

    expect(withImage.image).toBe('https://cdn.example.com/a.webp');
    expect(withoutImage.image).toBe('https://gradmeet.co.kr/og-image.png');
  });

  it('BreadcrumbList 는 홈 > 공고 순서다.', () => {
    const [, breadcrumb] = getPostJsonLd(createPost());

    expect(breadcrumb).toEqual({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '그라밋', item: 'https://gradmeet.co.kr' },
        {
          '@type': 'ListItem',
          position: 2,
          name: '광고 이미지 평가 연구 참여자 모집',
          item: 'https://gradmeet.co.kr/post/0S8Y15V156450',
        },
      ],
    });
  });
});
