import { useQuery } from '@tanstack/react-query';

import { fetchPostCount, PostAreaResponse } from '@/apis/post';
import { QUERY_KEY } from '@/constants/queryKey';

const usePostAreaCountQuery = (area?: string | null) => {
  return useQuery({
    queryKey: [QUERY_KEY.postArea, area],
    queryFn: () => fetchPostCount<PostAreaResponse>(area),
    select: (data) => data.data,
    staleTime: Infinity,
    enabled: !!area,
  });
};

export default usePostAreaCountQuery;
