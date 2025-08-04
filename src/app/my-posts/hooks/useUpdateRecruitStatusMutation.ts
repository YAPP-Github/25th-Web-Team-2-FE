import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UseMyPostsQueryResponse } from './useMyPostsQuery';

import { fetchClient } from '@/apis/config/fetchClient';
import { queryKey } from '@/constants/queryKey';
import { API_URL } from '@/constants/url';

interface UseUpdateRecruitStatusMutationParams {
  postId: string;
  params?: {
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

const useUpdateRecruitStatusMutation = () => {
  const queryClient = useQueryClient();

  const mutationFn = async ({ postId }: UseUpdateRecruitStatusMutationParams) => {
    const url = API_URL.updateRecruitStatus(postId);
    return await fetchClient.patch<UseUpdateRecruitStatusMutationResponse>(url);
  };

  return useMutation({
    mutationKey: queryKey.updateRecruitStatus,
    mutationFn,
    onSuccess: ({ experimentPostId }) => {
      queryClient.invalidateQueries({ queryKey: queryKey.post.all });
      queryClient.invalidateQueries({ queryKey: queryKey.experimentPostDetail(experimentPostId) });
    },
    onMutate: async ({ postId, params }) => {
      const targetQueryKey = queryKey.myPosts.filter(params);

      const previousData = queryClient.getQueryData<UseMyPostsQueryResponse>(targetQueryKey);

      queryClient.setQueryData<UseMyPostsQueryResponse>(targetQueryKey, (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          content: oldData.content.map((post) =>
            post.experimentPostId === postId ? { ...post, recruitStatus: false } : post,
          ),
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

export default useUpdateRecruitStatusMutation;
