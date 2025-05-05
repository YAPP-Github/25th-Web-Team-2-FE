import { useQuery } from '@tanstack/react-query';

import { QUERY_KEY } from '@/constants/queryKey';
import { getParticipantInfo } from '@/apis/user';

interface useParticipantInfoQueryProps {
  enabled: boolean;
}

const useParticipantInfoQuery = ({ enabled }: useParticipantInfoQueryProps) => {
  return useQuery({
    queryKey: [QUERY_KEY.participantInfo],
    queryFn: getParticipantInfo,
    enabled,
    retry: 0,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

export default useParticipantInfoQuery;
