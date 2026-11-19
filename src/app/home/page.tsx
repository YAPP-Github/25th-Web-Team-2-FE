import type { Metadata } from 'next';

import type { ExperimentPostListFilters } from '@apis/post';
import DefaultLayout from '@components/layout/DefaultLayout';

import Banner from './components/Banner';
import ExperimentContentSection from './components/ExperimentContentSection';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: '그라밋',
  alternateName: 'Gradmeet',
  url: 'https://gradmeet.co.kr',
};


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
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteJsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <Banner />
      <ExperimentContentSection searchParams={searchParams} />
    </DefaultLayout>
  );
}
