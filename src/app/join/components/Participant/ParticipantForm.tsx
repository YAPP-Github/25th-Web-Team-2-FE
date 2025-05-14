import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { FormProvider } from 'react-hook-form';

import useFunnel from '../../hooks/useFunnel';
import { useParticipantJoin } from '../../hooks/useParticipantJoin';
import { STEP } from '../../JoinPage.constants';
import JoinSuccessStep from '../JoinSuccessStep/JoinSuccessStep';

import { Participant } from '.';

import { LoginProvider } from '@/types/user';

const ParticipantForm = () => {
  const { data: session } = useSession();
  const oauthEmail = session?.oauthEmail;
  const provider = session?.provider;

  const { Funnel, Step, setStep } = useFunnel(['email', 'info', 'success'] as const);

  const { participantMethods, handleSubmit } = useParticipantJoin({
    onSuccess: () => {
      setStep(STEP.success);
    },
  });

  useEffect(() => {
    if (oauthEmail && provider) {
      participantMethods.setValue('oauthEmail', oauthEmail);
      participantMethods.setValue('provider', provider as LoginProvider);
    }
  }, [participantMethods, oauthEmail, provider]);

  return (
    <FormProvider {...participantMethods}>
      <Funnel>
        <Step name={STEP.email}>
          <Participant.EmailStep onNext={() => setStep(STEP.info)} />
        </Step>
        <Step name={STEP.info}>
          <Participant.InfoStep handleSubmit={handleSubmit} />
        </Step>
        <Step name={STEP.success}>
          <JoinSuccessStep />
        </Step>
      </Funnel>
    </FormProvider>
  );
};

export default ParticipantForm;
