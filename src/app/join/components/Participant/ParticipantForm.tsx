import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import useFunnel from '../../hooks/useFunnel';
import useParticipantJoinMutation from '../../hooks/useParticipantJoinMutation';
import { STEP } from '../../JoinPage.constants';
import { getProvider } from '../../JoinPage.utils';
import JoinSuccessStep from '../JoinSuccessStep/JoinSuccessStep';

import { Participant } from '.';

import useSessionStorage from '@/hooks/useSessionStorage';
import ParticipantJoinSchema, {
  ParticipantJoinSchemaType,
} from '@/schema/join/ParticipantJoinSchema';

const ParticipantForm = () => {
  const { value: oauthEmail } = useSessionStorage('email');

  const { mutate: joinParticipant } = useParticipantJoinMutation();

  const { Funnel, Step, setStep } = useFunnel(['email', 'info', 'success'] as const);

  const participantMethods = useForm<ParticipantJoinSchemaType>({
    resolver: zodResolver(ParticipantJoinSchema()),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      oauthEmail: '',
      contactEmail: '',
      name: '',
      birthDate: '',
      basicAddressInfo: {
        region: '',
        area: '',
      },
    },
  });

  const handleParticipantSubmit = () => {
    const formData = participantMethods.getValues();

    const formattedData = {
      ...formData,
      birthDate: formData.birthDate.replaceAll('.', '-'),
      additionalAddressInfo:
        Object.values(formData.additionalAddressInfo ?? {}).filter(Boolean).length > 0
          ? formData.additionalAddressInfo
          : null,
    };

    joinParticipant(formattedData, {
      onSuccess: () => {
        setStep(STEP.success);
      },
    });
  };

  useEffect(() => {
    if (oauthEmail) {
      participantMethods.setValue('oauthEmail', oauthEmail);
      participantMethods.setValue('provider', getProvider(oauthEmail));
    }
  }, [oauthEmail, participantMethods]);

  return (
    <FormProvider {...participantMethods}>
      <Funnel>
        <Step name={STEP.email}>
          <Participant.EmailStep onNext={() => setStep(STEP.info)} />
        </Step>
        <Step name={STEP.info}>
          <Participant.InfoStep
            handleSubmit={participantMethods.handleSubmit(handleParticipantSubmit)}
          />
        </Step>
        <Step name={STEP.success}>
          <JoinSuccessStep />
        </Step>
      </Funnel>
    </FormProvider>
  );
};

export default ParticipantForm;
