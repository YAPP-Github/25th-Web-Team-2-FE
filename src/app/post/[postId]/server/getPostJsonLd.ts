import { ORGANIZATION_REF, SITE_NAME, WEBSITE_ID } from '@constants/seo';
import { DEFAULT_OG_IMAGE_URL, SITE_URL } from '@constants/url';

import { buildPostDescription } from './getPostMetadata';
import type { UseQueryExperimentDetailsAPIResponse } from '../hooks/useExperimentDetailsQuery';

const toAbsoluteUrl = (url: string) => (url.startsWith('http') ? url : `${SITE_URL}${url}`);

/**
 * 공고 상세 페이지의 schema.org 구조화 데이터.
 * 참여자 모집 공고는 고용 공고가 아니므로 JobPosting 대신 Article 을 사용합니다.
 */
export const getPostJsonLd = (postDetailData: UseQueryExperimentDetailsAPIResponse) => {
  const { experimentPostId, title, uploadDate, uploaderName, isUploaderActive, imageList } =
    postDetailData;
  const url = `${SITE_URL}/post/${encodeURIComponent(experimentPostId)}`;
  const image = imageList?.find((src) => /^https?:\/\//.test(src)) ?? DEFAULT_OG_IMAGE_URL;

  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: title,
    description: buildPostDescription(postDetailData),
    url,
    mainEntityOfPage: url,
    inLanguage: 'ko-KR',
    image: toAbsoluteUrl(image),
    ...(uploadDate && { datePublished: uploadDate }),
    ...(isUploaderActive && uploaderName && { author: { '@type': 'Person', name: uploaderName } }),
    publisher: ORGANIZATION_REF,
    isPartOf: { '@id': WEBSITE_ID },
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: SITE_NAME, item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: title, item: url },
    ],
  };

  return [article, breadcrumb] as const;
};
