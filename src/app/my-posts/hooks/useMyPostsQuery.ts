import { useQuery } from '@tanstack/react-query';

import { fetchClient } from '@/apis/config/fetchClient';
import { queryKey } from '@/constants/queryKey';
import { API_URL } from '@/constants/url';

export interface MyPosts {
  experimentPostId: string;
  title: string;
  uploadDate: string;
  views: number;
  recruitStatus: boolean;
}

export interface UseMyPostsQueryResponse {
  content: MyPosts[];
  page: number;
  size: number;
  totalCount: number;
  isLast: boolean;
}

interface UseMyPostsQueryParams {
  page?: number;
  count?: number;
  order?: string;
}

const useMyPostsQuery = ({ page = 1, count = 10, order = 'DESC' }: UseMyPostsQueryParams = {}) => {
  const url = API_URL.myPosts(page, count, order);
  const queryFn = () => fetchClient.get<UseMyPostsQueryResponse>(url);

  return useQuery<UseMyPostsQueryResponse>({
    queryKey: queryKey.myPosts.filter({ page, count, order }),
    queryFn,
  });
};

export default useMyPostsQuery;
