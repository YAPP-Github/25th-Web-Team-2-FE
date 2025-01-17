import { useQuery } from '@tanstack/react-query';

import { fetchPostList, PostListParams } from '@/apis/post';
import { QUERY_KEY } from '@/constants/queryKey';

const usePostListQuery = (params: PostListParams = {}) => {
  const { matchType, gender, age, region, recruitDone } = params;

  return useQuery({
    queryKey: [QUERY_KEY.post, matchType, gender, age, region, recruitDone],
    queryFn: () => fetchPostList(params),
  });
};

export default usePostListQuery;
