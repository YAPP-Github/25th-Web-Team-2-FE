import { getServerSession } from 'next-auth';

import ContactEmailStep from './ContactEmailStep';
import JoinHeader from './Header';
import { layout } from './page.css';

import { authOptions } from '@/lib/auth-utils';

async function MobileJoinPage() {
  const session = await getServerSession(authOptions);
  const role = session?.role;
  const provider = session?.provider;
  const oauthEmail = session?.oauthEmail;

  return (
    <div className={layout}>
      <JoinHeader role={role} />
      <ContactEmailStep role={role} provider={provider} oauthEmail={oauthEmail} />
    </div>
  );
}

export default MobileJoinPage;
