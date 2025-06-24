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
import EmailToast from '../../../../components/EmailToast/EmailToast';
import {
  inputContainer,
  inputLabel,
  joinInput,
} from '../../../../components/JoinInput/JoinInput.css';

import useAuthCodeTimer from '@/app/join/hooks/useAuthCodeTimer';
import useSendUnivAuthCodeMutation from '@/app/join/hooks/useSendUnivAuthCodeMutation';
import { ResearcherJoinSchemaType } from '@/schema/join/ResearcherJoinSchema';

const getButtonText = (isLoading: boolean, isAuthenticated: boolean) => {
  if (isLoading) return '전송 중...';
  if (isAuthenticated) return '수정';
  return '인증번호 전송';
};

const UnivAuthInput = () => {
  const { control, setValue, clearErrors, trigger } = useFormContext<ResearcherJoinSchemaType>();

  const {
    data: authCodeData,
    mutate: sendEmail,
    error: authCodeError,
    isPending: isLoadingSend,
  } = useSendUnivAuthCodeMutation();

  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);

  const isEmailVerified = useWatch({ name: 'isEmailVerified', control });

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
        if (error.code === 'VE0007') {
          setValue('isEmailVerified', true);
        }
      },
    });
  };

  const handleClickEdit = () => {
    setIsEmailSent(false);
    setValue('isEmailVerified', false);
    stopTimer();
    clearErrors('univEmail');
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

          const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
            field.onChange(e);
            await trigger('univEmail');
          };

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
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className={`${univAuthButton} ${isUnivEmailAuthenticated ? editButton : ''}`}
                  disabled={isButtonDisabled}
                  onClick={isUnivEmailAuthenticated ? handleClickEdit : handleSendUnivAuthCode}
                >
                  {getButtonText(isLoadingSend, isUnivEmailAuthenticated)}
                </button>
              </div>
              {fieldState.error ? (
                <span className={errorMessage}>{fieldState.error.message}</span>
              ) : (
                <span className={errorMessage}>{authCodeError && authCodeError.message}</span>
              )}
            </>
          );
        }}
      />

      {isEmailSent && (
        <AuthCodeInput
          authTimer={authTimer}
          handleSendUnivAuthCode={handleSendUnivAuthCode}
          stopTimer={stopTimer}
        />
      )}
      <EmailToast
        title={`인증번호가 발송되었어요. (${authCodeData?.requestCount}회 / 하루 최대 3회)`}
        isToastOpen={isToastOpen}
        setIsToastOpen={setIsToastOpen}
      />
    </div>
  );
};

export default UnivAuthInput;
