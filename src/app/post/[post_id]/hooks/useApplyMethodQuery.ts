import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { API } from '@/apis/config';
import { QUERY_KEY } from '@/constants/queryKey';
import { API_URL } from '@/constants/url';

interface UseApplyMethodQueryParams {
  postId: string;
}

export interface UseApplyMethodQueryResponse {
  applyMethodId: number;
  phoneNum: string | null;
  formUrl: string | null;
  content: string;
}

const useApplyMethodQuery = ({ postId }: UseApplyMethodQueryParams) => {
  const url = API_URL.applyMethod(postId);
  const queryFn = () => API.get(url).then((res) => res.data);

  return useQuery<UseApplyMethodQueryResponse, AxiosError>({
    queryKey: [QUERY_KEY.applyMethod, postId],
    queryFn,
    enabled: !!postId,
  });
};

export default useApplyMethodQuery;
