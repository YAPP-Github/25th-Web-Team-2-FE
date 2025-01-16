'use client';

import Image from 'next/image';

import { FormProvider, useForm } from 'react-hook-form';

import Logo from '@/assets/images/logo.svg';
import JoinInput from './components/JoinInput/JoinInput';

import UnivAuthInput from './components/UnivAuthInput/UnivAuthInput';
import { FormInput } from './Join.types';
import useVerifyUnivAuthCodeMutation from './hooks/useVerifyUnivAuthCodeMutation';
import { useState } from 'react';
import EmailToast from './components/EmailToast/EmailToast';
import JoinCheckboxContainer from './components/JoinCheckboxContainer/JoinCheckboxContainer';
import {
  contentContainer,
  joinContentContainer,
  joinLayout,
  joinTitle,
  nextButton,
  progressBarContainer,
  progressBarFill,
  titleContainer,
} from './JoinPage.styles';

export default function JoinPage() {
  const socialEmail = sessionStorage.getItem('email') || '';
  const { mutate: verifyEmail, isSuccess: isUnivVerify } = useVerifyUnivAuthCodeMutation();
  const [isToastOpen, setIsToastOpen] = useState(false);

  const methods = useForm<FormInput>({
    defaultValues: {
      socialEmail: socialEmail,
      contactEmail: '',
      univEmail: '',
      authCode: '',
      isAllCheck: false,
      isTermOfService: false,
      isPrivacy: false,
      isAdvertise: false,
    },
  });

  const handleAllCheck = () => {
    const isChecked = !methods.watch('isAllCheck');
    methods.setValue('isAllCheck', isChecked);
    methods.setValue('isTermOfService', isChecked);
    methods.setValue('isPrivacy', isChecked);
    methods.setValue('isAdvertise', isChecked);
  };

  const handleVerifyUniv = () => {
    const univEmail = methods.getValues('univEmail');
    const authCode = methods.getValues('authCode');
    verifyEmail(
      { univEmail, inputCode: authCode },
      {
        onSuccess: () => {
          setIsToastOpen(true);
        },
      },
    );
  };

  const allValid =
    methods.watch('contactEmail') &&
    methods.watch('univEmail') &&
    isUnivVerify &&
    (methods.watch('isAllCheck') ||
      (methods.watch('isTermOfService') && methods.watch('isPrivacy')));

  return (
    <FormProvider {...methods}>
      <form css={joinLayout}>
        <Image src={Logo} alt="로고" width={80} height={28} />
        <div css={contentContainer}>
          <div css={titleContainer}>
            <h2 css={joinTitle}>연구자 회원가입</h2>
            <div css={progressBarContainer}>
              <div css={progressBarFill} style={{ width: `50%` }} />
            </div>
          </div>
          <div css={joinContentContainer}>
            <JoinInput
              name="socialEmail"
              control={methods.control}
              label="소셜 로그인 아이디"
              placeholder="이메일 입력"
              disabled
              rules={{
                required: '이메일을 입력해주세요',
                pattern: {
                  value: /^[^\s@ㄱ-ㅎㅏ-ㅣ가-힣]+@[^\s@ㄱ-ㅎㅏ-ㅣ가-힣]+\.[a-zA-Z]{2,}$/,
                  message: '이메일 형식이 올바르지 않아요',
                },
              }}
            />
            <JoinInput
              name="contactEmail"
              control={methods.control}
              label="연락 받을 이메일"
              placeholder="이메일 입력"
              required
              rules={{
                required: '이메일을 입력해주세요',
                pattern: {
                  value: /^[^\s@ㄱ-ㅎㅏ-ㅣ가-힣]+@[^\s@ㄱ-ㅎㅏ-ㅣ가-힣]+\.[a-zA-Z]{2,}$/,
                  message: '이메일 형식이 올바르지 않아요',
                },
              }}
              onChange={() => {
                methods.trigger('contactEmail');
              }}
              tip="로그인 아이디와 달라도 괜찮아요"
            />
            <UnivAuthInput isUnivVerify={isUnivVerify} handleVerifyUniv={handleVerifyUniv} />
            <JoinCheckboxContainer handleAllCheck={handleAllCheck} />
          </div>
        </div>
        <button css={nextButton} disabled={!allValid}>
          다음
        </button>
      </form>
      <EmailToast
        title="이메일 인증이 완료되었어요"
        isToastOpen={isToastOpen}
        setIsToastOpen={setIsToastOpen}
      />
    </FormProvider>
  );
}
