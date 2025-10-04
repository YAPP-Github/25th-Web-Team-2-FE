'use client';

import { useSession } from 'next-auth/react';
import { FormProvider } from 'react-hook-form';

import FunnelLayout from '@/app/join/components/FunnelLayout/FunnelLayout';
import { JoinLayout } from '@/app/join/components/JoinLayout/JoinLayout';
import JoinSuccessStep from '@/app/join/components/JoinSuccessStep/JoinSuccessStep';
import useFunnel from '@/app/join/hooks/useFunnel';
import { useParticipantJoin } from '@/app/join/hooks/useParticipantJoin';
import { DESKTOP_PARTICIPANT_JOIN_STEP_LIST, STEP } from '@/app/join/JoinPage.constants';

import { Participant } from '.';

import { LoginProvider } from '@/types/user';
import FunnelStepGuard from '@/app/join/components/FunnelStepGuard/FunnelStepGuard';

const ParticipantForm = () => {
  const { FunnelProvider, Funnel, Step, setStep } = useFunnel(DESKTOP_PARTICIPANT_JOIN_STEP_LIST);

  const { data: session } = useSession();
  const oauthEmail = session?.oauthEmail ?? '';
  const provider = session?.provider as LoginProvider;

  const { participantMethods, handleSubmit } = useParticipantJoin({
    initialValues: { oauthEmail, provider },
    onSuccess: () => {
      setStep(STEP.success);
    },
  });

  return (
    <FormProvider {...participantMethods}>
      <JoinLayout.FormGuard>
        <FunnelProvider>
          <FunnelStepGuard isDirty={participantMethods.formState.isDirty}>
            <FunnelLayout title="참여자 회원가입">
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
            </FunnelLayout>
          </FunnelStepGuard>
        </FunnelProvider>
      </JoinLayout.FormGuard>
    </FormProvider>
  );
};

export default ParticipantForm;
