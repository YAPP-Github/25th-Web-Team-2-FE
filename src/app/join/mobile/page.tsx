import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import ParticipantForm from './Participant/ParticipantForm';
import ResearcherForm from './Researcher/ResearcherForm';

import { ROLE } from '@/constants/config';
import { authOptions } from '@/lib/auth-utils';

export default async function MobileJoinPage() {
  const session = await getServerSession(authOptions);
  const role = session?.role;

  if (!role) {
    redirect('/login');
  }

  return <>{role === ROLE.researcher ? <ResearcherForm /> : <ParticipantForm />}</>;
}
