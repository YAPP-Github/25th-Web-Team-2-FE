import { useMutation } from '@tanstack/react-query';

import { fetchClient } from '@/apis/config/fetchClient';
import {
  ExperimentPostData,
  UploadedPostInfo,
} from '@/app/upload/hooks/useUploadExperimentPostMutation';
import { QUERY_KEY } from '@/constants/queryKey';
import { API_URL } from '@/constants/url';

export interface UseEditExperimentPostMutationResponse {
  postInfo: UploadedPostInfo;
}

const useEditExperimentPostMutation = () => {
  const mutationFn = async ({ postId, data }: { postId: string; data: ExperimentPostData }) => {
    const url = API_URL.editPost(postId);
    return await fetchClient.put<UseEditExperimentPostMutationResponse>(url, { body: data });
  };

  return useMutation({
    mutationKey: [QUERY_KEY.editPost],
    mutationFn,
  });
};

export default useEditExperimentPostMutation;
