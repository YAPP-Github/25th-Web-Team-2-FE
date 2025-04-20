import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import useFunnel from '../../hooks/useFunnel';
import useParticipantJoinMutation from '../../hooks/useParticipantJoinMutation';
import { STEP } from '../../JoinPage.constants';
import JoinSuccessStep from '../JoinSuccessStep/JoinSuccessStep';

import { Participant } from '.';

import ParticipantJoinSchema, {
  ParticipantJoinSchemaType,
} from '@/schema/join/ParticipantJoinSchema';

const ParticipantForm = () => {
  const { data: session } = useSession();
  const oauthEmail = session?.oauthEmail;
  const provider = session?.provider;

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
      adConsent: false,
      matchConsent: false,
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
    if (oauthEmail && provider) {
      participantMethods.setValue('oauthEmail', oauthEmail);
      participantMethods.setValue('provider', provider as 'GOOGLE' | 'NAVER');
    }
  }, [participantMethods, oauthEmail, provider]);

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
