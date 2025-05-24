'use client';

import { useSession } from 'next-auth/react';

import JoinHeader from './Header';
import ParticipantForm from './ParticipantForm';
import ResearcherForm from './ResearcherForm';

import { ROLE } from '@/constants/config';
import { MOBILE_JOIN_STEP_LIST, STEP } from '../JoinPage.constants';
import useFunnel from '../hooks/useFunnel';

export default function MobileJoinPage() {
  const { data: session } = useSession();
  const role = session?.role;
  const { step } = useFunnel(MOBILE_JOIN_STEP_LIST);

  if (step === STEP.success) {
    return role === ROLE.researcher ? <ResearcherForm /> : <ParticipantForm />;
  }

  return (
    <>
      <JoinHeader role={role} />
      {role === ROLE.researcher ? <ResearcherForm /> : <ParticipantForm />}
    </>
  );
}
