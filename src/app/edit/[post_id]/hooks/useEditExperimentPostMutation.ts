import { useMutation } from '@tanstack/react-query';

import { API } from '@/apis/config';
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
    await API.put<UseEditExperimentPostMutationResponse>(url, data).then((res) => res.data);
  };

  return useMutation({
    mutationKey: [QUERY_KEY.editPost],
    mutationFn,
  });
};

export default useEditExperimentPostMutation;
