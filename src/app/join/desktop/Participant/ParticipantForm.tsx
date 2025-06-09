import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { FormProvider } from 'react-hook-form';

import JoinSuccessStep from '../../components/JoinSuccessStep/JoinSuccessStep';
import useFunnel from '../../hooks/useFunnel';
import { useParticipantJoin } from '../../hooks/useParticipantJoin';
import { STEP } from '../../JoinPage.constants';

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

  const { Funnel, Step, setStep } = useFunnel(['email', 'info', 'success'] as const);

  const { participantMethods, handleSubmit } = useParticipantJoin({
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

  useEffect(() => {
    if (oauthEmail && provider) {
      participantMethods.setValue('oauthEmail', oauthEmail);
      participantMethods.setValue('provider', provider as LoginProvider);
    }
  }, [participantMethods, oauthEmail, provider]);

  return (
    <FormProvider {...participantMethods}>
      <Funnel>
        <Step name={STEP.contactEmail}>
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
