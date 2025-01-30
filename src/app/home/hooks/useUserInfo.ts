import useParticipantInfoQuery from './useParticipantInfoQuery';
import useResearcherInfoQuery from './useResearcherInfoQuery';

import { ROLE } from '@/constants/config';
import useSessionStorage from '@/hooks/useSessionStorage';

const useUserInfo = () => {
  const role = useSessionStorage('role');
  const isParticipant = role === ROLE.participant;
  const isResearcher = role === ROLE.researcher;

  const participantQuery = useParticipantInfoQuery({ enabled: isParticipant });
  const researcherQuery = useResearcherInfoQuery({ enabled: isResearcher });

  return {
    userInfo: isParticipant ? participantQuery.data : researcherQuery.data,
    isLoading: participantQuery.isLoading || researcherQuery.isLoading,
    isError: participantQuery.isError || researcherQuery.isError,
  };
};

export default useUserInfo;
