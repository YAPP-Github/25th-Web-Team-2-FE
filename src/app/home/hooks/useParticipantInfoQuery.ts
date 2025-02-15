import { useQuery } from '@tanstack/react-query';

import { getParticipantInfo } from '@/apis/login';
import { QUERY_KEY } from '@/constants/queryKey';

interface useParticipantInfoQueryProps {
  enabled: boolean;
}

const useParticipantInfoQuery = ({ enabled }: useParticipantInfoQueryProps) => {
  return useQuery({
    queryKey: [QUERY_KEY.participantInfo],
    queryFn: getParticipantInfo,
    enabled,
    retry: 1,
  });
};

export default useParticipantInfoQuery;
