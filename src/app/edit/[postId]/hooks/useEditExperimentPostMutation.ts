import { useMutation } from '@tanstack/react-query';

import { CustomError } from '@/apis/config/error';
import { fetchClient } from '@/apis/config/fetchClient';
import {
  ExperimentPostData,
  UploadedPostInfo,
} from '@/app/upload/hooks/useUploadExperimentPostMutation';
import { queryKey } from '@/constants/queryKey';
import { API_URL } from '@/constants/url';

export interface UseEditExperimentPostMutationResponse {
  postInfo: UploadedPostInfo;
}

const useEditExperimentPostMutation = () => {
  const mutationFn = async ({ postId, data }: { postId: string; data: ExperimentPostData }) => {
    const url = API_URL.editPost(postId);
    return await fetchClient.put<UseEditExperimentPostMutationResponse>(url, { body: data });
  };

  return useMutation<
    UseEditExperimentPostMutationResponse,
    CustomError,
    { postId: string; data: ExperimentPostData }
  >({
    mutationKey: queryKey.editPost,
    mutationFn,
  });
};

export default useEditExperimentPostMutation;
