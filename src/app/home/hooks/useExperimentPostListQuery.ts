import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';

import { fetchPostList, ExperimentPostListFilters, ExperimentPostResponse } from '@/apis/post';
import { queryKey } from '@/constants/queryKey';

const POST_PER_PAGE = 15;

interface UseExperimentPostListQueryParams {
  filters: ExperimentPostListFilters;
  enabled: boolean;
  initialData?: ExperimentPostResponse;
}

const useExperimentPostListQuery = ({
  filters,
  enabled,
  initialData,
}: UseExperimentPostListQueryParams) => {
  return useInfiniteQuery({
    queryKey: queryKey.post.filter(filters),
    queryFn: ({ pageParam }) =>
      fetchPostList({ ...filters, page: pageParam, count: POST_PER_PAGE }),
    enabled,
    placeholderData: keepPreviousData,
    initialPageParam: 1,
    // 초기 데이터가 있으면 첫 페이지 데이터로 사용
    initialData: initialData
      ? {
          pages: [
            {
              content: initialData.content,
              page: 1,
              size: POST_PER_PAGE,
              isLast: initialData.content.length < POST_PER_PAGE,
              totalCount: initialData.totalCount,
            },
          ],
          pageParams: [1],
        }
      : undefined,
    getNextPageParam: (lastPage) => {
      // getNextPageParam에서 null 또는 undefined 반환 시 hasNextPage: false
      if (lastPage.isLast) return null;

      return lastPage.page + 1;
    },
  });
};

export default useExperimentPostListQuery;
