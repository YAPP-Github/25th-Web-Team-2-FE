import { getResearcherInfo } from '@/apis/login';
import { useQuery } from '@tanstack/react-query';

export const useResearcherInfoQuery = () => {
  const role = sessionStorage.getItem('role');
  const userRole = role === 'RESEARCHER' ? 'researchers' : 'participants';

  return useQuery({
    queryKey: ['researcherInfo'],
    queryFn: getResearcherInfo,
    enabled: !!role,
    retry: 1,
  });
};
