import { useQuery } from '@tanstack/react-query';

import { getResearcherInfo } from '@/apis/login';

interface useResearcherInfoQueryProps {
  enabled: boolean;
}

const useResearcherInfoQuery = ({ enabled }: useResearcherInfoQueryProps) => {
  return useQuery({
    queryKey: ['researcherInfo'],
    queryFn: getResearcherInfo,
    enabled,
    retry: 1,
  });
};

export default useResearcherInfoQuery;
