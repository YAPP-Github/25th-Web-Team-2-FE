import { useState } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

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
import EmailToast from '../../EmailToast/EmailToast';

import { ResearcherJoinSchemaType } from '@/schema/join/ResearcherJoinSchema';

interface UnivAuthInputProps {
  handleVerifyEmail: () => void;
}

const UnivAuthInput = ({ handleVerifyEmail }: UnivAuthInputProps) => {
  const { control } = useFormContext<ResearcherJoinSchemaType>();

  const { mutate: sendEmail, error: sendError } = useSendUnivAuthCodeMutation();
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);

  const { authTimer, startTimer, stopTimer } = useAuthCodeTimer();

  const univEmail = useWatch({ name: 'univEmail', control });

  const handleSendUnivAuthCode = () => {
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
        render={({ field, fieldState }) => {
          return (
            <>
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
              {fieldState.error && <span css={errorMessage}>{fieldState.error.message}</span>}
              {sendError && <span css={errorMessage}>{sendError.message}</span>}
            </>
          );
        }}
      />

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
