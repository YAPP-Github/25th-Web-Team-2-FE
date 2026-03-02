'use client';

import { useSession } from 'next-auth/react';
import { FormProvider } from 'react-hook-form';

import { LoginProvider } from '@/types/user';
import { STEP } from '@constants/steps';
import FunnelStepGuard from '@join/components/FunnelStepGuard';
import JoinSuccessStep from '@join/components/JoinSuccessStep';
import { MOBILE_PARTICIPANT_JOIN_STEP_LIST } from '@join/constants/steps';
import useFunnel from '@join/hooks/useFunnel';
import { useParticipantJoin } from '@join/hooks/useParticipantJoin';
import MobileFunnelLayout from '@join/mobile/components/MobileFunnelLayout';

import { Participant } from '.';

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
        <FunnelStepGuard isDirty={participantMethods.formState.isDirty}>
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
        </FunnelStepGuard>
      </FunnelProvider>
    </FormProvider>
  );
};

export default ParticipantForm;
