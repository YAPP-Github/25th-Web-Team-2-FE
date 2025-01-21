'use client';

import { FormProvider, useForm } from 'react-hook-form';

import JoinEmailStep from './components/JoinEmailStep/JoinEmailStep';
import JoinInfoStep from './components/JoinInfoStep/JoinInfoStep';
import JoinSuccessStep from './components/JoinSuccessStep/JoinSuccessStep';
import useFunnel from './hooks/useFunnel';
import useJoinMutation from './hooks/useJoinMutation';
import { joinLayout } from './JoinPage.styles';
import { JoinParams } from './JoinPage.types';
import { getProvider } from './JoinPage.utils';

const STEP = {
  email: 'email',
  info: 'info',
  success: 'success',
} as const;

export default function JoinPage() {
  const oauthEmail = sessionStorage.getItem('email') || '';
  const provider = getProvider(oauthEmail);
  const { mutate: join } = useJoinMutation();

  const methods = useForm<JoinParams>({
    defaultValues: {
      oauthEmail: oauthEmail,
      provider,
      contactEmail: '',
      univEmail: '',
      name: '',
      univName: '',
      major: '',
      labInfo: '',
    },
  });

  const { Funnel, setStep } = useFunnel(['email', 'info', 'success'] as const);

  const handleSubmit = () => {
    const formData = methods.getValues();

    join(formData, { onSuccess: () => setStep(STEP.success) });
  };

  return (
    <FormProvider {...methods}>
      <section css={joinLayout}>
        <Funnel>
          <Funnel.Step name={STEP.email}>
            <JoinEmailStep onNext={() => setStep(STEP.info)} />
          </Funnel.Step>
          <Funnel.Step name={STEP.info}>
            <JoinInfoStep onNext={handleSubmit} />
          </Funnel.Step>
          <Funnel.Step name={STEP.success}>
            <JoinSuccessStep name={methods.getValues('name')} />
          </Funnel.Step>
        </Funnel>
      </section>
    </FormProvider>
  );
}
