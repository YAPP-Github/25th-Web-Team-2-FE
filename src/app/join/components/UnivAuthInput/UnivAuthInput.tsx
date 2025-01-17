import React, { useEffect, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {
  authCodeButton,
  authInputContainer,
  authTimerWrapper,
  editButton,
  errorMessage,
  inputContainer,
  required,
  sendAgainButton,
  univAuthButton,
  univInputWrapper,
} from './UnivAuthInput.styles';
import useSendUnivAuthCodeMutation from '../../hooks/useSendUnivAuthCodeMutation';

import EmailToast from '../EmailToast/EmailToast';
import { FormInput } from '../../JoinPage.types';
import { formatAuthTimer } from '../../JoinPage.utils';

const TEN_MINUTE_SEC = 600;
const ONE_SEC = 1000;

interface UnivAuthInputProps {
  isUnivVerify: boolean;
  handleVerifyUniv: () => void;
}

const UnivAuthInput = ({ isUnivVerify, handleVerifyUniv }: UnivAuthInputProps) => {
  const {
    control,
    watch,
    trigger,
    getValues,
    formState: { errors },
  } = useFormContext<FormInput>();

  const { mutate: sendEmail, error: sendError } = useSendUnivAuthCodeMutation();
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [authTimer, setAuthTimer] = useState(TEN_MINUTE_SEC);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    stopTimer();
    setAuthTimer(TEN_MINUTE_SEC);

    timerRef.current = setInterval(() => {
      setAuthTimer((prev) => prev - 1);
    }, ONE_SEC);
  };

  const handleSendUnivAuthCode = () => {
    const univEmail = getValues('univEmail');
    sendEmail(univEmail, {
      onSuccess: () => {
        setIsEmailSent(true);
        setIsToastOpen(true);
        startTimer();
      },
    });
  };

  const handleClickEdit = () => {
    setIsEmailSent(false);
    stopTimer();
  };

  useEffect(() => {
    if (authTimer <= 0) {
      stopTimer();
    }
  }, [authTimer]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

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
        render={({ field }) => {
          const isDisabled = Boolean(errors.univEmail) || !watch('univEmail');

          return (
            <div css={univInputWrapper}>
              <input
                {...field}
                placeholder="학교 메일 입력"
                aria-invalid={errors.univEmail ? true : false}
                onChange={(e) => {
                  field.onChange(e);
                  trigger('univEmail');
                }}
                disabled={isEmailSent}
              />
              <button
                type="button"
                css={[univAuthButton, isEmailSent && editButton]}
                disabled={!isEmailSent && isDisabled}
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
        <Controller
          name="authCode"
          control={control}
          render={({ field }) => {
            const isDisabled =
              Boolean(errors.authCode) || !watch('authCode') || watch('authCode').length < 6;

            return (
              <div css={authInputContainer}>
                <div css={univInputWrapper}>
                  <input
                    {...field}
                    placeholder="인증번호 6자리 입력"
                    type="number"
                    disabled={isUnivVerify}
                    onChange={(e) => {
                      if (e.target.value.length <= 6) {
                        field.onChange(e);
                      }
                    }}
                  />
                  {!isUnivVerify && (
                    <div css={authTimerWrapper}>
                      <span>{formatAuthTimer(authTimer)}</span>
                      <button
                        type="button"
                        css={authCodeButton}
                        disabled={isDisabled}
                        onClick={handleVerifyUniv}
                      >
                        인증
                      </button>
                    </div>
                  )}
                </div>
                <button type="button" css={sendAgainButton}>
                  인증번호 재전송
                </button>
              </div>
            );
          }}
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
