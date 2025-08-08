import { useInfiniteQuery } from '@tanstack/react-query';

import { MyPosts } from './useMyPostsQuery';

import { fetchClient } from '@/apis/config/fetchClient';
import { queryKey } from '@/constants/queryKey';
import { API_URL } from '@/constants/url';

interface UseMyPostsQueryResponse {
  content: MyPosts[];
  page: number;
  size: number;
  totalCount: number;
  isLast: boolean;
}

interface UseMyPostsInfiniteQueryParams {
  count?: number;
  order?: string;
}

const useMyPostsInfiniteQuery = ({
  count = 10,
  order = 'DESC',
}: UseMyPostsInfiniteQueryParams = {}) => {
  return useInfiniteQuery({
    queryKey: queryKey.myPosts.infinite({ count, order }),
    queryFn: ({ pageParam }) => {
      const url = API_URL.myPosts(pageParam, count, order);
      return fetchClient.get<UseMyPostsQueryResponse>(url);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.isLast) return null;
      return lastPage.page + 1;
    },
  });
};

export default useMyPostsInfiniteQuery;
