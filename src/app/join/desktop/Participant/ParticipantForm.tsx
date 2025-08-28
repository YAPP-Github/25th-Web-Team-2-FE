import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { FormProvider } from 'react-hook-form';

import { JoinLayout } from '../../components/JoinLayout/JoinLayout';
import JoinSuccessStep from '../../components/JoinSuccessStep/JoinSuccessStep';
import useFunnel from '../../hooks/useFunnel';
import { useParticipantJoin } from '../../hooks/useParticipantJoin';
import { DESKTOP_PARTICIPANT_JOIN_STEP_LIST, STEP } from '../../JoinPage.constants';

import { Participant } from '.';

import { ParticipantJoinSchemaType } from '@/schema/join/ParticipantJoinSchema';
import { LoginProvider } from '@/types/user';

interface ParticipantFormProps {
  onDirtyChange?: (dirty: boolean) => void;
}

const AUTO_INPUT_FIELDS: (keyof ParticipantJoinSchemaType)[] = ['oauthEmail'];

const ParticipantForm = ({ onDirtyChange }: ParticipantFormProps) => {
  const { data: session } = useSession();
  const oauthEmail = session?.oauthEmail;
  const provider = session?.provider;

  const { Funnel, step, Step, setStep } = useFunnel(DESKTOP_PARTICIPANT_JOIN_STEP_LIST);

  const { participantMethods, handleSubmit } = useParticipantJoin({
    initialValues: {
      oauthEmail: oauthEmail || '',
      provider: provider as LoginProvider,
    },
    onSuccess: () => {
      setStep(STEP.success);
    },
  });

  const isUserInputDirty = Object.keys(participantMethods.formState.dirtyFields).some(
    (key) => !AUTO_INPUT_FIELDS.includes(key as keyof ParticipantJoinSchemaType),
  );

  useEffect(() => {
    onDirtyChange?.(isUserInputDirty);
  }, [isUserInputDirty, onDirtyChange]);

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
