'use client';

import { useState } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

import AuthCodeInput from './AuthCodeInput/AuthCodeInput';
import {
  univInputWrapper,
  required,
  univAuthButton,
  editButton,
  errorMessage,
} from './UnivAuthInput.css';
import EmailToast from '../../../EmailToast/EmailToast';
import { inputContainer, inputLabel, joinInput } from '../../../JoinInput/JoinInput.css';

import useAuthCodeTimer from '@/app/join/hooks/useAuthCodeTimer';
import useSendUnivAuthCodeMutation from '@/app/join/hooks/useSendUnivAuthCodeMutation';
import { ResearcherJoinSchemaType } from '@/schema/join/ResearcherJoinSchema';

interface UnivAuthInputProps {
  isEmailVerified: boolean;
  handleVerifyEmail: () => void;
  handleResetVerifyEmail: () => void;
}

const UnivAuthInput = ({
  isEmailVerified,
  handleVerifyEmail,
  handleResetVerifyEmail,
}: UnivAuthInputProps) => {
  const { control } = useFormContext<ResearcherJoinSchemaType>();

  const {
    mutate: sendEmail,
    error: authCodeError,
    isPending: isLoadingSend,
  } = useSendUnivAuthCodeMutation();

  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);

  const { authTimer, startTimer, stopTimer } = useAuthCodeTimer();
  const univEmail = useWatch({ name: 'univEmail', control });

  const isUnivEmailAuthenticated = isEmailSent || isEmailVerified;

  const handleSendUnivAuthCode = () => {
    sendEmail(univEmail, {
      onSuccess: () => {
        setIsEmailSent(true);
        setIsToastOpen(true);
        startTimer();
      },
      onError: (error) => {
        if (error.errorCode === 'VE0007') {
          handleVerifyEmail();
        }
      },
    });
  };

  const handleClickEdit = () => {
    setIsEmailSent(false);
    handleResetVerifyEmail();
    stopTimer();
  };

  return (
    <div className={inputContainer}>
      <label className={inputLabel}>
        <span>학교 메일 인증</span>
        <span className={required}>*</span>
      </label>
      <Controller
        name="univEmail"
        control={control}
        render={({ field, fieldState }) => {
          const isButtonDisabled =
            (!isEmailSent && !field.value) || isLoadingSend || fieldState.invalid;

          return (
            <>
              <div className={univInputWrapper}>
                <input
                  {...field}
                  style={{ width: '100%' }}
                  className={joinInput}
                  placeholder="학교 메일 입력"
                  aria-invalid={fieldState.invalid ? true : false}
                  disabled={isUnivEmailAuthenticated}
                />
                <button
                  type="button"
                  className={`${univAuthButton} ${isUnivEmailAuthenticated ? editButton : ''}`}
                  disabled={isButtonDisabled}
                  onClick={isUnivEmailAuthenticated ? handleClickEdit : handleSendUnivAuthCode}
                >
                  {isLoadingSend
                    ? '전송 중...'
                    : isUnivEmailAuthenticated
                    ? '수정'
                    : '인증번호 전송'}
                </button>
              </div>
              {fieldState.error ? (
                <span className={errorMessage}>{fieldState.error.message}</span>
              ) : (
                authCodeError && <span className={errorMessage}>{authCodeError.message}</span>
              )}
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
