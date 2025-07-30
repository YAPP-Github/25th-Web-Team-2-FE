import { useQuery } from '@tanstack/react-query';

import { getResearcherInfo } from '@/apis/user';
import { ROLE } from '@/constants/config';
import { queryKey } from '@/constants/queryKey';

interface useResearcherInfoQueryProps {
  enabled: boolean;
}

const useResearcherInfoQuery = ({ enabled }: useResearcherInfoQueryProps) => {
  return useQuery({
    queryKey: queryKey.userInfo(ROLE.researcher),
    queryFn: getResearcherInfo,
    enabled,
    retry: 0,
  });
};

export default useResearcherInfoQuery;
