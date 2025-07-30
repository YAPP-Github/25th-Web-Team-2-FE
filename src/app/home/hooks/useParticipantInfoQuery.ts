import { useQuery } from '@tanstack/react-query';

import { getParticipantInfo } from '@/apis/user';
import { ROLE } from '@/constants/config';
import { queryKey } from '@/constants/queryKey';

interface useParticipantInfoQueryProps {
  enabled: boolean;
}

const useParticipantInfoQuery = ({ enabled }: useParticipantInfoQueryProps) => {
  return useQuery({
    queryKey: queryKey.userInfo(ROLE.participant),
    queryFn: getParticipantInfo,
    enabled,
    retry: 0,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

export default useParticipantInfoQuery;
