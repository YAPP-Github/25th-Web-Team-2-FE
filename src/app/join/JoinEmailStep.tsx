import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import EmailToast from './components/EmailToast/EmailToast';
import JoinCheckboxContainer from './components/JoinCheckboxContainer/JoinCheckboxContainer';
import JoinInput from './components/JoinInput/JoinInput';
import UnivAuthInput from './components/UnivAuthInput/UnivAuthInput';
import useVerifyUnivAuthCodeMutation from './hooks/useVerifyUnivAuthCodeMutation';
import { joinContentContainer, nextButton } from './JoinPage.styles';
import { EmailForm, JoinParams } from './JoinPage.types';

interface JoinEmailStepProps {
  onNext: (data: Partial<JoinParams>) => void;
}

// TODO: 필수 체크표시 2개 선택 시 isAllCheck: true
const JoinEmailStep = ({ onNext }: JoinEmailStepProps) => {
  const oauthEmail = sessionStorage.getItem('email') || '';
  const { mutate: verifyEmail, isSuccess: isUnivVerify } = useVerifyUnivAuthCodeMutation();
  const [isToastOpen, setIsToastOpen] = useState(false);

  const methods = useForm<EmailForm>({
    defaultValues: {
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
          methods.setValue('isEmailVerified', true);
        },
      },
    );
  };

  const handleClickNext = () => {
    onNext({
      contactEmail: methods.getValues('contactEmail'),
      univEmail: methods.getValues('univEmail'),
    });
  };

  const allValid =
    Boolean(methods.watch('contactEmail')) &&
    Boolean(methods.watch('univEmail')) &&
    Boolean(methods.watch('isEmailVerified')) &&
    (Boolean(methods.watch('isAllCheck')) ||
      (Boolean(methods.watch('isTermOfService')) && Boolean(methods.watch('isPrivacy'))));

  return (
    <FormProvider {...methods}>
      <div css={joinContentContainer}>
        <JoinInput
          name="socialEmail"
          control={methods.control}
          label="소셜 로그인 아이디"
          value={oauthEmail}
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
      <button css={nextButton} disabled={!allValid} onClick={handleClickNext}>
        다음
      </button>
      <EmailToast
        title="이메일 인증이 완료되었어요"
        isToastOpen={isToastOpen}
        setIsToastOpen={setIsToastOpen}
      />
    </FormProvider>
  );
};

export default JoinEmailStep;
