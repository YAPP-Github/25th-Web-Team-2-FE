import { useMutation } from '@tanstack/react-query';

import { API } from '@/apis/config';
import { QUERY_KEY } from '@/constants/queryKey';
import { API_URL } from '@/constants/url';

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
  const mutationFn = async ({ postId }: UseUpdateRecruitStatusMutationParams) => {
    const url = API_URL.updateRecruitStatus(postId);
    return await API.patch<UseUpdateRecruitStatusMutationResponse>(url, {}).then((res) => res.data);
  };

  return useMutation({
    mutationKey: [QUERY_KEY.updateRecruitStatus],
    mutationFn,
  });
};

export default useUpdateRecruitStatusMutation;
