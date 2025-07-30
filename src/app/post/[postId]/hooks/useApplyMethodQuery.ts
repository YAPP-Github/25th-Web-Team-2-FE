import { useQuery } from '@tanstack/react-query';

import { CustomError } from '@/apis/config/error';
import { fetchClient } from '@/apis/config/fetchClient';
import { queryKey } from '@/constants/queryKey';
import { API_URL } from '@/constants/url';

interface UseApplyMethodQueryParams {
  postId: string | undefined;
}

export interface UseApplyMethodQueryResponse {
  applyMethodId: number;
  phoneNum: string | null;
  formUrl: string | null;
  content: string;
}

const useApplyMethodQuery = ({ postId }: UseApplyMethodQueryParams) => {
  const url = API_URL.applyMethod(postId ?? '');
  const queryFn = () =>
    fetchClient.get<UseApplyMethodQueryResponse>(url, {
      requireAuth: false,
    });

  return useQuery<UseApplyMethodQueryResponse, CustomError>({
    queryKey: queryKey.applyMethod(postId ?? ''),
    queryFn,
    enabled: !!postId,
  });
};

export default useApplyMethodQuery;
