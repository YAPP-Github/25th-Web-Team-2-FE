import { useQuery } from '@tanstack/react-query';

import { fetchPostCount, PostRegionResponse } from '@/apis/post';
import { QUERY_KEY } from '@/constants/queryKey';

const usePostRegionCountQuery = (region: string | null) => {
  return useQuery({
    queryKey: [QUERY_KEY.postRegion, region],
    queryFn: () => fetchPostCount<PostRegionResponse>(),
    select: (data) => data.data,
    staleTime: Infinity,
    placeholderData: (prev) => prev,
  });
};

export default usePostRegionCountQuery;
