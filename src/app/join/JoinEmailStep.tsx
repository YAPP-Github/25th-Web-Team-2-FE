import React, { useState } from 'react';
import EmailToast from './components/EmailToast/EmailToast';
import UnivAuthInput from './components/UnivAuthInput/UnivAuthInput';
import JoinCheckboxContainer from './components/JoinCheckboxContainer/JoinCheckboxContainer';
import JoinInput from './components/JoinInput/JoinInput';
import Image from 'next/image';
import { FormInput } from './JoinPage.types';
import { useFormContext } from 'react-hook-form';
import useVerifyUnivAuthCodeMutation from './hooks/useVerifyUnivAuthCodeMutation';

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

import Logo from '@/assets/images/logo.svg';

const JoinEmailStep = () => {
  const { mutate: verifyEmail, isSuccess: isUnivVerify } = useVerifyUnivAuthCodeMutation();
  const { control, watch, setValue, getValues, trigger } = useFormContext<FormInput>();
  const [isToastOpen, setIsToastOpen] = useState(false);

  const handleAllCheck = () => {
    const isChecked = !watch('isAllCheck');
    setValue('isAllCheck', isChecked);
    setValue('isTermOfService', isChecked);
    setValue('isPrivacy', isChecked);
    setValue('isAdvertise', isChecked);
  };

  const handleVerifyUniv = () => {
    const univEmail = getValues('univEmail');
    const authCode = getValues('authCode');
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
    watch('contactEmail') &&
    watch('univEmail') &&
    isUnivVerify &&
    (watch('isAllCheck') || (watch('isTermOfService') && watch('isPrivacy')));

  return (
    <>
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
              control={control}
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
              control={control}
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
                trigger('contactEmail');
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
    </>
  );
};

export default JoinEmailStep;
