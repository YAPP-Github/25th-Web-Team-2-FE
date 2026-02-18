import 'server-only';

import { getServerSession } from 'next-auth';

import { calculateAgeFromBirthDate } from '../home.utils';
import { fetchParticipantInfo } from './fetchParticipantInfo';

import { createSSRFetchClient } from '@/apis/config/fetchClient';
import { ExperimentPostListFilters, ExperimentPostResponse } from '@/apis/post';
import { DEFAULT_RECRUIT_STATUS } from '@/constants/filters';
import { API_URL } from '@/constants/url';
import { authOptions } from '@/lib/auth-utils';
import { URLFilterSchema } from '@/schema/filter/URLFilterSchema';
import { getQueryParamsToString } from '@/utils/getQueryParamsString';

const POST_PER_PAGE = 15;

interface FetchExperimentPostsParams {
  searchParams: {
    [k in keyof ExperimentPostListFilters]?: string;
  };
}

export const fetchExperimentPosts = async ({ searchParams }: FetchExperimentPostsParams) => {
  const session = await getServerSession(authOptions);
  const fetchClient = createSSRFetchClient(session?.accessToken);
  const hasQueryParams = Object.keys(searchParams).length > 0;

  const participantInfo = await fetchParticipantInfo();

  const initialGender = participantInfo ? participantInfo.gender : undefined;
  const initialAge = participantInfo
    ? calculateAgeFromBirthDate(participantInfo.birthDate)
    : undefined;

  const parsedParamsResult = URLFilterSchema().safeParse({
    gender: hasQueryParams ? undefined : initialGender,
    age: hasQueryParams ? undefined : initialAge,
    ...searchParams,
  });

  const filters: ExperimentPostListFilters = parsedParamsResult.success
    ? { ...parsedParamsResult.data, count: POST_PER_PAGE }
    : { recruitStatus: DEFAULT_RECRUIT_STATUS, count: POST_PER_PAGE };

  const queryString = getQueryParamsToString({ ...filters });
  const initialPosts = await fetchClient.get<ExperimentPostResponse>(
    API_URL.postList(queryString),
    {
      requireAuth: false,
      next: { tags: ['experiment-posts'] },
    },
  );

  return initialPosts;
};
