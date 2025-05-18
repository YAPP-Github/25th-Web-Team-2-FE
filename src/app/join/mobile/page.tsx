'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { FormProvider } from 'react-hook-form';

import JoinHeader from './Header';
import { layout } from './page.css';
import JoinSuccessStep from '../components/JoinSuccessStep/JoinSuccessStep';
import useFunnel from '../hooks/useFunnel';
import { useParticipantJoin } from '../hooks/useParticipantJoin';
import { STEP } from '../JoinPage.constants';
import { Participant } from './Participant';

import { LoginProvider } from '@/types/user';

export default function MobileJoinPage() {
  const { data: session } = useSession();
  const role = session?.role;
  const provider = session?.provider;
  const oauthEmail = session?.oauthEmail;

  const { Funnel, Step, setStep } = useFunnel(['email', 'info', 'success'] as const);

  const { participantMethods, handleSubmit } = useParticipantJoin({
    initialValues: {
      provider: provider as LoginProvider,
      oauthEmail: oauthEmail || '',
    },
    onSuccess: () => {
      setStep(STEP.success);
    },
  });

  return (
    // <div className={layout}>
    //   <JoinHeader role={role} />
    //   <ContactEmailStep role={role} provider={provider} oauthEmail={oauthEmail} />
    // </div>

    <FormProvider {...participantMethods}>
      <Funnel>
        <Step name={STEP.email}>
          <Participant.ContactEmailStep
            provider={provider}
            oauthEmail={oauthEmail}
            onNext={() => setStep(STEP.info)}
          />
        </Step>
        <Step name={STEP.success}>
          <JoinSuccessStep />
        </Step>
      </Funnel>
    </FormProvider>
  );
}
