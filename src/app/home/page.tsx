import Banner from './components/Banner/Banner';
import ExperimentContentSection from './components/ExperimentContentSection/ExperimentContentSection';

import type { ExperimentPostListFilters } from '@/apis/post';
import DefaultLayout from '@/components/layout/DefaultLayout/DefaultLayout';

interface HomePageProps {
  searchParams: {
    [k in keyof ExperimentPostListFilters]?: string;
  };
}

export default async function Home({ searchParams }: HomePageProps) {
  return (
    <DefaultLayout>
      <Banner />
      <ExperimentContentSection searchParams={searchParams} />
    </DefaultLayout>
  );
}
