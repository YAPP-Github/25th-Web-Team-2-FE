'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

import ParticipantForm from './Participant/ParticipantForm';
import ResearcherForm from './Researcher/ResearcherForm';

import { ROLE } from '@/constants/config';
import { startRecording } from '@/lib/mixpanelClient';

export default function MobileJoinPage() {
  const { data: session } = useSession();
  const role = session?.role;

  useEffect(() => {
    startRecording();
  }, []);

  return <>{role === ROLE.researcher ? <ResearcherForm /> : <ParticipantForm />}</>;
}
