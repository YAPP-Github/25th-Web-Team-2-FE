import { useQuery } from '@tanstack/react-query';

import { QUERY_KEY } from '@/constants/queryKey';
import { getResearcherInfo } from '@/apis/user';

interface useResearcherInfoQueryProps {
  enabled: boolean;
}

const useResearcherInfoQuery = ({ enabled }: useResearcherInfoQueryProps) => {
  return useQuery({
    queryKey: [QUERY_KEY.researcherInfo],
    queryFn: getResearcherInfo,
    enabled,
    retry: 0,
  });
};

export default useResearcherInfoQuery;
