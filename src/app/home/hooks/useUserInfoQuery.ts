import { useQuery } from '@tanstack/react-query';

import { getParticipantInfo, getResearcherInfo } from '@/apis/login';
import { ROLE } from '@/constants/config';

export const useUserInfoQuery = (role: string) => {
  if (role === ROLE.researcher) {
    return useQuery({
      queryKey: ['researcherInfo'],
      queryFn: getResearcherInfo,
      enabled: !!role,
      retry: 1,
    });
  }

  return useQuery({
    queryKey: ['participantInfo'],
    queryFn: getParticipantInfo,
    enabled: !!role,
    retry: 1,
  });
};
