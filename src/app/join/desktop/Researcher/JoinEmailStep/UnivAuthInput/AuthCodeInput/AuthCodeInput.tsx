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

import EmailToast from '@/app/join/components/EmailToast/EmailToast';
import { joinInput } from '@/app/join/components/JoinInput/JoinInput.css';
import useVerifyUnivAuthCodeMutation from '@/app/join/hooks/useVerifyUnivAuthCodeMutation';
import { formatAuthTimer } from '@/app/join/JoinPage.utils';
import { ResearcherJoinSchemaType } from '@/schema/join/ResearcherJoinSchema';

const AUTH_CODE_VALID_LENGTH = 6;

interface AuthCodeInputProps {
  authTimer: number;
  handleSendUnivAuthCode: () => void;
  stopTimer: () => void;
}

const AuthCodeInput = ({ authTimer, handleSendUnivAuthCode, stopTimer }: AuthCodeInputProps) => {
  const { getValues, setValue } = useFormContext<ResearcherJoinSchemaType>();
  const { mutate: verifyEmail, isSuccess: isUnivVerify } = useVerifyUnivAuthCodeMutation();
  const [isToastOpen, setIsToastOpen] = useState(false);
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
          setIsToastOpen(true);
          setValue('isEmailVerified', true);
          setError('');
          stopTimer();
        },
        onError: (error) => {
          setError(error.message);
        },
      },
    );
  };

  return (
    <>
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
      <EmailToast
        title="이메일 인증이 완료되었어요"
        isToastOpen={isToastOpen}
        setIsToastOpen={setIsToastOpen}
      />
    </>
  );
};

export default AuthCodeInput;
