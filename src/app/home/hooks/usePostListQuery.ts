import { useQuery } from '@tanstack/react-query';

import { fetchPostList, ExperimentPostListFilters } from '@/apis/post';
import { QUERY_KEY } from '@/constants/queryKey';

const usePostListQuery = (filters: ExperimentPostListFilters) => {
  const { matchType, gender, age, region, areas, recruitStatus } = filters;

  return useQuery({
    queryKey: [QUERY_KEY.post, matchType, gender, age, region, areas, recruitStatus],
    queryFn: () => fetchPostList(filters),
  });
};

export default usePostListQuery;
