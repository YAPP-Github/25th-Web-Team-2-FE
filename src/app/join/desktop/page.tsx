'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

import { joinLayout } from '../JoinPage.css';
import ParticipantForm from './Participant/ParticipantForm';
import ResearcherForm from './Researcher/ResearcherForm';

import { ROLE } from '@/constants/config';
import { startRecording } from '@/lib/mixpanelClient';

export default function JoinPage() {
  const { data: session } = useSession();

  const role = session?.role;
  const isResearcher = role === ROLE.researcher;

  useEffect(() => {
    startRecording();
  }, []);

  return (
    <section className={joinLayout}>
      {isResearcher ? <ResearcherForm /> : <ParticipantForm />}
    </section>
  );
}
