import { useInfiniteQuery } from '@tanstack/react-query';

import { fetchClient } from '@/apis/config/fetchClient';
import { queryKey } from '@/constants/queryKey';
import { API_URL } from '@/constants/url';
import { MyPosts } from './useMyPostsQuery';

interface UseMyPostsQueryResponse {
  content: MyPosts[];
  page: number;
  size: number;
  totalCount: number;
  isLast: boolean;
}

interface UseMyPostsInfiniteQueryParams {
  page?: number;
  count?: number;
  order?: string;
}

const useMyPostsInfiniteQuery = ({
  page = 1,
  count = 10,
  order = 'DESC',
}: UseMyPostsInfiniteQueryParams = {}) => {
  return useInfiniteQuery({
    queryKey: queryKey.myPosts.filter({ page, count, order }),
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
