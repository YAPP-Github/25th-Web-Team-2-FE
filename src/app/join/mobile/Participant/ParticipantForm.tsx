import { useSession } from 'next-auth/react';
import { FormProvider } from 'react-hook-form';

import JoinSuccessStep from '../../components/JoinSuccessStep/JoinSuccessStep';
import useFunnel from '../../hooks/useFunnel';
import { useParticipantJoin } from '../../hooks/useParticipantJoin';
import { MOBILE_PARTICIPANT_JOIN_STEP_LIST, STEP } from '../../JoinPage.constants';
import MobileFunnelLayout from '../components/MobileFunnelLayout/MobileFunnelLayout';

import { Participant } from '.';

import { LoginProvider } from '@/types/user';

const ParticipantForm = () => {
  const { data: session } = useSession();
  const oauthEmail = session?.oauthEmail ?? '';
  const provider = session?.provider as LoginProvider;

  const { FunnelProvider, Funnel, Step, setStep, goToNext } = useFunnel(
    MOBILE_PARTICIPANT_JOIN_STEP_LIST,
  );

  const { participantMethods, handleSubmit } = useParticipantJoin({
    initialValues: { oauthEmail, provider },
    onSuccess: () => {
      setStep(STEP.success);
    },
  });

  return (
    <FormProvider {...participantMethods}>
      <FunnelProvider>
        <MobileFunnelLayout title="참여자 회원가입">
          <Funnel>
            <Step name={STEP.contactEmail}>
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
        </MobileFunnelLayout>
      </FunnelProvider>
    </FormProvider>
  );
};

export default ParticipantForm;
