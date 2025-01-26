import { useQuery } from '@tanstack/react-query';

import { fetchPostList, PostListParams } from '@/apis/post';
import { QUERY_KEY } from '@/constants/queryKey';

const usePostListQuery = (params: PostListParams, isUserInfo: boolean) => {
  const { matchType, gender, age, region, areas, recruitStatus } = params;

  return useQuery({
    queryKey: [QUERY_KEY.post, matchType, gender, age, region, areas, recruitStatus],
    queryFn: () => fetchPostList(params),
    enabled: !!isUserInfo,
  });
};

export default usePostListQuery;
