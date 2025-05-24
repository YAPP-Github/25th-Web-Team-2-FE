'use client';

import { useSession } from 'next-auth/react';

import JoinHeader from './components/JoinHeader/JoinHeader';
import ParticipantForm from './Participant/ParticipantForm';
import ResearcherForm from './Researcher/ResearcherForm';
import useFunnel from '../hooks/useFunnel';
import { MOBILE_JOIN_STEP_LIST, STEP } from '../JoinPage.constants';

import { ROLE } from '@/constants/config';

export default function MobileJoinPage() {
  const { step } = useFunnel(MOBILE_JOIN_STEP_LIST);
  const { data: session } = useSession();
  const role = session?.role;

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
