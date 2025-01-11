import { fetchPostCount, PostSubAreaResponse } from '@/apis/post';
import { QUERY_KEY } from '@/constants/queryKey';
import { useQuery } from '@tanstack/react-query';

const useFilterSubAreaQuery = (area?: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.postSubArea, area],
    queryFn: () => fetchPostCount<PostSubAreaResponse>(area),
    staleTime: Infinity,
    enabled: !!area,
    select: (data) => data.district,
  });
};

export default useFilterSubAreaQuery;
