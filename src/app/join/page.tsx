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

  const [step, setStep] = useState<JoinStep>('이메일');

  const handleNextStep = (data: Partial<JoinParams>, isLast = false) => {
    setJoinUserInfo((prev) => ({ ...prev, ...data }));

    if (step === '이메일') {
      setStep('개인 정보');
    }

    if (isLast) {
      setIsFinished(true);
    }
  };

  const handleSubmit = () => {
    join({ ...joinUserInfo }, { onSuccess: () => setStep('완료') });
  };

  // TODO: 개선 필요.
  useEffect(() => {
    if (isFinished) {
      handleSubmit();
    }
  }, [isFinished]);

  return (
    <section css={joinLayout}>
      <Image src={Logo} alt="로고" width={80} height={28} />
      <div css={contentContainer}>
        <div css={titleContainer}>
          <h2 css={joinTitle}>연구자 회원가입</h2>
          <div css={progressBarContainer}>
            <div css={progressBarFill} style={{ width: step === '이메일' ? '50%' : '100%' }} />
          </div>
        </div>
        <section css={joinForm}>
          {step === '이메일' && <JoinEmailStep onNext={handleNextStep} />}
          {step === '개인 정보' && (
            <JoinInfoStep
              onNext={(data: Partial<JoinParams>) => {
                handleNextStep(data, true);
                handleSubmit();
              }}
            />
          )}
          {step === '완료' && <JoinSuccessStep name={joinUserInfo.name} />}
        </section>
      </div>
    </section>
  );
}
