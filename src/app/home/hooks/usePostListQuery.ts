import { useQuery } from '@tanstack/react-query';

import { fetchPostList } from '@/apis/post';
import { QUERY_KEY } from '@/constants/queryKey';

const usePostListQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEY.post],
    queryFn: fetchPostList,
  });
};

export default usePostListQuery;
