import { useQuery } from '@tanstack/react-query';

import { getParticipantInfo } from '@/apis/user';
import { QUERY_KEY, queryKey } from '@/constants/queryKey';
import { ROLE } from '@/constants/config';

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
