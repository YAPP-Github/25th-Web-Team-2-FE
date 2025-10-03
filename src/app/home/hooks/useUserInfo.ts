'use client';

import { useSession } from 'next-auth/react';

import useParticipantInfoQuery from './useParticipantInfoQuery';
import useResearcherInfoQuery from './useResearcherInfoQuery';

import { ROLE } from '@/constants/config';
import { isUnauthorizedUser } from '@/lib/auth-utils';

const useUserInfo = () => {
  const { data: session, status } = useSession();

  const role = session?.role;
  const isSessionReady = status !== 'loading';
  const isParticipant = isSessionReady && !isUnauthorizedUser(session) && role === ROLE.participant;
  const isResearcher = isSessionReady && !isUnauthorizedUser(session) && role === ROLE.researcher;

  const participantQuery = useParticipantInfoQuery({ enabled: isParticipant });
  const researcherQuery = useResearcherInfoQuery({ enabled: isResearcher });

  const isLoading = !isSessionReady || participantQuery.isLoading || researcherQuery.isLoading;

  return {
    userInfo: isParticipant ? participantQuery.data : researcherQuery.data,
    isLoading,
    isError: participantQuery.isError || researcherQuery.isError,
    isResearcher,
    isParticipant,
  };
};

export default useUserInfo;
