'use client';

import { useSession } from 'next-auth/react';

import useParticipantInfoQuery from './useParticipantInfoQuery';
import useResearcherInfoQuery from './useResearcherInfoQuery';

import { ROLE } from '@/constants/config';

const useUserInfo = () => {
  const { data: session, status } = useSession();

  const role = session?.role;
  const isSessionReady = status !== 'loading';
  const isParticipant = isSessionReady && role === ROLE.participant;
  const isResearcher = isSessionReady && role === ROLE.researcher;

  const participantQuery = useParticipantInfoQuery({ enabled: isParticipant });
  const researcherQuery = useResearcherInfoQuery({ enabled: isResearcher });

  const isLoading = !isSessionReady || participantQuery.isLoading || researcherQuery.isLoading;

  return {
    userInfo: isParticipant ? participantQuery.data : researcherQuery.data,
    isLoading,
    isError: participantQuery.isError || researcherQuery.isError,
    isSessionReady,
    isResearcher,
    isParticipant,
  };
};

export default useUserInfo;
