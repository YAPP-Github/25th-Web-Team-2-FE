import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import AuthCodeInput from './AuthCodeInput/AuthCodeInput';
import {
  editButton,
  errorMessage,
  inputContainer,
  required,
  univAuthButton,
  univInputWrapper,
} from './UnivAuthInput.styles';
import useAuthCodeTimer from '../../../hooks/useAuthCodeTimer';
import useSendUnivAuthCodeMutation from '../../../hooks/useSendUnivAuthCodeMutation';
import { JoinParams } from '../../../JoinPage.types';
import EmailToast from '../../EmailToast/EmailToast';

interface UnivAuthInputProps {
  handleVerifyEmail: () => void;
}

const UnivAuthInput = ({ handleVerifyEmail }: UnivAuthInputProps) => {
  const {
    control,
    getValues,
    formState: { errors },
  } = useFormContext<JoinParams>();

  const { mutate: sendEmail, error: sendError } = useSendUnivAuthCodeMutation();
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);

  const { authTimer, startTimer, stopTimer } = useAuthCodeTimer();

  const handleSendUnivAuthCode = () => {
    const univEmail = getValues('univEmail');

    sendEmail(univEmail, {
      onSuccess: () => {
        setIsEmailSent(true);
        setIsToastOpen(true);
        startTimer();
      },
      onError: () => {
        // TODO: 이미 인증된 유저인 경우에만 verify
        handleVerifyEmail();
      },
    });
  };

  const handleClickEdit = () => {
    setIsEmailSent(false);
    stopTimer();
  };

  return (
    <div css={inputContainer}>
      <label>
        <span>학교 메일 인증</span>
        <span css={required}>*</span>
      </label>

      <Controller
        name="univEmail"
        control={control}
        rules={{
          required: '학교 이메일을 입력해주세요',
          pattern: {
            value: /^[^\s@ㄱ-ㅎㅏ-ㅣ가-힣]+@[^\s@ㄱ-ㅎㅏ-ㅣ가-힣]+\.[a-zA-Z]{2,}$/,
            message: '이메일 형식이 올바르지 않아요',
          },
        }}
        render={({ field, fieldState }) => {
          return (
            <div css={univInputWrapper}>
              <input
                {...field}
                placeholder="학교 메일 입력"
                aria-invalid={fieldState.invalid ? true : false}
                disabled={isEmailSent}
              />
              <button
                type="button"
                css={[univAuthButton, isEmailSent && editButton]}
                disabled={!isEmailSent && !field.value}
                onClick={isEmailSent ? handleClickEdit : handleSendUnivAuthCode}
              >
                {isEmailSent ? '수정' : '인증번호 전송'}
              </button>
            </div>
          );
        }}
      />
      {errors.univEmail && <span css={errorMessage}>{errors.univEmail.message}</span>}
      {sendError && <span css={errorMessage}>{sendError.message}</span>}
      {isEmailSent && (
        <AuthCodeInput
          authTimer={authTimer}
          handleVerifyEmail={handleVerifyEmail}
          handleSendUnivAuthCode={handleSendUnivAuthCode}
        />
      )}
      <EmailToast
        title="인증번호가 발송되었어요"
        isToastOpen={isToastOpen}
        setIsToastOpen={setIsToastOpen}
      />
    </div>
  );
};

export default UnivAuthInput;
