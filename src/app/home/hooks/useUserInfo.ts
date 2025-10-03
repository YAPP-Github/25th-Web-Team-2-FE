'use client';

import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useRef } from 'react';

import useParticipantInfoQuery from './useParticipantInfoQuery';
import useResearcherInfoQuery from './useResearcherInfoQuery';

import { ROLE } from '@/constants/config';
import { isUnauthorizedUser } from '@/lib/auth-utils';

const useUserInfo = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const isExecuted = useRef(false);

  const role = session?.role;
  const isSessionReady = status !== 'loading';
  const isParticipant = isSessionReady && !isUnauthorizedUser(session) && role === ROLE.participant;
  const isResearcher = isSessionReady && !isUnauthorizedUser(session) && role === ROLE.researcher;

  const participantQuery = useParticipantInfoQuery({ enabled: isParticipant });
  const researcherQuery = useResearcherInfoQuery({ enabled: isResearcher });

  const isLoading = !isSessionReady || participantQuery.isLoading || researcherQuery.isLoading;

  useEffect(() => {
    if (isExecuted.current) return;

    if (isUnauthorizedUser(session) && !pathname.startsWith('/join')) {
      signOut({ redirect: false });
      isExecuted.current = true;
    }
  }, [session, pathname]);

  return {
    userInfo: isParticipant ? participantQuery.data : researcherQuery.data,
    isLoading,
    isError: participantQuery.isError || researcherQuery.isError,
    isResearcher,
    isParticipant,
  };
};

export default useUserInfo;
