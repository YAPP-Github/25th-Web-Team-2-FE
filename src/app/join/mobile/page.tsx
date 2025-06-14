'use client';

import { useSession } from 'next-auth/react';

import JoinHeader from './components/JoinHeader/JoinHeader';
import ParticipantForm from './Participant/ParticipantForm';
import ResearcherForm from './Researcher/ResearcherForm';
import useFunnel from '../hooks/useFunnel';
import { MOBILE_STEP_MAP, STEP } from '../JoinPage.constants';

import { ROLE } from '@/constants/config';
import { Role } from '@/types/user';

export default function MobileJoinPage() {
  const { data: session } = useSession();
  const role = session?.role;

  const { step } = useFunnel(MOBILE_STEP_MAP[role as Role]);

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
