'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import JoinEmailStep from './components/JoinEmailStep/JoinEmailStep';
import JoinInfoStep from './components/JoinInfoStep/JoinInfoStep';
import JoinSuccessStep from './components/JoinSuccessStep/JoinSuccessStep';
import useJoinMutation from './hooks/useJoinMutation';
import {
  contentContainer,
  joinForm,
  joinLayout,
  joinTitle,
  progressBarContainer,
  progressBarFill,
  titleContainer,
} from './JoinPage.styles';
import { JoinParams } from './JoinPage.types';
import { getProvider } from './JoinPage.utils';

import Logo from '@/assets/images/logo.svg';

type JoinStep = '이메일' | '개인 정보' | '완료';

const STEP = {
  email: '이메일',
  info: '개인 정보',
  success: '완료',
} as const;

export default function JoinPage() {
  const oauthEmail = sessionStorage.getItem('email') || '';
  const provider = getProvider(oauthEmail);
  const { mutate: join } = useJoinMutation();

  const [joinUserInfo, setJoinUserInfo] = useState<JoinParams>({
    oauthEmail: oauthEmail,
    provider,
    contactEmail: '',
    univEmail: '',
    name: '',
    univName: '',
    major: '',
    labInfo: '',
  });
  const [isFinished, setIsFinished] = useState(false);

  const [step, setStep] = useState<JoinStep>(STEP.email);

  const handleNextStep = (data: Partial<JoinParams>, isLast = false) => {
    setJoinUserInfo((prev) => ({ ...prev, ...data }));

    if (step === STEP.email) {
      setStep(STEP.info);
    }

    if (isLast) {
      setIsFinished(true);
    }
  };

  const handleSubmit = () => {
    join({ ...joinUserInfo }, { onSuccess: () => setStep(STEP.success) });
  };

  // TODO: 개선 필요.
  useEffect(() => {
    if (isFinished) {
      handleSubmit();
    }
  }, [isFinished]);

  return (
    <section css={joinLayout}>
      {(step === STEP.email || step === STEP.info) && (
        <Image src={Logo} alt="로고" width={80} height={28} />
      )}

      <div css={contentContainer}>
        {(step === STEP.email || step === STEP.info) && (
          <div css={titleContainer}>
            <h2 css={joinTitle}>연구자 회원가입</h2>
            <div css={progressBarContainer}>
              <div css={progressBarFill} style={{ width: step === STEP.email ? '50%' : '100%' }} />
            </div>
          </div>
        )}
        <section css={joinForm}>
          {step === STEP.email && <JoinEmailStep onNext={handleNextStep} />}
          {step === STEP.info && (
            <JoinInfoStep
              onNext={(data: Partial<JoinParams>) => {
                handleNextStep(data, true);
              }}
            />
          )}
        </section>
      </div>
      {step === STEP.success && <JoinSuccessStep name={joinUserInfo.name} />}
    </section>
  );
}
