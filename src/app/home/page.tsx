import type { Metadata } from 'next';

import type { ExperimentPostListFilters } from '@apis/post';
import DefaultLayout from '@components/layout/DefaultLayout';
import {
  ORGANIZATION_ID,
  SITE_ALTERNATE_NAME,
  SITE_DESCRIPTION,
  SITE_NAME,
  WEBSITE_ID,
} from '@constants/seo';
import { SITE_URL } from '@constants/url';
import { serializeJsonLd } from '@utils/serializeJsonLd';

import Banner from './components/Banner';
import ExperimentContentSection from './components/ExperimentContentSection';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

const homeJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: SITE_NAME,
    alternateName: SITE_ALTERNATE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: 'ko-KR',
    publisher: { '@id': ORGANIZATION_ID },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: SITE_NAME,
    alternateName: SITE_ALTERNATE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    description: SITE_DESCRIPTION,
    email: 'team.gradmeet@gmail.com',
  },
];

interface HomePageProps {
  searchParams: {
    [k in keyof ExperimentPostListFilters]?: string;
  };
}

export default async function Home({ searchParams }: HomePageProps) {
  return (
    <DefaultLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(homeJsonLd) }}
      />
      <Banner />
      <ExperimentContentSection searchParams={searchParams} />
    </DefaultLayout>
  );
}
