import Banner from './components/Banner/Banner';
import ExperimentPostContainer from './components/ExperimentPostContainer/ExperimentPostContainer';

import { createSSRFetchClient } from '@/apis/config/fetchClient';
import type { ExperimentPostListFilters, ExperimentPostResponse } from '@/apis/post';
import DefaultLayout from '@/components/layout/DefaultLayout/DefaultLayout';
import { QUERY_KEY } from '@/constants/queryKey';
import { API_URL } from '@/constants/url';
import { URLFilterSchema } from '@/schema/filter/URLFilterSchema';
import { getQueryParamsToString } from '@/utils/getQueryParamsString';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/getQueryClient';

const POST_PER_PAGE = 15;

interface HomePageProps {
  searchParams: {
    [k in keyof ExperimentPostListFilters]?: string;
  };
}

export default async function Home({ searchParams }: HomePageProps) {
  const fetchClient = createSSRFetchClient();
  const parsedParams = URLFilterSchema().safeParse(searchParams);

  const filters = parsedParams.success
    ? { ...parsedParams.data, count: POST_PER_PAGE }
    : { recruitStatus: 'ALL', count: POST_PER_PAGE };

  const queryParams = getQueryParamsToString(filters);
  const initialPosts = await fetchClient.get<ExperimentPostResponse>(API_URL.postList(queryParams));

  const queryClient = getQueryClient();

  const queryKey = [
    QUERY_KEY.post,
    filters.recruitStatus || 'ALL',
    'gender' in filters ? filters.gender : null,
    'age' in filters ? filters.age : null,
    'region' in filters ? filters.region : null,
    'areas' in filters ? filters.areas : null,
    'matchType' in filters ? filters.matchType : null,
  ];

  await queryClient.prefetchInfiniteQuery({
    queryKey,
    queryFn: () => fetchClient.get<ExperimentPostResponse>(API_URL.postList(queryParams)),
    initialData: {
      pages: [initialPosts],
      pageParams: [1],
    },
    initialPageParam: 1,
  });

  return (
    <DefaultLayout>
      <Banner />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ExperimentPostContainer initialPosts={initialPosts} />
      </HydrationBoundary>
    </DefaultLayout>
  );
}
