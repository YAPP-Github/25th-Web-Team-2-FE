import Banner from './components/Banner/Banner';
import ExperimentPostContainer from './components/ExperimentPostContainer/ExperimentPostContainer';

import { createSSRFetchClient } from '@/apis/config/fetchClient';
import type { ExperimentPostListFilters, ExperimentPostResponse } from '@/apis/post';
import DefaultLayout from '@/components/layout/DefaultLayout/DefaultLayout';
import { QUERY_KEY, queryKey } from '@/constants/queryKey';
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
  const queryClient = getQueryClient();
  const fetchClient = createSSRFetchClient();
  const parsedParams = URLFilterSchema().safeParse(searchParams);

  const filters: ExperimentPostListFilters = parsedParams.success
    ? { ...parsedParams.data, count: POST_PER_PAGE }
    : { recruitStatus: 'ALL', count: POST_PER_PAGE };

  const queryParams = getQueryParamsToString({ ...filters });
  const initialPosts = await fetchClient.get<ExperimentPostResponse>(API_URL.postList(queryParams));

  await queryClient.prefetchInfiniteQuery({
    queryKey: queryKey.post(filters),
    queryFn: () => Promise.resolve(initialPosts),
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
