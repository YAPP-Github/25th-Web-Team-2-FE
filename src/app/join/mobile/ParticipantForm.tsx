import { useSession } from 'next-auth/react';
import { FormProvider } from 'react-hook-form';

import { Participant } from './Participant';
import JoinSuccessStep from '../components/JoinSuccessStep/JoinSuccessStep';
import useFunnel from '../hooks/useFunnel';
import { useParticipantJoin } from '../hooks/useParticipantJoin';
import { MOBILE_JOIN_STEP_LIST, STEP } from '../JoinPage.constants';

import { LoginProvider } from '@/types/user';

const ParticipantForm = () => {
  const { data: session } = useSession();
  const provider = session?.provider;
  const oauthEmail = session?.oauthEmail;

  const { Funnel, Step, setStep, goToNext } = useFunnel(MOBILE_JOIN_STEP_LIST);

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
    <FormProvider {...participantMethods}>
      <Funnel>
        <Step name={STEP.email}>
          <Participant.ContactEmailStep
            provider={provider}
            oauthEmail={oauthEmail}
            onNext={goToNext}
          />
        </Step>
        <Step name={STEP.info}>
          <Participant.JoinInfoStep onNext={goToNext} />
        </Step>
        <Step name={STEP.additionalInfo}>
          <Participant.JoinAdditionalInfoStep onSubmit={handleSubmit} />
        </Step>
        <Step name={STEP.success}>
          <JoinSuccessStep />
        </Step>
      </Funnel>
    </FormProvider>
  );
};

export default ParticipantForm;
