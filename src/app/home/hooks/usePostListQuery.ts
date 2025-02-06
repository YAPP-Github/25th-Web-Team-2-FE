import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { fetchPostList, ExperimentPostListFilters } from '@/apis/post';
import { QUERY_KEY } from '@/constants/queryKey';

const usePostListQuery = (filters: ExperimentPostListFilters, isLoading: boolean) => {
  const { matchType, gender, age, region, areas, recruitStatus } = filters;

  const isFilters = Object.keys(filters).length > 0;

  return useQuery({
    queryKey: [QUERY_KEY.post, matchType, gender, age, region, areas, recruitStatus],
    queryFn: () => fetchPostList(filters),
    enabled: isFilters && !isLoading,
    placeholderData: keepPreviousData,
  });
};

export default usePostListQuery;
