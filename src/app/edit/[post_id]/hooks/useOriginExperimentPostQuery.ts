import { useQuery } from '@tanstack/react-query';

import { fetchClient } from '@/apis/config/fetchClient';
import { UseQueryExperimentDetailsAPIResponse } from '@/app/post/[post_id]/hooks/useExperimentDetailsQuery';
import { QUERY_KEY } from '@/constants/queryKey';
import { API_URL } from '@/constants/url';

const useOriginExperimentPostQuery = ({ postId }: { postId?: string }) => {
  const url = API_URL.originExperimentPost(postId ?? '');
  const queryFn = () => fetchClient.get(url);

  return useQuery<UseQueryExperimentDetailsAPIResponse>({
    queryKey: [QUERY_KEY.originExperimentPost, postId],
    queryFn,
    enabled: !!postId,
    retry: false,
  });
};

export default useOriginExperimentPostQuery;
