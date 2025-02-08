import { useMutation } from '@tanstack/react-query';

import { API } from '@/apis/config';
import { QUERY_KEY } from '@/constants/queryKey';
import { API_URL } from '@/constants/url';

interface UseDeleteExperimentPostMutationParams {
  postId: string;
}

export interface UseDeleteExperimentPostMutationResponse {
  success: boolean;
}

const useDeleteExperimentPostMutation = () => {
  const mutationFn = async ({ postId }: UseDeleteExperimentPostMutationParams) => {
    const url = API_URL.deletePost(postId);
    return await API.delete<UseDeleteExperimentPostMutationResponse>(url, {}).then(
      (res) => res.data,
    );
  };

  return useMutation({
    mutationKey: [QUERY_KEY.deletePost],
    mutationFn,
  });
};

export default useDeleteExperimentPostMutation;
