import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetchClient } from '@/apis/config/fetchClient';
import { queryKey } from '@/constants/queryKey';
import { API_URL } from '@/constants/url';
import { UseMyPostsQueryResponse } from './useMyPostsQuery';

interface UseUpdateRecruitStatusInfiniteMutationParams {
  postId: string;
  params: {
    page: number;
    count: number;
    order: 'ASC' | 'DESC';
  };
}

interface UseUpdateRecruitStatusMutationResponse {
  experimentPostId: string;
  title: string;
  content: string;
  views: number;
  recruitStatus: boolean;
  uploadDate: string;
}

interface UseMyPostsInfiniteQueryResponse {
  pageParams: number[];
  pages: UseMyPostsQueryResponse[];
}

const useUpdateRecruitStatusInfiniteMutation = () => {
  const queryClient = useQueryClient();

  const mutationFn = async ({ postId }: UseUpdateRecruitStatusInfiniteMutationParams) => {
    const url = API_URL.updateRecruitStatus(postId);
    return await fetchClient.patch<UseUpdateRecruitStatusMutationResponse>(url);
  };

  return useMutation({
    mutationKey: queryKey.updateRecruitStatus,
    mutationFn,
    onMutate: async ({ postId, params }) => {
      const targetQueryKey = queryKey.myPosts.filter(params);
      const previousData =
        queryClient.getQueryData<UseMyPostsInfiniteQueryResponse>(targetQueryKey);

      queryClient.setQueryData<UseMyPostsInfiniteQueryResponse>(targetQueryKey, (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            content: page.content.map((post) =>
              post.experimentPostId === postId ? { ...post, recruitStatus: false } : post,
            ),
          })),
        };
      });

      return { previousData };
    },
    onError: (_, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKey.myPosts.filter(variables.params), context.previousData);
      }
    },
  });
};

export default useUpdateRecruitStatusInfiniteMutation;
