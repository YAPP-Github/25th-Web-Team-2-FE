import { fetchPostCount, PostAreaResponse } from '@/apis/post';
import { QUERY_KEY } from '@/constants/queryKey';
import { useQuery } from '@tanstack/react-query';

const useFilterAreaQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEY.postArea],
    queryFn: () => fetchPostCount<PostAreaResponse>(),
    staleTime: Infinity,
    select: (data) => data.area,
  });
};

export default useFilterAreaQuery;
