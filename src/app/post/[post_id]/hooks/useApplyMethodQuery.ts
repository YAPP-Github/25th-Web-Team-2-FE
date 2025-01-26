import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { API } from '@/apis/config';
import { API_URL } from '@/constants/url';

interface UseApplyMethodQueryParams {
  postId: number;
}

export interface UseApplyMethodQueryResponse {
  applyMethodId: number;
  phoneNum: string | null;
  formUrl: string | null;
  content: string;
}

const useApplyMethodQuery = ({ postId }: UseApplyMethodQueryParams) => {
  const queryKey = API_URL.applyMethod(postId);
  const queryFn = () => API.get(queryKey).then((res) => res.data);

  return useQuery<UseApplyMethodQueryResponse, AxiosError>({
    queryKey: [queryKey],
    queryFn,
    enabled: !!postId,
  });
};

export default useApplyMethodQuery;
