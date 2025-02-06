import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { API } from '@/apis/config';
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

const useMyPostsQuery = ({ page = 1, count = 10, order = 'DESC' }: UseMyPostsQueryParams) => {
  const queryKey = API_URL.myPosts(page, count, order);
  const queryFn = () => API.get<UseMyPostsQueryResponse>(queryKey).then((res) => res.data);

  return useQuery<UseMyPostsQueryResponse, AxiosError>({
    queryKey: ['myPosts', page, count, order],
    queryFn,
  });
};

export default useMyPostsQuery;
