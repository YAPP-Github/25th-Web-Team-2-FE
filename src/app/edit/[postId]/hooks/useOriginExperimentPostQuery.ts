import { useQuery } from '@tanstack/react-query';

import { CustomError } from '@apis/config/error';
import { fetchClient } from '@apis/config/fetchClient';
import { queryKey } from '@constants/queryKey';
import { API_URL } from '@constants/url';
import { UseQueryExperimentDetailsAPIResponse } from '@post/[postId]/hooks/useExperimentDetailsQuery';

const useOriginExperimentPostQuery = ({ postId }: { postId?: string }) => {
  const url = API_URL.originExperimentPost(postId ?? '');
  const queryFn = () => fetchClient.get<UseQueryExperimentDetailsAPIResponse>(url);

  return useQuery<UseQueryExperimentDetailsAPIResponse, CustomError>({
    queryKey: queryKey.originExperimentPost(postId ?? ''),
    queryFn,
    enabled: !!postId,
    retry: false,
  });
};

export default useOriginExperimentPostQuery;
