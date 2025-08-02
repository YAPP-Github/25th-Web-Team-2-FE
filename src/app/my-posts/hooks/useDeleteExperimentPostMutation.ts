import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetchClient } from '@/apis/config/fetchClient';
import { queryKey } from '@/constants/queryKey';
import { API_URL } from '@/constants/url';

interface UseDeleteExperimentPostMutationParams {
  postId: string;
}

export interface UseDeleteExperimentPostMutationResponse {
  success: boolean;
}

const useDeleteExperimentPostMutation = () => {
  const queryClient = useQueryClient();

  const mutationFn = async ({ postId }: UseDeleteExperimentPostMutationParams) => {
    const url = API_URL.deletePost(postId);
    return await fetchClient.delete<UseDeleteExperimentPostMutationResponse>(url);
  };

  return useMutation({
    mutationFn: mutationFn,
    mutationKey: queryKey.deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey.post() });
      queryClient.invalidateQueries({ queryKey: queryKey.myPosts.all });
    },
  });
};

export default useDeleteExperimentPostMutation;
