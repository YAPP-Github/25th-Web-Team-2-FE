import { useQuery } from '@tanstack/react-query';

import { getResearcherInfo } from '@/apis/login';

export const useResearcherInfoQuery = () => {
  const role = sessionStorage.getItem('role');
  const userRole = role === 'RESEARCHER' ? 'researchers' : 'participants';

  return useQuery({
    queryKey: ['researcherInfo'],
    queryFn: getResearcherInfo,
    enabled: !!userRole,
    retry: 1,
  });
};
