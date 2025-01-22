'use client';

import Image from 'next/image';
import { FormProvider, useForm } from 'react-hook-form';

import JoinEmailStep from './components/JoinEmailStep/JoinEmailStep';
import JoinInfoStep from './components/JoinInfoStep/JoinInfoStep';
import JoinSuccessStep from './components/JoinSuccessStep/JoinSuccessStep';
import useFunnel from './hooks/useFunnel';
import useJoinMutation from './hooks/useJoinMutation';
import {
  contentContainer,
  joinLayout,
  joinTitle,
  progressBarContainer,
  progressBarFill,
  titleContainer,
} from './JoinPage.styles';
import { JoinParams } from './JoinPage.types';
import { getProvider } from './JoinPage.utils';

import Logo from '@/assets/images/logo.svg';
import { ROLE } from '@/constants/config';

const STEP = {
  email: 'email',
  info: 'info',
  success: 'success',
} as const;

export default function JoinPage() {
  const oauthEmail = sessionStorage.getItem('email') || '';
  const role = sessionStorage.getItem('role') || '';
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

  const { Funnel, step, setStep } = useFunnel(['email', 'info', 'success'] as const);

  const handleSubmit = () => {
    const formData = methods.getValues();

    join(formData, { onSuccess: () => setStep(STEP.success) });
  };

  return (
    <FormProvider {...methods}>
      <section css={joinLayout}>
        <Image src={Logo} alt="로고" width={80} height={28} />
        <div css={contentContainer}>
          <div css={titleContainer}>
            <h2 css={joinTitle}>
              {role === ROLE.researcher ? '연구자 회원가입' : '참여자 회원가입'}
            </h2>
            <div css={progressBarContainer}>
              <div css={progressBarFill} style={{ width: step === STEP.email ? '50%' : '100%' }} />
            </div>
          </div>
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
        </div>
      </section>
    </FormProvider>
  );
}
