import { useQuery } from '@tanstack/react-query';

import { fetchPostCount, PostRegionResponse } from '@/apis/post';
import { queryKey } from '@/constants/queryKey';

const usePostRegionCountQuery = (region: string | null) => {
  return useQuery({
    queryKey: queryKey.postRegion(region),
    queryFn: () => fetchPostCount<PostRegionResponse>(),
    select: (data) => data.data,
    staleTime: Infinity,
    placeholderData: (prev) => prev,
  });
};

export default usePostRegionCountQuery;
