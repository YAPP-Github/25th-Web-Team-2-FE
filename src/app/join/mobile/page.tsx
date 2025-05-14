'use client';

import { useSession } from 'next-auth/react';

import ContactEmailStep from './ContactEmailStep';
import JoinHeader from './Header';
import { layout } from './page.css';

export default function MobileJoinPage() {
  const { data: session } = useSession();
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
