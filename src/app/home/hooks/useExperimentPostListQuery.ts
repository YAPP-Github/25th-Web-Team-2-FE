import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';

import { fetchPostList, ExperimentPostListFilters } from '@/apis/post';
import { QUERY_KEY } from '@/constants/queryKey';

const POST_PER_PAGE = 15;

const useExperimentPostListQuery = (filters: ExperimentPostListFilters, isLoading: boolean) => {
  const { matchType, gender, age, region, areas, recruitStatus } = filters;

  const isFilters = Object.keys(filters).length > 0;

  return useInfiniteQuery({
    queryKey: [QUERY_KEY.post, matchType, gender, age, region, areas, recruitStatus],
    queryFn: ({ pageParam }) =>
      fetchPostList({ ...filters, page: pageParam, count: POST_PER_PAGE }),
    enabled: isFilters && !isLoading,
    placeholderData: keepPreviousData,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      // getNextPageParam에서 null 또는 undefined 반환 시 hasNextPage: false
      if (lastPage.isLast) return null;

      return lastPage.page + 1;
    },
  });
};

export default useExperimentPostListQuery;
