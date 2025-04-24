import { useQuery } from '@tanstack/react-query';

import { API } from '@/apis/config';
import { CustomError } from '@/apis/config/error';
import { UseQueryExperimentDetailsAPIResponse } from '@/app/post/[post_id]/hooks/useExperimentDetailsQuery';
import { QUERY_KEY } from '@/constants/queryKey';
import { API_URL } from '@/constants/url';

const useOriginExperimentPostQuery = ({ postId }: { postId: string | undefined }) => {
  const url = API_URL.originExperimentPost(postId ?? '');
  const queryFn = () => API.get(url).then((res) => res.data);

  return useQuery<UseQueryExperimentDetailsAPIResponse, CustomError>({
    queryKey: [QUERY_KEY.originExperimentPost, postId],
    queryFn,
    enabled: !!postId,
    retry: false,
  });
};

export default useOriginExperimentPostQuery;
