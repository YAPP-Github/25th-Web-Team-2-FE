import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { API } from '../config';

import { API_URL } from '@/constants/url';

interface UseQueryApplyMethodAPIParams {
  postId: number;
}

export interface UseQueryApplyMethodAPIResponse {
  applyMethodId: number;
  phoneNum: string | null;
  formUrl: string | null;
  content: string;
}

const useQueryApplyMethodAPI = ({ postId }: UseQueryApplyMethodAPIParams) => {
  const queryKey = API_URL.applyMethod(postId);
  const queryFn = () => API.get(queryKey).then((res) => res.data);

  return useQuery<UseQueryApplyMethodAPIResponse, AxiosError>({
    queryKey: [queryKey],
    queryFn,
    enabled: !!postId,
  });
};

export default useQueryApplyMethodAPI;
