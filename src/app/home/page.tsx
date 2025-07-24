import Banner from './components/Banner/Banner';
import ExperimentPostContainer from './components/ExperimentPostContainer/ExperimentPostContainer';

import { createSSRFetchClient } from '@/apis/config/fetchClient';
import type { ExperimentPostListFilters, ExperimentPostResponse } from '@/apis/post';
import DefaultLayout from '@/components/layout/DefaultLayout/DefaultLayout';
import { API_URL } from '@/constants/url';
import { URLFilterSchema } from '@/schema/filter/URLFilterSchema';
import { getQueryParamsToString } from '@/utils/getQueryParamsString';

const POST_PER_PAGE = 15;

interface HomePageProps {
  searchParams: {
    [k in keyof ExperimentPostListFilters]?: string;
  };
}

export default async function Home({ searchParams }: HomePageProps) {
  const fetchClient = createSSRFetchClient();
  const parsedParams = URLFilterSchema().safeParse(searchParams);

  const queryParams = parsedParams.success
    ? getQueryParamsToString({ ...parsedParams.data, count: POST_PER_PAGE })
    : getQueryParamsToString({ recruitStatus: 'ALL', count: POST_PER_PAGE });

  const initialPosts = await fetchClient.get<ExperimentPostResponse>(API_URL.postList(queryParams));

  return (
    <DefaultLayout>
      <Banner />
      <ExperimentPostContainer initialPosts={initialPosts} />
    </DefaultLayout>
  );
}
