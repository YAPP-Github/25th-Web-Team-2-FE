'use client';

import { useSession } from 'next-auth/react';

import JoinHeader from './Header';
import ParticipantForm from './ParticipantForm';
import ResearcherForm from './ResearcherForm';

import { ROLE } from '@/constants/config';

export default function MobileJoinPage() {
  const { data: session } = useSession();
  const role = session?.role;

  return (
    <>
      <JoinHeader role={role} />
      {role === ROLE.researcher ? <ResearcherForm /> : <ParticipantForm />}
    </>
  );
}
