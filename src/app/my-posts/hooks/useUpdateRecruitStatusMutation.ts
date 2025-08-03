import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetchClient } from '@/apis/config/fetchClient';
import { queryKey } from '@/constants/queryKey';
import { API_URL } from '@/constants/url';
import { UseMyPostsQueryResponse } from './useMyPostsQuery';

export interface UseUpdateRecruitStatusMutationParams {
  postId: string;
}

export interface UseUpdateRecruitStatusMutationResponse {
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
      queryClient.invalidateQueries({ queryKey: queryKey.myPosts.all });
    },
    onMutate: async ({ postId }) => {
      const previousData = queryClient.getQueryData<UseMyPostsQueryResponse>(queryKey.myPosts.all);

      queryClient.setQueryData<UseMyPostsQueryResponse>(queryKey.myPosts.all, (oldData) => {
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
    onError: (_, __, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKey.myPosts.all, context.previousData);
      }
    },
  });
};

export default useUpdateRecruitStatusMutation;
