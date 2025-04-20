import { useQuery } from '@tanstack/react-query';

import { fetchPostCount, PostAreaResponse } from '@/apis/post';
import { QUERY_KEY } from '@/constants/queryKey';

// region을 선택해야 지역별 공고 개수 조회 가능
const usePostAreaCountQuery = (region?: string | null) => {
  return useQuery({
    queryKey: [QUERY_KEY.postArea, region],
    queryFn: () => fetchPostCount<PostAreaResponse>(region),
    select: (data) => data.data,
    staleTime: Infinity,
    enabled: !!region,
  });
};

export default usePostAreaCountQuery;
