import { ChangeEvent, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  authCodeButton,
  authInputLayout,
  authTimerWrapper,
  sendAgainButton,
} from './AuthCodeInput.styles';
import EmailToast from '../../../EmailToast/EmailToast';
import { univInputWrapper } from '../UnivAuthInput.styles';

import useVerifyUnivAuthCodeMutation from '@/app/join/hooks/useVerifyUnivAuthCodeMutation';
import { ResearcherJoinParams } from '@/app/join/JoinPage.types';
import { formatAuthTimer } from '@/app/join/JoinPage.utils';

const AUTH_CODE_VALID_LENGTH = 6;

interface AuthCodeInputProps {
  authTimer: number;
  handleVerifyEmail: () => void;
  handleSendUnivAuthCode: () => void;
}

const AuthCodeInput = ({
  authTimer,
  handleVerifyEmail,
  handleSendUnivAuthCode,
}: AuthCodeInputProps) => {
  const { getValues } = useFormContext<ResearcherJoinParams>();
  const { mutate: verifyEmail, isSuccess: isUnivVerify } = useVerifyUnivAuthCodeMutation();

  const [isToastOpen, setIsToastOpen] = useState(false);
  const [authCode, setAuthCode] = useState('');

  const handleChangeAuthCode = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= AUTH_CODE_VALID_LENGTH) {
      setAuthCode(e.target.value);
    }
  };

  const handleVerifyUniv = () => {
    const univEmail = getValues('univEmail');

    verifyEmail(
      { univEmail, inputCode: authCode },
      {
        onSuccess: () => {
          setIsToastOpen(true);
          handleVerifyEmail();
        },
      },
    );
  };

  return (
    <>
      <div css={authInputLayout}>
        <div css={univInputWrapper}>
          <input
            placeholder="인증번호 6자리 입력"
            type="number"
            disabled={isUnivVerify}
            value={authCode}
            onChange={handleChangeAuthCode}
          />
          {!isUnivVerify && (
            <div css={authTimerWrapper}>
              <span>{formatAuthTimer(authTimer)}</span>
              <button
                type="button"
                css={authCodeButton}
                disabled={!authCode || authCode.length < AUTH_CODE_VALID_LENGTH}
                onClick={handleVerifyUniv}
              >
                인증
              </button>
            </div>
          )}
        </div>
        <button type="button" css={sendAgainButton} onClick={handleSendUnivAuthCode}>
          인증번호 재전송
        </button>
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
