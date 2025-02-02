import { useQuery } from '@tanstack/react-query';

import { getParticipantInfo } from '@/apis/login';

interface useParticipantInfoQueryProps {
  enabled: boolean;
}

const useParticipantInfoQuery = ({ enabled }: useParticipantInfoQueryProps) => {
  return useQuery({
    queryKey: ['participantInfo'],
    queryFn: getParticipantInfo,
    enabled,
    retry: 1,
  });
};

export default useParticipantInfoQuery;
