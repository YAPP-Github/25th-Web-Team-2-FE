import { useSession } from 'next-auth/react';
import { FormProvider } from 'react-hook-form';

import { JoinLayout } from '../../components/JoinLayout/JoinLayout';
import JoinSuccessStep from '../../components/JoinSuccessStep/JoinSuccessStep';
import useFunnel from '../../hooks/useFunnel';
import { useParticipantJoin } from '../../hooks/useParticipantJoin';
import { DESKTOP_PARTICIPANT_JOIN_STEP_LIST, STEP } from '../../JoinPage.constants';

import { Participant } from '.';

import { LoginProvider } from '@/types/user';

const ParticipantForm = () => {
  const { Funnel, step, Step, setStep } = useFunnel(DESKTOP_PARTICIPANT_JOIN_STEP_LIST);

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
        <Funnel>
          <Step name={STEP.email}>
            <JoinLayout.Header />
            <JoinLayout.Container>
              <JoinLayout.Title title="참여자 회원가입" step={step} />
              <Participant.EmailStep onNext={() => setStep(STEP.info)} />
            </JoinLayout.Container>
          </Step>
          <Step name={STEP.info}>
            <JoinLayout.Header />
            <JoinLayout.Container>
              <JoinLayout.Title title="참여자 회원가입" step={step} />
              <Participant.InfoStep handleSubmit={handleSubmit} />
            </JoinLayout.Container>
          </Step>
          <Step name={STEP.success}>
            <JoinLayout.Container>
              <JoinSuccessStep />
            </JoinLayout.Container>
          </Step>
        </Funnel>
      </JoinLayout.FormGuard>
    </FormProvider>
  );
};

export default ParticipantForm;
