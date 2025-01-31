import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import useFunnel from '../../hooks/useFunnel';
import useParticipantJoinMutation from '../../hooks/useParticipantJoinMutation';
import { getProvider } from '../../JoinPage.utils';
import JoinSuccessStep from '../JoinSuccessStep/JoinSuccessStep';

import { Participant } from '.';

import useSessionStorage from '@/hooks/useSessionStorage';
import ParticipantJoinSchema, {
  ParticipantJoinSchemaType,
} from '@/schema/join/ParticipantJoinSchema';
import { STEP } from '../../JoinPage.constants';

const ParticipantForm = () => {
  const oauthEmail = useSessionStorage('email');

  const { mutate: joinParticipant } = useParticipantJoinMutation();

  const { Funnel, setStep } = useFunnel(['email', 'info', 'success'] as const);

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
    };

    joinParticipant(formattedData, {
      onSuccess: () => setStep(STEP.success),
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
        <Funnel.Step name={STEP.email}>
          <Participant.EmailStep onNext={() => setStep(STEP.info)} />
        </Funnel.Step>
        <Funnel.Step name={STEP.info}>
          <Participant.InfoStep
            handleSubmit={participantMethods.handleSubmit(handleParticipantSubmit)}
          />
        </Funnel.Step>
        <Funnel.Step name={STEP.success}>
          <JoinSuccessStep name={participantMethods.getValues('name')} />
        </Funnel.Step>
      </Funnel>
    </FormProvider>
  );
};

export default ParticipantForm;
