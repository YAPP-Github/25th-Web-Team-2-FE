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
import { ROLE } from '@/constants/config';
import type { ParticipantResponse, ResearcherResponse } from '@/apis/login';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-utils';
import { calculateAgeFromBirthDate } from './home.utils';
import { isParticipantInfo } from '@/utils/typeGuard';

const POST_PER_PAGE = 15;

interface HomePageProps {
  searchParams: {
    [k in keyof ExperimentPostListFilters]?: string;
  };
}

export default async function Home({ searchParams }: HomePageProps) {
  const session = await getServerSession(authOptions);
  const queryClient = getQueryClient();
  const fetchClient = createSSRFetchClient(session?.accessToken);
  const hasQueryParams = Object.keys(searchParams).length > 0;

  const initialUserInfo = session?.role
    ? await fetchClient.get<ParticipantResponse | ResearcherResponse>(
        API_URL.me(session.role.toLowerCase()),
      )
    : null;

  const initialGender =
    initialUserInfo && isParticipantInfo(initialUserInfo) ? initialUserInfo.gender : undefined;
  const initialAge =
    initialUserInfo && isParticipantInfo(initialUserInfo)
      ? calculateAgeFromBirthDate(initialUserInfo.birthDate)
      : undefined;

  const parsedParamsResult = URLFilterSchema().safeParse({
    gender: hasQueryParams ? undefined : initialGender,
    age: hasQueryParams ? undefined : initialAge,
    ...searchParams,
  });

  const filters: ExperimentPostListFilters = parsedParamsResult.success
    ? { ...parsedParamsResult.data, count: POST_PER_PAGE }
    : { recruitStatus: 'ALL', count: POST_PER_PAGE };

  const queryParams = getQueryParamsToString({ ...filters });
  const initialPosts = await fetchClient.get<ExperimentPostResponse>(API_URL.postList(queryParams));

  if (session?.role) {
    await queryClient.prefetchQuery({
      queryKey: queryKey.userInfo(session.role),
      queryFn: () => Promise.resolve(initialUserInfo),
    });
  }

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
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DefaultLayout>
        <Banner />
        <ExperimentPostContainer
          initialPosts={initialPosts}
          initialGender={hasQueryParams ? undefined : initialGender}
          initialAge={hasQueryParams ? undefined : initialAge}
        />
      </DefaultLayout>
    </HydrationBoundary>
  );
}
