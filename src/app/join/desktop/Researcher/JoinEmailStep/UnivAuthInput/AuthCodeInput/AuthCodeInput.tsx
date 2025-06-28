'use client';

import { ChangeEvent, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  authInputLayout,
  authTimerWrapper,
  authCodeButton,
  sendAgainButton,
  authTimerText,
  inputFooter,
} from './AuthCodeInput.css';
import { errorMessage, univInputWrapper } from '../UnivAuthInput.css';

import { joinInput } from '@/app/join/components/JoinInput/JoinInput.css';
import useVerifyUnivAuthCodeMutation from '@/app/join/hooks/useVerifyUnivAuthCodeMutation';
import { formatAuthTimer } from '@/app/join/JoinPage.utils';
import { ResearcherJoinSchemaType } from '@/schema/join/ResearcherJoinSchema';
import { useToast } from '@/hooks/useToast';

const AUTH_CODE_VALID_LENGTH = 6;

interface AuthCodeInputProps {
  authTimer: number;
  handleSendUnivAuthCode: () => void;
  stopTimer: () => void;
  openServiceAgreeBottomSheet?: () => void;
}

const AuthCodeInput = ({
  authTimer,
  handleSendUnivAuthCode,
  stopTimer,
  openServiceAgreeBottomSheet,
}: AuthCodeInputProps) => {
  const form = useFormContext<ResearcherJoinSchemaType>();
  const { getValues, setValue } = form;
  const toast = useToast();

  const { mutate: verifyEmail, isSuccess: isUnivVerify } = useVerifyUnivAuthCodeMutation();
  const [authCode, setAuthCode] = useState('');
  const [error, setError] = useState('');

  const handleChangeAuthCode = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= AUTH_CODE_VALID_LENGTH) {
      setAuthCode(e.target.value);
      setError('');
    }
  };

  const handleVerifyUniv = () => {
    const univEmail = getValues('univEmail');
    verifyEmail(
      { univEmail, inputCode: authCode },
      {
        onSuccess: () => {
          toast.open({ message: '이메일 인증이 완료되었어요' });
          setValue('isEmailVerified', true);
          setError('');
          stopTimer();

          openServiceAgreeBottomSheet?.();
        },
        onError: (error) => {
          setError(error.message);
        },
      },
    );
  };

  return (
    <div className={authInputLayout}>
      <div className={univInputWrapper}>
        <input
          style={{ width: '100%' }}
          className={joinInput}
          placeholder="인증번호 6자리 입력"
          type="number"
          disabled={isUnivVerify}
          value={authCode}
          onChange={handleChangeAuthCode}
        />
        {!isUnivVerify && (
          <div className={authTimerWrapper}>
            <span className={authTimerText}>{formatAuthTimer(authTimer)}</span>
            <button
              type="button"
              className={authCodeButton}
              disabled={!authCode || authCode.length < AUTH_CODE_VALID_LENGTH || Boolean(error)}
              onClick={handleVerifyUniv}
            >
              인증
            </button>
          </div>
        )}
      </div>
      <div className={inputFooter}>
        <span className={errorMessage}>{error}</span>
        <button type="button" className={sendAgainButton} onClick={handleSendUnivAuthCode}>
          인증번호 재전송
        </button>
      </div>
    </div>
  );
};

export default AuthCodeInput;
