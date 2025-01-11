import { useQuery } from '@tanstack/react-query';

import { fetchPostCount, PostAreaResponse } from '@/apis/post';
import { QUERY_KEY } from '@/constants/queryKey';

const useFilterAreaQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEY.postArea],
    queryFn: () => fetchPostCount<PostAreaResponse>(),
    staleTime: Infinity,
    select: (data) => data.area,
  });
};

export default useFilterAreaQuery;
