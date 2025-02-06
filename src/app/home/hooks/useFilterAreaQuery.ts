import { useQuery } from '@tanstack/react-query';

import { fetchPostCount, PostAreaResponse } from '@/apis/post';
import { QUERY_KEY } from '@/constants/queryKey';

const useFilterAreaQuery = (region: string | null) => {
  return useQuery({
    queryKey: [QUERY_KEY.postArea, region],
    queryFn: () => fetchPostCount<PostAreaResponse>(),
    staleTime: Infinity,
    select: (data) => data.data,
    placeholderData: (prev) => prev,
  });
};

export default useFilterAreaQuery;
