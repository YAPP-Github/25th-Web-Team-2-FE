import { useQuery } from '@tanstack/react-query';

import { getResearcherInfo } from '@/apis/login';
import { QUERY_KEY } from '@/constants/queryKey';

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
