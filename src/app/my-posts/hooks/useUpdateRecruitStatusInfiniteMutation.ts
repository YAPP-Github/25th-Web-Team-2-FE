import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UseMyPostsQueryResponse } from './useMyPostsQuery';

import { fetchClient } from '@/apis/config/fetchClient';
import { queryKey } from '@/constants/queryKey';
import { API_URL } from '@/constants/url';

interface UseUpdateRecruitStatusInfiniteMutationParams {
  postId: string;
  params?: {
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
    onSuccess: ({ experimentPostId }) => {
      queryClient.invalidateQueries({ queryKey: queryKey.myPosts.infinite() });
      queryClient.invalidateQueries({ queryKey: queryKey.experimentPostDetail(experimentPostId) });
    },
    onMutate: async ({ postId, params }) => {
      const targetQueryKey = queryKey.myPosts.infinite(params);
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
        queryClient.setQueryData(queryKey.myPosts.infinite(variables.params), context.previousData);
      }
    },
  });
};

export default useUpdateRecruitStatusInfiniteMutation;
